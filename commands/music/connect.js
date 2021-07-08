module.exports = {
    name: 'connect',
    description: 'Connect to VC!',
    execute(msg, args, bot, db) {
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('I couldn\'t connect to your voice channel...');
        voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
    }
}