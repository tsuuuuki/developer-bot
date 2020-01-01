const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            description: 'List of NSFW commands!',
            aliases: ['nsfw']
        });
    }

    async run(msg) {
        let commands = this.client.commands
        let nsfw = commands.map(cmd => cmd).filter(cmd => cmd.category == "nsfw").map(cmd => `${this.client.settings.guilds.get(msg.guild).prefix}${cmd.name}`)
        const embed = new this.client.embed()
        embed.setDescription(nsfw.join('\n'))
        msg.send(embed)
    }
};