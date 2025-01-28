const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

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

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

// Generate QR Code for WhatsApp Web
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('📱 Scan this QR code in WhatsApp to log in.');
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
    else autoReply(client, msg);
});

// Initialize the bot
client.initialize();
