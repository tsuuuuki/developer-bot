const {
    Command
} = require('klasa');

const ss = require('string-similarity')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            description: 'Look for the id of someone',
            usage: '[user:user]',
        });
    }

    async run(msg, [user]) {
      let userr = user || msg.author
      if(!msg.mentions.users.first()) {
        return msg.send('Should be a mention! (user search disabled)')
      }
      const embed = new this.client.embed()
      embed.setTitle(userr.tag)
      embed.setDescription(`**\`${userr.id}\`**`)
      msg.send(embed)
    }
};