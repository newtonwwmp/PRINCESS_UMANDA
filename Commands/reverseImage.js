module.exports = async (client, msg) => {
    if (msg.hasMedia) {
        msg.reply('🖼️ Please upload the image to Google Lens manually: https://lens.google.com');
    } else {
        msg.reply('❌ Please send an image.');
    }
};
