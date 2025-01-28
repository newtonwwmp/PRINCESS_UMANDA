const axios = require('axios');

module.exports = async (client, msg) => {
    const query = msg.body.replace('!wiki ', '');
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`;

    try {
        const res = await axios.get(url);
        msg.reply(`📖 ${res.data.title}\n${res.data.extract}`);
    } catch (error) {
        msg.reply('❌ No Wikipedia page found.');
    }
};
