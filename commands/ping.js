const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            description: 'Pong',
        });
    }

    async run(msg) {
        const Discord = require('discord.js');
        let kkck = msg.mentions.users.first() || msg.author
        const { createCanvas, loadImage } = require('canvas')
        const canvas = createCanvas(355, 221)
        const ctx = canvas.getContext('2d')
        const background = await loadImage('https://cdn.glitch.com/cd854f20-2154-414b-b73b-5a8b75b5484a%2FSin%20t%C3%ADtulo.png')
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await loadImage(`https://cdn.discordapp.com/avatars/${kkck.id}/${kkck.avatar}.png`)
        ctx.drawImage(avatar, 187, 18, 159, 162);
        ctx.font = '14px Arial'
        let peeepo = kkck.tag
        let oof = 47
        if(peeepo.length > 15) {
          let peeepoa = peeepo.match(/.{1,15}/g);
          peeepo = peeepoa.join('\n')
          peeepoa.map(() => { oof = oof - 3 })
        }
        ctx.strokeText(peeepo, 12, oof)
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `licencia-${kkck.avatar}.png`);
        msg.channel.send(attachment)
    }
};