const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const { makeWASocket, useSingleFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");

// 🔹 Session & Pairing Code Save Location
const SESSION_FILE_PATH = "./sessions/auth_info.json";
const PHONE_NUMBER = "947XXXXXXXX@s.whatsapp.net"; // <-- Replace with your WhatsApp number

// 🔹 Import Command Modules
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

// 🔄 Function to handle Web.js client
function startWebJSClient() {
    const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: { headless: true }
    });

    // Log QR Code URL instead of using qrcode-terminal
    client.on('qr', qr => {
        console.log('🔗 Scan this QR code by opening this URL in your browser:\n', qr);
    });

    // Notify when bot is ready
    client.on('ready', () => {
        console.log('✅ WhatsApp Web.js Bot is Ready!');
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

    client.initialize();
}

// 🔄 Function to handle Baileys client
async function startBaileysClient() {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useSingleFileAuthState(SESSION_FILE_PATH);

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false, // 🚀 Disable QR Code
    });

    sock.ev.on("creds.update", saveCreds);

    // 🔹 Get Pair Code Instead of QR Code
    sock.ev.on("connection.update", async (update) => {
        const { connection, pairingCode } = update;

        if (pairingCode) {
            console.log(`🚀 Your Pairing Code: ${pairingCode}`);
            fs.writeFileSync("./sessions/pair_code.txt", pairingCode);
        }

        if (connection === "open") {
            console.log("✅ Baileys Bot Connected!");

            // 🔹 Read Session File & Convert to Base64
            const sessionData = fs.readFileSync(SESSION_FILE_PATH, "utf-8");
            const sessionID = `PRINCESS_UMANDA=${Buffer.from(sessionData).toString('base64')}`;

            // 🔹 Save Session ID
            fs.writeFileSync("./sessions/session.txt", sessionID);
            console.log("✅ Session ID Saved to session.txt");

            // 🔹 Send Session ID to WhatsApp Inbox
            await sock.sendMessage(PHONE_NUMBER, { text: `🔥 Your WhatsApp Session ID:\n\n${sessionID}` });
            console.log("✅ Session ID Sent to WhatsApp Inbox!");
        }
    });
}

// 🔄 Start Both Clients
startWebJSClient();
startBaileysClient();
