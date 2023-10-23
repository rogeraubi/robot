import { spawn } from 'child_process';

const app = spawn('ts-node', ['src/app.ts'], {
  stdio: 'pipe',
});

const commands = ['PLACE 1,1,NORTH\n', 'MOVE\n', 'REPORT\n'];
const expectedOutput = '1,2,NORTH\n';

let output = '';

app.stdout.setEncoding('utf8');
app.stdout.on('data', (data) => {
  output += data;

  if (output.includes(expectedOutput)) {
    app.kill('SIGINT');
  }
});

app.on('close', (code) => {
  if (code === 0) {
    console.log('Test passed.');
  } else {
    console.error('Test failed.');
  }
});

commands.forEach((command) => {
  app.stdin.write(command);
});

app.stdin.end();
