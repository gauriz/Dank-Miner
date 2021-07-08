
module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(msg, args, bot, db) {
        msg.reply('pong');
        // msg.channel.send('pong');
    },
};