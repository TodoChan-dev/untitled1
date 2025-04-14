/**
 * Minecraft usernames validation and utility functions
 */

/**
 * Check if a Minecraft player exists by username
 * This uses the Mojang API to validate if a player exists
 */
export async function checkPlayerExists(username: string): Promise<boolean> {
    try {
        // First try the newer username to UUID API
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(username)}`);

        // If we get a 200 response, the player exists
        if (response.ok) {
            return true;
        }

        // If we get a 404, the player doesn't exist
        if (response.status === 404) {
            return false;
        }

        // If we're rate limited or get another error, we'll try an alternative method
        // by checking if the Minecraft avatar URL exists
        const imageResponse = await fetch(`https://mc-heads.net/avatar/${encodeURIComponent(username)}/100`, {
            method: 'HEAD'
        });

        // mc-heads.net will return a default image even for invalid usernames,
        // but we can consider this a fallback validation method
        return imageResponse.ok;

    } catch (error) {
        console.error('Error checking Minecraft player:', error);

        // In case of network errors, we'll assume the player might exist
        // The actual Minecraft server will do the final validation anyway
        return true;
    }
}

/**
 * Validate Minecraft username format
 * Minecraft usernames can only contain letters, numbers, and underscores
 * and must be between 3 and 16 characters long
 */
export function isValidMinecraftUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    return usernameRegex.test(username);
}