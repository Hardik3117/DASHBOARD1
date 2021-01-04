const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "cuddle",
 aliases: [],
 description: "Give a cuddle to mention user",
 category: "Fun",
 usage: "cuddle <user>",
 run: async (client, message, args) => {
  (async () => {
   try {
    const user = message.mentions.users.first();
    if(!user) {
     return message.channel.send({embed: {
      color: 16734039,
      description: "You must mention someone to cuddle!"
     }})
    }
    const response = await fetch("https://nekos.life/api/v2/img/cuddle")
    const body = await response.json();
    const embed = new Discord.MessageEmbed()
     .setTitle(user.username + " Just got a cuddle from " + message.author.username, message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setImage(body.url)
     .setURL(body.url)
     .setColor("RANDOM")
     .setDescription((user.toString() + " got a cuddle from " + message.author.toString()))
     .setFooter("Requested by " + `${message.author.username}` + " • (`this is so cute`)", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     .setTimestamp()
    .setURL(body.url);
    message.channel.send(embed);
   } catch(err) {
    message.channel.send({embed: {
     color: 16734039,
     description: "Something went wrong... :cry:"
    }})
    console.log(err);
   }
  })();
 }
}
