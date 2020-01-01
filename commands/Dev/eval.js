const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            description: 'Evaluate javascript',
            usage: '<code:str>',
        });
    }

    async run(message, [code]) {
      if(message.author.id !== "266063988209483790" && message.author.id !== "322203879208910849") return message.channel.send('MWA MWA MILKY');
      try {
        let evaled = eval(code);
        let type = typeof evaled
        if (evaled instanceof Promise) evaled = await evaled;
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled, { depth: 0 });
        message.channel.send('```js\n' + evaled + '```');
        message.channel.send('**Type: `' + type + '`**')
      } catch (err) {
        message.channel.send(` \`ERROR\`\n\`\`\`js\n${err}\`\`\``);
      }
    }
};