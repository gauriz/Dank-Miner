require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
const JsonDB = require('node-json-db').JsonDB;
const Config = require('node-json-db/dist/lib/JsonDBConfig').Config;
var db = new JsonDB(new Config("Scammers", true, false, '/'));

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {
  if (!message.guild) return;

  //get the prefix for the discord server
  let guildPrefix = process.env.PREFIX;
  let args = message.content.slice(guildPrefix.length).split(' ');
  if (!message.content.startsWith(guildPrefix)) return;
  console.log(args);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(message, args, bot, db);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});
