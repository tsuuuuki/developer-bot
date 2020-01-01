const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            description: 'Get a bot idea',
        });
    }

    async run(msg) {
      let things1 = ['explodes', 'creates', 'steals', 'kills', 'memes', 'plays', 'has', 'makes']
      let things2 = ['that']
      let things3 = ['commands', 'people', 'economy', 'minecraft', 'despacito commands', 'music commands', 'poetic gei', 'OOF', 'computer']
      msg.send(`You could make a bot ${things2[Math.floor(Math.random() * things2.length)] + ' ' + things1[Math.floor(Math.random() * things1.length)] + ' ' + things3[Math.floor(Math.random() * things3.length)]}`)
    }
};