module.exports = async (client, msg, chat) => {
    const sender = await msg.getContact();
    if (!chat.isGroup) return msg.reply('❌ This command is for groups only.');
    if (!chat.participants.find(p => p.id._serialized === sender.id._serialized).isAdmin) {
        return msg.reply('❌ You must be an admin to use this command.');
    }

    msg.reply('✅ Admin command executed!');
};
