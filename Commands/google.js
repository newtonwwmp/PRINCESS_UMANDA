const axios = require('axios');

module.exports = async (client, msg) => {
    const query = msg.body.replace('!google ', '');
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=YOUR_GOOGLE_API_KEY&cx=YOUR_CX`;

    try {
        const res = await axios.get(url);
        msg.reply(`🔍 Top Result: ${res.data.items[0].title}\n${res.data.items[0].link}`);
    } catch (error) {
        msg.reply('❌ No results found.');
    }
};
