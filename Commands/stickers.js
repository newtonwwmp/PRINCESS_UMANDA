const { MessageMedia } = require('whatsapp-web.js');

module.exports = async (client, msg) => {
    if (msg.hasMedia) {
        const media = await msg.downloadMedia();
        await client.sendMessage(msg.from, media, { sendMediaAsSticker: true });
    } else {
        msg.reply('❌ Please send an image with !sticker');
    }
};
