const Discord = require('discord.js');
module.exports = {
    name: 'start',
    description: 'Start!',
    async execute(msg, args, bot, db) {
        try {
            var data = db.getData("/" + msg.author.id);
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .addField("Guild", data.guild)
                .addField("Balance", data.balance)
                .setTimestamp()
                .attachFiles('./images/pashumba.png')
                .setFooter('La La Laaa Miner!', 'attachment://pashumba.png');
            msg.channel.send(embed);
        }
        catch (err) {
            let json = {
                name: msg.author.username,
                discriminator: msg.author.discriminator,
                balance: 0,
                avatar: msg.author.avatar,
                guild: msg.guild.name,
                joinTime: new Date()
            }
            db.push("/" + msg.author.id, json);
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .addField("Guild", data.guild)
                .addField("Balance", 0)
                .setTimestamp()
                .attachFiles('./images/pashumba.png')
                .setFooter('La La Laaa Miner!', 'attachment://pashumba.png');
            msg.channel.send(embed);
        }
    }
};