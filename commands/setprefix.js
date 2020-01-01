const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            description: 'Set Shinobu prefix (requires MANAGE_MESSAGES permission)',
            usage: '<new_prefix:str> [...]'
        });
    }

    async run(msg, [prefix]) {
      if(!msg.member.permissions.has("MANAGE_MESSAGES") && msg.author.id !== "266063988209483790") return msg.send('You need manage messages permissions to use this command.')
      this.client.settings.guilds.update(msg.guild.id, {prefix: prefix})
      msg.send('My prefix has been successfully changed to: ' + prefix)
    }
};