const {
    Command
} = require('klasa');

const fetch = require('node-fetch')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            description: 'uwu',
            aliases: ['neko-gif']
        });
    }

    async run(msg) {
      if(!msg.channel.nsfw) return msg.send('This command only works on NSFW channels!')
      fetch('https://nekos.life/api/v2/img/nsfw_neko_gif')
      .then(res => res.json())
      .then(json => {
        const embed = new this.client.embed()
        .setImage(json.url)
        .setFooter('powered by nekos.life API')
        msg.send(embed)
      })
    }
};