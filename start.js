import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start backend server
const backend = spawn('npm', ['run', 'dev'], {
  cwd: join(__dirname, 'backend'),
  shell: true
});

backend.stdout.on('data', (data) => {
  console.log(`[Backend] ${data}`);
});

backend.stderr.on('data', (data) => {
  console.error(`[Backend Error] ${data}`);
});

// Start frontend server
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  shell: true
});

frontend.stdout.on('data', (data) => {
  console.log(`[Frontend] ${data}`);
});

frontend.stderr.on('data', (data) => {
  console.error(`[Frontend Error] ${data}`);
});

// Handle process termination
process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
}); 