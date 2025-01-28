module.exports = async (client, msg) => {
    // Get the sender's name
    const senderName = msg.pushName || 'User'; // Defaults to 'User' if the name is unavailable

    // Get the bot uptime (in milliseconds)
    const uptime = process.uptime(); // Returns uptime in seconds
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    // Format uptime in a readable way
    const formattedUptime = `${hours}h ${minutes}m ${seconds}s`;

    // Get memory usage
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // Convert to MB
    const formattedMemory = memoryUsage.toFixed(2); // Limit to 2 decimal places

    const menu = `
🤩 𝙃𝙀𝙇𝙇𝙊𝙒 :)  *${senderName}* 🤩
> 🌀 ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ᴘʀɪɴᴄᴇss_ᴜᴍᴀɴᴅᴀ 🌀

╭──────────────────━┈⊷
│◦ ✗🤖 *Bot Name*: ᴘʀɪɴᴄᴇss_ᴜᴍᴀɴᴅᴀ™
│◦ ✗👤 *Owner Name*: ᴍɪʜɪʀᴀɴɢᴀ
│◦ ✗☎ *Owner Number*: 94715450089
│◦ ✗⏰ *Uptime*: ${formattedUptime}
│◦ ✗💾 *RAM*: ${formattedMemory}MB / 63276MB
│◦ ✗💫 *Prefix*: !
╰──────────────────━┈⊷

🎯 *Bot Commands* 🎯

✅ *General Commands:*
🔹 !menu - Show all commands
🔹 !alive - Check if bot is online
🔹 !ping - Check bot response speed

🎥 *YouTube:*
🔹 !yt [URL] - Download YouTube video/audio

📷 *Media:*
🔹 !sticker - Convert image to sticker
🔹 !reverse - Reverse image search

🔊 *Utilities:*
🔹 !tts [text] - Convert text to speech
🔹 !weather [city] - Get weather info
🔹 !google [query] - Google search
🔹 !wiki [topic] - Wikipedia search

⚙️ *Admin Commands:*
🔹 !admin - Admin-only commands (for group admins)

🚀 Enjoy using *PRINCESS_UMANDA* bot! 🚀`;

    // Sending the bot logo along with the message (Make sure you replace 'botLogoPath' with the correct path)
    const botLogoPath = './path-to-your-logo.png'; // Update the path to your bot's logo image
    await msg.reply(menu, { media: { url: botLogoPath } });
};
