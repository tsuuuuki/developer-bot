const {
    Command
} = require('klasa');

const ytdl = require('ytdl-core')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            description: 'Play things whatever idk',
            usage: '<urlorthing:str>'
        });
    }

    async run(msg, [term]) {
      if(!msg.member.voice) return msg.send('Connect to a voice channel first.')
      if(msg.guild.me.voice.id !== msg.member.voice.id) return msg.send('I\'m already playing music in the voice channel ' + msg.me.voice.channel)
      
    }
};