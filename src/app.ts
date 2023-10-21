import ToyRobot from './toy-robot';

import { isValidCommand } from  "../utils/commandValidator";
import readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const tableSize = 5; // Specify the table size here
const robot = new ToyRobot(tableSize);
function placeCommand(command: string) {
  command = command.trim().toUpperCase();
 const parts = command.split(' ');
  const commandName = parts[0];
  const commandArgs = parts.slice(1);
  console.log(commandArgs);
  switch (commandName) {
    case 'PLACE':
        if (command.length === 1) {
          const args = command[0].split(',');
          if (args.length === 3) {
            const x = parseInt(args[0], 10);
            const y = parseInt(args[1], 10);
            const facing = args[2];
            robot.place(x, y, facing);
          }
        }
        break;
      case 'MOVE':
        robot.move();
        break;
      case 'LEFT':
        robot.left();
        break;
      case 'RIGHT':
        robot.right();
        break;
      case 'REPORT':
        console.log(robot.report());
        break;
      default:
        console.log('Invalid command');
    }
}
function processCommand(command: string) {
  if (isValidCommand(command)) {
    if (command.trim().toUpperCase() === 'QUIT') {
      console.log('Finished');
      rl.close();
      process.exit(0);
     }
    else {
      placeCommand(command)
    }
  }
  else {
    console.log('Invalid command. Please enter a valid command.');
  }
}
rl.setPrompt('Enter a command (PLACE X,Y,F, MOVE, LEFT, RIGHT, REPORT, or QUIT): ');
rl.prompt();
rl.on('line', (line: string) => {
  processCommand(line);
  rl.prompt();
}).on('close', () => {
  console.log('Bye!');
  process.exit(0);
});