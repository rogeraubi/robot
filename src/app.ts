import ToyRobot from './toy-robot';
import { isValidCommand } from '../utils/commandValidator';
import * as readline from 'readline';
import { EventEmitter } from 'events';
import * as fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const tableSize = 5; // Specify the table size here
const robot = new ToyRobot(tableSize);

// Create event emitters for user input and file input
const userInputEmitter = new EventEmitter();
const fileInputEmitter = new EventEmitter();

// Function to handle PLACE command
function placeCommand(commandArgs: string) {
  const [x, y, facing] = commandArgs.split(',');
  robot.place(parseInt(x), parseInt(y), facing);
}

// Function to handle different commands
function handleCommand(command: string) {
  const parts = command.trim().toUpperCase().split(' ');
  const commandName = parts[0];
  switch (commandName) {
    case 'PLACE':
      placeCommand(parts[1]);
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

// Function to validate the user's choice
function validateChoice(choice: string) {
  choice = choice.trim();
  return choice === '1' || choice === '2' || choice === '3';
}

// Function to prompt the user for their choice
export function promptForChoice() {
  rl.question('Choose an option:\n1. Enter commands directly\n2. Process commands from a file\n3. Exit\n', handleChoice);
}

// Function to handle the user's choice
export function handleChoice(choice: string) {
  if (validateChoice(choice)) {
    if (choice === '1') {
      // If the user chooses to enter commands directly
      rl.setPrompt('Enter a command (PLACE X,Y,F, MOVE, LEFT, RIGHT, REPORT, or QUIT): ');
      rl.prompt();
    } else if (choice === '2') {
      rl.question('Enter the path to the command file (default: data/command.txt): ',  (filePath) => {
        if (!filePath) {
          filePath = 'data/command.txt';
        }
        fileInputEmitter.emit('processFileCommands', filePath);
      });
    } else if (choice === '3') {
      console.log('Goodbye!');
      process.exit(0);
    }
  } else {
    console.log('Invalid choice. Please enter 1, 2, or 3.');
    promptForChoice();
  }
}

// Event handler for user input
rl.on('line', (line: string) => {
  userInputEmitter.emit('userInput', line);
}).on('close', () => {
  console.log('Bye!');
  process.exit(0);
});

// Event handler for processing user input commands
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

// Event handler for processing commands from a file
fileInputEmitter.on('processFileCommands', (filePath: string) => {
  if (fs.existsSync(filePath)) {
    const fileStream = fs.createReadStream(filePath, 'utf-8');
    const commands: string[] = [];
    fileStream.on('data', (data: string) => {
      // Split the file content into individual commands based on newlines
      const fileCommands = data.split('\n');
      commands.push(...fileCommands);
    });

    fileStream.on('end', () => {
      // Process each command from the file
      console.log(`Content of file '${filePath}':`);
      console.log(commands.join('->')); // Log the content
      console.log("\n**result**\n");
      commands.forEach((command) => {
        userInputEmitter.emit('userInput', command);
      });
      process.exit(0);
    });
  } else {
    console.log(
      `File '${filePath}' does not exist. Please provide a valid file path.`,
    );
    promptForChoice();
  }
});

// Start by prompting for the user's choice
promptForChoice();
