// utils/session.js
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const config = require('./config');

/**
 * Generates a unique session ID.
 * @returns {string} - A unique session ID.
 */
function generateSessionId() {
    return uuidv4();  // Generate a new unique session ID
}

/**
 * Load existing session data (if any).
 * @returns {Object} - Returns the session data, or an empty object if no session data is found.
 */
function loadSession() {
    if (fs.existsSync(config.sessionFilePath)) {
        const sessionData = fs.readFileSync(config.sessionFilePath, 'utf-8');
        return JSON.parse(sessionData);
    }
    return {}; // No session data found
}

/**
 * Save session data to a file.
 * @param {Object} sessionData - The session data to save.
 */
function saveSession(sessionData) {
    fs.writeFileSync(config.sessionFilePath, JSON.stringify(sessionData, null, 2), 'utf-8');
}

/**
 * Check if the session is active.
 * @returns {boolean} - Returns true if a session is active, false otherwise.
 */
function isSessionActive() {
    return fs.existsSync(config.sessionFilePath);
}

module.exports = {
    generateSessionId,
    loadSession,
    saveSession,
    isSessionActive
};
