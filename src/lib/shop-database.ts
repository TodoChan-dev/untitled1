/**
 * Direct database connection for shop functionality
 */
import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 't-project',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'stella_fill_world',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

/**
 * Initialize the database tables if they don't exist
 */
export async function initDatabase() {
    try {
        const connection = await pool.getConnection();

        try {
            // Create whitelist table
            await connection.query(`
        CREATE TABLE IF NOT EXISTS shop_whitelist (
          id INT AUTO_INCREMENT PRIMARY KEY,
          player_name VARCHAR(16) NOT NULL,
          ticket_type ENUM('regular', 'gold') NOT NULL,
          start_time DATETIME NOT NULL,
          end_time DATETIME NOT NULL,
          active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY (player_name)
        )
      `);

            // Create transactions table
            await connection.query(`
        CREATE TABLE IF NOT EXISTS shop_transactions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          player_name VARCHAR(16) NOT NULL,
          ticket_type ENUM('regular', 'gold') NOT NULL,
          amount INT NOT NULL,
          stripe_session_id VARCHAR(255) NOT NULL,
          stripe_payment_intent_id VARCHAR(255),
          start_time DATETIME NOT NULL,
          end_time DATETIME NOT NULL,
          status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_stripe_session (stripe_session_id),
          INDEX idx_player_name (player_name)
        )
      `);

            console.log('Database tables initialized');
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

/**
 * Create a new transaction
 */
export async function createTransaction(data: {
    playerName: string;
    ticketType: 'regular' | 'gold';
    amount: number;
    stripeSessionId: string;
    startTime: Date;
    endTime: Date;
}) {
    try {
        const [result] = await pool.query(
            `INSERT INTO shop_transactions 
        (player_name, ticket_type, amount, stripe_session_id, start_time, end_time)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.playerName,
                data.ticketType,
                data.amount,
                data.stripeSessionId,
                data.startTime,
                data.endTime
            ]
        );

        return result;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
    }
}

/**
 * Update a transaction with payment details
 */
export async function updateTransactionStatus(
    sessionId: string,
    status: 'completed' | 'failed' | 'refunded',
    paymentIntentId?: string
) {
    try {
        const params = [status];
        let query = `UPDATE shop_transactions SET status = ?`;

        if (paymentIntentId) {
            query += `, stripe_payment_intent_id = ?`;
            // @ts-ignore
            params.push(paymentIntentId);
        }

        query += ` WHERE stripe_session_id = ?`;
        // @ts-ignore
        params.push(sessionId);

        const [result] = await pool.query(query, params);
        return result;
    } catch (error) {
        console.error('Error updating transaction status:', error);
        throw error;
    }
}

/**
 * Get a transaction by Stripe session ID
 */
export async function getTransactionBySessionId(sessionId: string) {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM shop_transactions WHERE stripe_session_id = ?`,
            [sessionId]
        );

        const transactions = rows as any[];
        return transactions.length ? transactions[0] : null;
    } catch (error) {
        console.error('Error getting transaction by session ID:', error);
        throw error;
    }
}

/**
 * Check if a player has an active ticket for today
 */
export async function hasActiveTicket(playerName: string) {
    try {
        const now = new Date();

        const [rows] = await pool.query(
            `SELECT COUNT(*) as count FROM shop_transactions 
       WHERE player_name = ? 
       AND status = 'completed' 
       AND start_time <= ? 
       AND end_time >= ?`,
            [playerName, now, now]
        );

        const result = (rows as any[])[0];
        return result.count > 0;
    } catch (error) {
        console.error('Error checking active ticket:', error);
        throw error;
    }
}

/**
 * Add a player to the whitelist
 */
export async function addToWhitelist(data: {
    playerName: string;
    ticketType: 'regular' | 'gold';
    startTime: Date;
    endTime: Date;
}) {
    try {
        // Use REPLACE INTO to handle the case where a player already exists in the whitelist
        const [result] = await pool.query(
            `REPLACE INTO shop_whitelist 
        (player_name, ticket_type, start_time, end_time, active)
       VALUES (?, ?, ?, ?, TRUE)`,
            [
                data.playerName,
                data.ticketType,
                data.startTime,
                data.endTime
            ]
        );

        return result;
    } catch (error) {
        console.error('Error adding to whitelist:', error);
        throw error;
    }
}

/**
 * Remove expired whitelist entries
 * This can be called by a cron job
 */
export async function removeExpiredWhitelist() {
    try {
        const now = new Date();

        const [result] = await pool.query(
            `UPDATE shop_whitelist SET active = FALSE WHERE end_time < ?`,
            [now]
        );

        return result;
    } catch (error) {
        console.error('Error removing expired whitelist:', error);
        throw error;
    }
}

/**
 * Get all active whitelist entries
 */
export async function getActiveWhitelist() {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM shop_whitelist WHERE active = TRUE`
        );

        return rows as any[];
    } catch (error) {
        console.error('Error getting active whitelist:', error);
        throw error;
    }
}