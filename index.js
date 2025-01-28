const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const generateSessionId = require('./utils/session'); // Make sure this file exists

// Import command modules
const menu = require('./commands/menu');
const alive = require('./commands/alive');
const ping = require('./commands/ping');
const autoReply = require('./commands/autoReply');
const downloader = require('./commands/downloader');
const sticker = require('./commands/sticker');
const tts = require('./commands/tts');
const weather = require('./commands/weather');
const google = require('./commands/google');
const wikipedia = require('./commands/wikipedia');
const reverseImage = require('./commands/reverseImage');
const admin = require('./commands/admin');

// Initialize WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true } // Run the bot headless
});

// Generate a unique session ID when the bot starts
client.on('qr', async (qr) => {
    const sessionId = generateSessionId(); // Generate a unique session ID
    console.log(`Session ID: ${sessionId}`); // Log the session ID to the console

    // Optionally, you can store the session ID in a file
    fs.writeFileSync('./session_id.txt', sessionId, 'utf-8');  // Save the session ID to a file
    console.log('Session ID saved to session_id.txt');

    // Log QR Code URL instead of using qrcode-terminal
    console.log('🔗 Scan this QR code by opening this URL in your browser:\n', qr);
});

// Notify when bot is ready
client.on('ready', () => {
    console.log('✅ WhatsApp Bot is Ready!');
});

// Auto mark statuses as seen
client.on('message', async msg => {
    if (msg.type === 'status') {
        await msg.getChat().then(chat => chat.sendSeen());
    }
});

// Command Handling
client.on('message', async msg => {
    const chat = await msg.getChat();
    const command = msg.body.toLowerCase();

    // Handle various bot commands
    if (command === '!menu') menu(client, msg);
    else if (command === '!alive') alive(client, msg);
    else if (command === '!ping') ping(client, msg);
    else if (command.startsWith('!yt ')) downloader(client, msg);
    else if (command.startsWith('!sticker')) sticker(client, msg);
    else if (command.startsWith('!tts ')) tts(client, msg);
    else if (command.startsWith('!weather ')) weather(client, msg);
    else if (command.startsWith('!google ')) google(client, msg);
    else if (command.startsWith('!wiki ')) wikipedia(client, msg);
    else if (command.startsWith('!reverse')) reverseImage(client, msg);
    else if (command.startsWith('!admin ')) admin(client, msg, chat);
    else autoReply(client, msg);  // Default handler for custom auto replies
});

// Initialize the bot
client.initialize();
