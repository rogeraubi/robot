import ToyRobot from './toy-robot-review';
import * as readline from 'readline';
import * as fs from 'fs';
import { EventEmitter } from 'events';
import { isValidCommand } from '../utils/commandValidator';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const tableSize = 5;
const robot = new ToyRobot(tableSize);
const userInputEmitter = new EventEmitter();
const fileInputEmitter = new EventEmitter();

function parsePlaceCommand(commandArgs: string): { x: number, y: number, facing: string } {
  const [x, y, facing] = commandArgs.split(',').map((part) => part.trim());
  return { x: parseInt(x), y: parseInt(y), facing };
}

function placeCommand(commandArgs: string) {
  const { x, y, facing } = parsePlaceCommand(commandArgs)
  if (robot.table.isInBounds(x, y )&& robot.isValidDirection(facing)) {
      robot.place(x, y, facing);
  }
  else {
        console.log('can not place');
    }
}
function handleCommand(trimmedCommand: string) {
    if (trimmedCommand.toUpperCase().startsWith('PLACE')) {
        const placeArgs = trimmedCommand.substring(6); // Remove "PLACE " from the beginning
      const match = placeArgs.match(/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(NORTH|SOUTH|EAST|WEST|north|south|east|west)$/);
      // for space on the \s*
      // for the match[0] is a format of 0, 0, north example and match is string[]
     if (match) {
       placeCommand(match[0].toUpperCase());
      } else {
      console.log('Invalid PLACE command');
    }
    } 
    else {
      const parts = trimmedCommand.split(' ');
      const commandName = parts[0];
      switch (commandName.toUpperCase()) {
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
          console.log('Invalid command11');
      }
    }
}

function validateChoice(choice: string) {
  choice = choice.trim();
  return choice === '1' || choice === '2' || choice === '3';
}

export function promptForChoice() {
  rl.question(
    'Choose an option:\n1. Enter commands directly\n2. Process commands from a file\n3. Exit\n',
    handleChoice,
  );
}

export function handleChoice(choice: string) {
  if (validateChoice(choice)) {
    if (choice === '1') {
      rl.setPrompt(
        'Enter a command (PLACE X,Y,F, MOVE, LEFT, RIGHT, REPORT, or QUIT): ',
      );
      rl.prompt();
    } else if (choice === '2') {
      rl.question(
        'Enter the path to the command file (default: data/command.txt): ',
        (filePath) => {
          if (!filePath) {
            filePath = 'data/command.txt';
          }
          fileInputEmitter.emit('processFileCommands', filePath);
        },
      );
    } else if (choice === '3') {
      console.log('Goodbye!');
      process.exit(0);
    }
  } else {
    console.log('Invalid choice. Please enter 1, 2, or 3.');
    promptForChoice();
  }
}

rl.on('line', (line: string) => {
  userInputEmitter.emit('userInput', line);
}).on('close', () => {
  console.log('Bye!');
  process.exit(0);
});

userInputEmitter.on('userInput', (line: string) => {
  if (isValidCommand(line)) {
    if (line.toUpperCase() === 'QUIT') {
      console.log('Finished');
      rl.close();
      process.exit(0);
    } else {
      handleCommand(line);
    }
  } else {
    console.log('Invalid command. Please enter a valid command.');
  }

  rl.prompt();
});

fileInputEmitter.on('processFileCommands', (filePath: string) => {
  if (fs.existsSync(filePath)) {
    const fileStream = readline.createInterface({
      input: fs.createReadStream(filePath, 'utf-8'),
    });

    fileStream.on('line', (line: string) => {
      userInputEmitter.emit('userInput', line);
    });

    fileStream.on('close', () => {
      console.log(`Finished processing file '${filePath}'`);
      process.exit(0);
    });
  } else {
    console.log(`File '${filePath}' does not exist. Please provide a valid file path.`);
    promptForChoice();
  }
});

promptForChoice();
