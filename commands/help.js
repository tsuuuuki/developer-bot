const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            description: 'List of commands that you have access to!',
            usage: '[cmd:cmd]',
            aliases: ['ayuda', 'cmds', 'commands', 'cmd']
        });
    }

    async run(msg, [cmd]) {
      if(cmd) {//que weba xd khe es mucho nah si gei nou
        const embed = new this.client.embed()
        .addField('Name: ', cmd.name, true)
        .addField('Description: ', cmd.description, true)
        if(cmd.extendedHelp !== "No extended help available.") {
          embed.addField('Extended Help: ', cmd.extendedHelp, true)
        }
        if(cmd.usage) { 
          embed.addField('Usage: ', `${this.client.settings.guilds.get(msg.guild.id).prefix}${cmd.name} ${cmd.usageString}`, true)
        } else {
          embed.addField('Usage: ', `No arguments required for this command.`, true)
        }
        embed.addField('Category: ', cmd.category, true)
        if(cmd.aliases) {  
          embed.addField('Aliases: ', cmd.aliases.join(', '), true)
        }
        embed.setThumbnail(this.client.user.avatarURL())
        msg.send(embed)
      } else {
        let commands = this.client.commands
        let general = commands.map(cmd => cmd).filter(cmd => cmd.category == "General").map(cmd => `${this.client.settings.guilds.get(msg.guild.id).prefix}${cmd.name} - ${cmd.description}`)
        const embed = new this.client.embed()
        embed.setDescription(`${general.join('\n')}`)
        msg.send(embed)
      }
    }
};