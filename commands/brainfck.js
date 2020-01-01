const { Command } = require("klasa");
const interpreter = require("../brainfuckinterpeterplssomebodykillmeplsitsmuffintime.js");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      enabled: true,
      description: "Brainf*ck interpreter",
      usage: "<code:str>[...]"
    });
  }
  async run(msg, [code]) {
    let res = await interpreter(code, msg);
    console.log(res)
    msg.reply(`\`OUTPUT\`: \`${res.output}\`
\`MEMORY\`: \`${res.displayBuffer}\` and ${res.restBytes} more bytes...`)
  }
};
