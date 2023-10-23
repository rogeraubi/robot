`ronyRobot` is a TypeScript-based robot simulator application that provides two methods for controlling a toy robot's movements on a tabletop: direct user input through a user interface and processing commands from a file.


## Table of Contents
- [Features](#Features)
- [Installation](#installation)
- [How does it work](#How-does-it-work)
- [Usage](#usage)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)
- [Contributing](#contributing)
- [License](#license)


## Features

- Direct user input for manual command execution.
- Processing commands from a file.
- Command validation for error-free operation.


## Installation

Before you can run the ronyRobot application, make sure you have the following dependencies installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [TypeScript](https://www.typescriptlang.org/)

To install the project dependencies, run the following command:

```bash
npm install
```

This will install all the required packages as specified in the `package.json` file.

## How does it work 

This command starts the application, providing you with three options to control the robot:

### User Interface

1. **Enter Commands Directly**: Allows you to interact with the robot by entering commands directly through the console.

2. **Process Commands from a File**: Enables you to execute a sequence of commands from a file. The default file path is `data/command.txt`, but you can specify a different path if needed.

3. **Exit**: Exits the application.

### User Input

When you choose to enter commands directly, the application presents you with a user-friendly interface. You can input commands as follows:

- `PLACE X,Y,F`: Place the robot on the tabletop with the specified coordinates and facing direction (e.g., `PLACE 0,0,NORTH`).

- `MOVE`: Move the robot one unit forward in the current direction.

- `LEFT`: Rotate the robot 90 degrees to the left.

- `RIGHT`: Rotate the robot 90 degrees to the right.

- `REPORT`: Retrieve and display the robot's current position and facing direction.

- `QUIT`: Exit the application.

### Processing Commands from a File

If you choose to process commands from a file, you can provide the path to the command file. The application will execute the commands sequentially, and you will see the results in the console. If the specified file does not exist, you will be prompted to enter a valid file path.

### Command Validation

The application performs command validation to ensure the commands entered are correct and adhere to the specified format. If an invalid command is detected, you will receive a prompt to enter a valid one.

This command will start the application using `ts-node`. It's useful during development for quick testing.


## Usage

To run the ronyRobot application, you have the following options:

### Development Mode

In development mode, you can use the following command to run the application with TypeScript:

```bash
npm run dev
```


### Production Mode

To build and run the application in production mode, use the following command:

```bash
npm run build
npm run production
```

The application will be compiled into a `dist` folder, and `node` will execute the bundled JavaScript file.

### Directly Running the JavaScript Bundle

If you want to run the JavaScript bundle directly without building it, use:

```bash
node dist/bundle.js
```

This is useful when you just want to run the pre-built application.


## Testing

To run unit tests, use the following command:

```bash
npm run test:unit
```

This will execute unit tests using Mocha and generate code coverage reports using NYC (Istanbul).

### End-to-End Testing

You can also run end-to-end tests using the following command:

```bash
npm run test:e2e
```

This will execute end-to-end tests to check the complete functionality of the application.

## Linting and Formatting

To check your code for linting issues, use the following command:

```bash
npm run lint
```

To automatically fix some linting issues, use:

```bash
npm run lint:fix
```

To format your code with Prettier, use:

```bash
npm run format
```
It is recommended to directly use functions in the Vscode IDE  

## Contributing (optional)

Contributions to the ronyRobot project are welcome! If you want to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes.
4. Create a pull request.

Please make sure to write clear and descriptive commit messages.

## License

This project is licensed under the [ISC License](LICENSE).

---

For more details on how to use the  application, please visit the [project repository](https://github.com/rogeraubi/robot#readme).

