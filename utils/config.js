// utils/config.js

// List of admin phone numbers (for admin-only commands)
const admins = ['94743381623', '94743381624']; // Replace with actual admin numbers

// Weather API key (if using an external API)
const weatherApiKey = 'YOUR_WEATHER_API_KEY'; // Replace with your weather API key

// Google Custom Search API key (if using Google Custom Search)
const googleApiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your Google API key

// Wikipedia language settings (default is English)
const wikipediaLang = 'en';

// Prefix used for bot commands
const prefix = '!';

// Session file path (if you want to save the session state)
const sessionFilePath = './downloads/session.json';

module.exports = {
    admins,
    weatherApiKey,
    googleApiKey,
    wikipediaLang,
    prefix,
    sessionFilePath
};
