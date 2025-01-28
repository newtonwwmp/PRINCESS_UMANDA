module.exports = async (client, msg) => {
    const startTime = Date.now();
    await msg.reply('🏓 Checking ping...');
    const endTime = Date.now();
    await msg.reply(`🏓 Pong! Response time: *${endTime - startTime}ms*`);
};
