const gTTS = require('gtts');

module.exports = async (client, msg) => {
    const text = msg.body.replace('!tts ', '');
    const gtts = new gTTS(text, 'en');
    const filePath = `./downloads/tts.mp3`;

    gtts.save(filePath, async () => {
        await msg.reply('🔊 Here is your audio message:');
        await msg.reply(filePath, { sendMediaAsDocument: true });
    });
};
