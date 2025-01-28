const axios = require('axios');

module.exports = async (client, msg) => {
    const city = msg.body.replace('!weather ', '');
    const apiKey = 'YOUR_OPENWEATHER_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await axios.get(url);
        const { main, weather } = res.data;
        msg.reply(`🌦️ Weather in ${city}: ${weather[0].description}, Temp: ${main.temp}°C`);
    } catch (error) {
        msg.reply('❌ City not found.');
    }
};
