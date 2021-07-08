const Discord = require('discord.js');
const responses = require('./responses.json');
module.exports = {
    name: 'beg',
    description: 'Beg!',
    async execute(msg, args, bot, db) {
        try {
            var data = db.getData("/" + msg.author.id);
            const sOrf = Math.floor(Math.random() * 2);
            if (sOrf === 1) {
                // success
                const coins = Math.floor(Math.random() * 700);
                db.push("/" + msg.author.id + "/balance", data.balance + coins);
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setAuthor(msg.author.username, msg.author.avatarURL())
                    .addField("Yay", (responses.success[Math.floor(Math.random() * 5)]).replace("***", coins))
                    .addField("Balance", data.balance)
                    .setTimestamp()
                    .attachFiles('./images/pashumba.png')
                    .setFooter('La La Laaa Miner!', 'attachment://pashumba.png');
                msg.channel.send(embed);
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setAuthor(msg.author.username, msg.author.avatarURL())
                    .addField("Guild", data.guild)
                    .addField("Nah", responses.failure[Math.floor(Math.random() * 28)])
                    .addField("Balance", data.balance)
                    .setTimestamp()
                    .attachFiles('./images/pashumba.png')
                    .setFooter('La La Laaa Miner!', 'attachment://pashumba.png');
                msg.channel.send(embed);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
};