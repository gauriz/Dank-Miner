const Discord = require('discord.js');
const responses = require('./responses.json');
module.exports = {
    name: 'beg',
    description: 'Beg!',
    async execute(msg, args, bot, db) {
        try {
            var role = db.getData("/users/" + msg.author.id);
            var data = db.getData("/role" + role + "/" + msg.author.id);
            const sOrf = Math.floor(Math.random() * 2);
            if (sOrf === 1) {
                // success
                const coins = Math.floor(Math.random() * 700);
                db.push("/role" + role + "/" + msg.author.id + "/balance", data.balance + coins);
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setAuthor(data.nickname, msg.author.avatarURL())
                    .addField("Guild", data.guild)
                    .addField("Role", data.roleName)
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
                    .addField("Role", data.roleName)
                    .addField("Nah", responses.failure[Math.floor(Math.random() * 28)])
                    .addField("Balance", data.balance)
                    .setTimestamp()
                    .attachFiles('./images/pashumba.png')
                    .setFooter('La La Laaa Miner!', 'attachment://pashumba.png');
                msg.channel.send(embed);
            }
        }
        catch (err) {
            msg.reply("Choose a role to move forward with the game. For more info, try <prefix>hello");
        }
    }
};