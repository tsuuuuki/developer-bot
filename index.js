const { Client } = require('klasa');
const PlexiAPI = require('plexi-api');
const app = require('express')()
const http = require("http");
const { MessageEmbed } = require('discord.js');
const client = new Client({
    prefix: '-%',
    readyMessage: (client) => `[Client] ${client.user.username} is Ready!`,
    provider: { engine: "json" }
})
client.plexi = new PlexiAPI.Client()

client.queue = new Map()

client.embed = class thingy extends MessageEmbed {
  constructor() {
    super()
    this.color = 0x008000
  }
}

client.on('ready', () => {
  client.user.setActivity('-%help', {type: "WATCHING"})
})

client.on('message', (msg) => {
  if(msg.author.bot) return;
  if(msg.content == "<@485635339541807105>") return msg.channel.send('My prefix for this server is: `' + client.settings.guilds.get(msg.guild.id).prefix + '`')
})


client.login(process.env.TOKEN);

app.get('/', (req, res) => {
  res.send('<h1>Idk</h1>')
})

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 250);

app.listen(3000)
