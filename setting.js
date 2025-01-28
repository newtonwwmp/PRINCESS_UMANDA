// settings.js
module.exports = {
  bot: {
    // Bot information
    name: 'PRINCESS_UMANDA',
    owner: 'Mihiranga',
    prefix: '!', // Command prefix
    sessionId: 'your-session-id', // Set your session ID here
    mode: 'public', // Set to 'public' for a public bot, 'private' for a private bot
  },

  // Auto-reply settings
  autoReply: {
    enabled: true, // Enable or disable auto-reply
    message: 'I am currently unavailable. Please leave a message!', // Default auto-reply message
  },

  // Auto status seen feature
  autoStatusSeen: {
    enabled: true, // Enable or disable the auto status seen feature
  },

  // Bot status settings
  status: {
    mode: 'public', // Set bot status to 'public' or 'private'
    aliveMessage: 'I am alive!', // Message to show when the bot is alive
  },
};
