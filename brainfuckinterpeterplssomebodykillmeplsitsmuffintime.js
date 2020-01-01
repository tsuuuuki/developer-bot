const mem_size = 30000;
const enable_debug = true;
const debug = (m, format = true) => {
  if (enable_debug) {
    if (format) {
      console.log(`${"[DEBUG]:".green} ${m}`);
    } else {
      console.log(m);
    }
  }
};
module.exports = async (code, msg) => {
  debug(`initializing`);
  let instruction_index = 0;
  let mem_pointer = 0;
  let mem_use = 4; // idk if this would do something but imma keep it in
  let output = "";
  let stack = [];
  const memory = Buffer.alloc(mem_size);
  debug(`created a buffer for memory with ${memory.length} bytes`);

  // interpreter
  debug("starting interpreter");
  let parseInstructions = true;
  let crashed = false;
  let pause = false;
  while (parseInstructions) {
    if (!pause) {
      switch (code[instruction_index]) {
        // increment/decrement
        case "+":
          memory[mem_pointer]++;
         if (mem_pointer >= mem_size-1) {
            msg.reply("No more space");
            crashed = true;
            parseInstructions = false;
          }
          debug(`Increment at ${mem_pointer} (${memory[mem_pointer]})`);
          break;

        case "-":
          debug(`Decrement at ${mem_pointer} (${memory[mem_pointer]})`);
          memory[mem_pointer]--;
          break;

        // move pointer
        case "<": // left
          if (mem_pointer > 0) {
            mem_pointer--;
            debug("Moved pointer to the left // new pointer: " + mem_pointer);
          } else debug("Could not move pointer to the left");
          break;

        case ">": // right
          mem_pointer++;
          if (stack.length <= 0) {
            mem_use++;
          }
          debug("Moved pointer to the right // new pointer: " + mem_pointer);
          break;

        // loop
        case "[":
          if (memory[mem_pointer] !== 0) {
            debug("entered into loop");
            stack.push(instruction_index);
          } else {
            let count = 0;
            while (true) {
              instruction_index++;
              if (!code[instruction_index]) break;
              if (code[instruction_index] === "[") {
                count++;
              } else if (code[instruction_index] === "]") {
                if (count > 0) {
                  count--;
                } else {
                  break;
                }
              }
            }
          }
          break;

        case "]":
          instruction_index = stack.pop() - 1;
          debug("end loop instruction");
          break;

        // output/input
        case ".":
          debug(`outputing ${memory[mem_pointer]}`);
          output += String.fromCharCode(memory[mem_pointer]);
          break;

        case ",":
          // TODO: get input from user
          debug(`getting input and storing into ${mem_pointer}`);
          if (memory[mem_pointer] == 0) {
            msg.reply("Your program is asking for input at instruction " + instruction_index + " please provide some (in ASCII if you want it to work correctly) in your next message within the next 5 minutes")
            const filter = m => m.author.id === msg.author.id;
            let collected = await msg.channel.awaitMessages(filter, {
              max: 1,
              time: 1000 * 60 * 5,
              errors: ["time"]
            }); // more like awaitmesage smh
            memory[mem_pointer] = Array.from(collected)[0][1].content.charCodeAt();
            debug("input stored");
          } else {
            debug(`cannot store input because memory in pointer is not 0`);
          }
          break;

        // anything else
        case undefined: // no more instructions
          parseInstructions = false;
          break;

        default:
          // ignore anything else
          break;
      }
      instruction_index++;
    }
  }

  const getDisplayBuffer = (b, pointer) => {
    let result = "";
    b.forEach(b => (result += `${b} `));
    result = result.split(" ");
    result[pointer] = `[${result[pointer]}]`;
    return result.join(" ");
  };
  console.log(`\n${"[OUTPUT]:".yellow} ${output !== "" ? output : "None"}`);
  debug(`\n${"[MEMORY]:".blue}`, false);
  debug(
    getDisplayBuffer(memory.slice(0, mem_use), mem_pointer) +
      `and ${memory.length - mem_use} more bytes...`,
    false
  );
  return {
    output: output !== '' ? output : 'None',
    displayBuffer: getDisplayBuffer(memory.slice(0, mem_use), mem_pointer),
    restBytes: memory.length - mem_use
  };
};
