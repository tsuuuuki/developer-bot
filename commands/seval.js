const {
    Command
} = require('klasa');
var safeEval = require('safe-eval')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            description: 'A safe open eval command.',
            usage: '<code:str>',
            aliases: ['nsfw']
        });
    }

    async run(message, [code]) {
      try {
        if(code.startsWith('this')) throw new ReferenceError('this is not defined') 
        let evaled = safeEval(code);
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