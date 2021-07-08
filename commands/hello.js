const paginationEmbed = require('discord.js-pagination');
const Discord = require('discord.js');
const roles = require('../utils/roles.json');

module.exports = {
    name: 'hello',
    description: 'Hello!',
    execute(msg, args, bot, db) {
        console.log(args);
        try {
            console.log(msg.author);
            var role = db.getData("/users/" + msg.author.id);
            var data = db.getData("/role" + role + "/" + msg.author.id);

            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setAuthor(data.nickname, msg.author.avatarURL())
                .addField("Guild", data.guild)
                .addField("Role", data.roleName)
                .addField("Balance", data.balance)
                .setTimestamp()
                .attachFiles('./images/pashumba.png')
                .setFooter('La La Laaa Miner!', 'attachment://pashumba.png');
            msg.channel.send(embed);
        }
        catch (err) {
            const embed1 = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle('Choose preferred role. Enter the corresponding role number')
                .addFields(
                    { name: '1. Citizen', value: '‎Normal citizen but can evolve into any other roles' },
                    { name: '2. Warrior', value: 'The Fighter, believe it or not, is usually the most physically strong of all the class groups. This class usually specializes in melee attacks, whether with weapons or just plain old fists.  This class generally has the best armor, and is the most skilled with the largest weapons.' },
                    { name: '3. Assassin', value: 'The Assassin class forgoes raw strength in favor of a more subtle approach. Assassins generally have higher skill sets in the areas of stealth, sneaking, and smaller, quicker weapons. Assassins are also usually the best thieves of any class, and have no trouble finding places to hide' },
                    { name: '4. Wizard', value: 'This class is the magical member of the group. The most skilled in the arcane arts, Mages are generally typified by their lack of traditional weaponry, foregoing steel in favor of fire, ice, and other spell use. Mages usually wear the weakest of armor, many times clad in nothing but robes, but can also cast shield, healing, and regeneration spells' },
                    { name: '5. Archer', value: 'It’s not tough to imagine what the Archer is good at. The Archer class is typically a woodsman style character, skilled with a bow and arrow. This character set is also typically the most likely of the character classes to have a companion, such as a dog or other beast. ' },
                    { name: '6. Berserker', value: 'The Berserker class favors might above all else, including safety. In lore across many universes, this rpg character exists as a behemoth that employs focused rage as a method of delivering devastating blows. To use this anger effectively, they’ve usually undergone some extensive battle training or are ridiculously experienced in war' },
                    { name: '7. Cleric', value: 'This rpg class doesn’t get anywhere near the recognition it deserves. The type of player that picks and levels a Cleric type is the very definition of morally sound. These people should be worshipped as gods by all of the lesser DPS types' },
                    { name: '8. Necromancer', value: 'This subclass, descending from a mage and warrior respectively, is dedicated to the blight and death arts. In games where they have their own unique identities, these classes excel at spreading disease and debuffs' },
                    { name: '9. Summoner', value: '. A Summoner, while usually a mage-type, can be any kind of secondary class for moderate damage/aid. A Summoner class serves one general purpose: nuke it all. This one does the most damage at once' },
                    { name: '10. Dancer', value: 'The Dancer and Bard classes often function like an enchanter. As their names suggest, they often function by using certain dances or playing certain instruments that perform various effects . For example, a dance or a song may raise allies attack and lower enemy defense' }
                )
                .setTimestamp()
                .attachFiles('./images/pashumba.png')
                .setFooter('La La Laaa Miner!', 'attachment://pashumba.png');
            const embed2 = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle('Choose preferred role')
                .addFields(
                    { name: '11. Dragoon', value: '‎Dragoons equipped with heavy armory and dragon as pets, they are irrefutable in battles and wars' },
                    { name: '12. Blue Mage', value: 'The Blue Mage/Jack-of-all-Yrades has no well-defined parameters. From game to game, they have different base stats, growth stats, and weapon/armor proficiencies. In many cases, they can learn their way into any role' },
                    { name: '13. Thief', value: 'Thieves are usually stealthy and dexterous or speedy characters able to disarm traps, pick locks, spy on foes, avoid enemy detection and perform backstabs from hiding. They can influenze Citizens to help with their robbery upon evolution' },
                    { name: '14. Policeman', value: 'Policemen get called upon during any robbery attempt. They can use the help of other citizen to solve crimes.' },
                    { name: '15. Judge', value: 'The Judge' },
                    { name: '16. Exit', value: 'Enter 16 to Exit' }
                )
                .setTimestamp()
                .attachFiles('./images/pashumba.png')
                .setFooter('La La Laaa Miner!', 'attachment://pashumba.png');
            const pages = [
                embed1,
                embed2
            ];
            paginationEmbed(msg, pages);
            let count = 0;
            let intervalThingy = setInterval(async () => {
                console.log(msg.channel.messages.cache);
                let message = await msg.channel.messages.cache.get(msg.author.lastMessageID);
                let roleTaken = 0;
                if (message) {
                    roleTaken = parseInt(message.content);
                }
                if (roleTaken == 16) {
                    clearInterval(intervalThingy);
                    msg.reply("Choose a role# to move forward with the game. For more info about the roles, try <prefix>help roles");
                } else if (roleTaken >= 1 && roleTaken <= 15) {
                    let json = {
                        name: msg.author.username,
                        discriminator: msg.author.discriminator,
                        balance: 0,
                        avatar: msg.author.avatar,
                        nickname: msg.author.username,
                        guild: msg.guild.name,
                        joinTime: new Date(),
                        roleId: roleTaken,
                        roleName: roles[roleTaken]
                    }
                    db.push("/role" + roleTaken + "/" + msg.author.id, json);
                    db.push("/users/" + msg.author.id, roleTaken);
                    const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setAuthor(msg.author.username, msg.author.avatarURL())
                        .addField("Guild", msg.guild.name)
                        .addField("Role", roles[roleTaken])
                        .addField("Balance", 0)
                        .setTimestamp()
                        .attachFiles('./images/pashumba.png')
                        .setFooter('La La Laaa Miner!', 'attachment://pashumba.png');
                    msg.channel.send(embed);
                    clearInterval(intervalThingy);
                } else {
                    if (isNaN(roleTaken)) {
                        msg.reply("Choose a role# to move forward with the game. For more info about the roles, try <prefix>help roles");
                    }
                    count++;
                    if (count == 5) {
                        clearInterval(intervalThingy);
                        msg.reply("Choose a role# to move forward with the game. For more info about the roles, try <prefix>help roles");
                    }
                }
            }, 5000);
        }
    }
};




