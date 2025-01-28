// utils/helpers.js

/**
 * Format the bot's response message.
 * @param {string} message - The message to format.
 * @returns {string} - The formatted message.
 */
function formatMessage(message) {
    return `🤖 *Bot Response* 🤖\n\n${message}`;
}

/**
 * Checks if the message is from an admin.
 * @param {object} msg - The incoming message object.
 * @param {string[]} admins - List of admin phone numbers.
 * @returns {boolean} - Returns true if the sender is an admin.
 */
function isAdmin(msg, admins) {
    return admins.includes(msg.from);
}

/**
 * Creates a random string (used for session ID, etc.).
 * @param {number} length - Length of the string.
 * @returns {string} - A random string.
 */
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {
    formatMessage,
    isAdmin,
    generateRandomString
};
