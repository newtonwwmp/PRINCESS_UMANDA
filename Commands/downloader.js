const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports = async (client, msg) => {
    const url = msg.body.split(' ')[1];
    if (!ytdl.validateURL(url)) return msg.reply('❌ Invalid YouTube URL!');

    msg.reply('🔄 Downloading... Please wait.');

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    const filePath = `./downloads/${title}.mp4`;

    ytdl(url, { format: 'mp4' }).pipe(fs.createWriteStream(filePath))
        .on('finish', async () => {
            await msg.reply('✅ Download complete! Sending...');
            await msg.reply(fs.readFileSync(filePath), { sendMediaAsDocument: true });
            fs.unlinkSync(filePath);
        });
};