// const exampleEmbed = {
// 	color: 0x0099ff,
// 	title: 'Some title',
// 	url: 'https://discord.js.org',
// 	author: {
// 		name: 'Some name',
// 		icon_url: 'https://i.imgur.com/wSTFkRM.png',
// 		url: 'https://discord.js.org',
// 	},
// 	description: 'Some description here',
// 	thumbnail: {
// 		url: 'https://i.imgur.com/wSTFkRM.png',
// 	},
// 	fields: [
// 		{
// 			name: 'Regular field title',
// 			value: 'Some value here',
// 		},
// 		{
// 			name: '\u200b',
// 			value: '\u200b',
// 			inline: false,
// 		},
// 		{
// 			name: 'Inline field title',
// 			value: 'Some value here',
// 			inline: true,
// 		},
// 		{
// 			name: 'Inline field title',
// 			value: 'Some value here',
// 			inline: true,
// 		},
// 		{
// 			name: 'Inline field title',
// 			value: 'Some value here',
// 			inline: true,
// 		},
// 	],
// 	image: {
// 		url: 'https://i.imgur.com/wSTFkRM.png',
// 	},
// 	timestamp: new Date(),
// 	footer: {
// 		text: 'Some footer text here',
// 		icon_url: 'https://i.imgur.com/wSTFkRM.png',
// 	},
// };

// channel.send({ embed: exampleEmbed });