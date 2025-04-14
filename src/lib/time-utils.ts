/**
 * Time utilities for ticket duration calculations
 */

/**
 * Calculate the start and end time for a ticket
 * Tickets are valid from 12:00 noon until 3:00 AM the next day
 */
export function calculateTicketTimes(): { startTime: Date; endTime: Date } {
    const now = new Date();

    // Create start time at 12:00 noon today
    const startTime = new Date(now);
    startTime.setHours(12, 0, 0, 0);

    // Create end time at 3:00 AM tomorrow
    const endTime = new Date(now);
    endTime.setDate(endTime.getDate() + 1);
    endTime.setHours(3, 0, 0, 0);

    // If current time is after 12:00 PM and before 3:00 AM the next day,
    // use the current time as start time
    if (now.getHours() >= 12 || (now.getHours() < 3)) {
        return { startTime: now, endTime };
    }

    // Otherwise, ticket starts at 12:00 noon today
    return { startTime, endTime };
}

/**
 * Check if the current time is within a valid ticket period
 * Valid periods are from 12:00 PM to 3:00 AM the next day
 */
export function isWithinTicketPeriod(date: Date = new Date()): boolean {
    const hours = date.getHours();
    return hours >= 12 || hours < 3;
}

/**
 * Format a date to a human-readable string
 */
export function formatDate(date: Date): string {
    return date.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}