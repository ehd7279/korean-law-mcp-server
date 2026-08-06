const { spawn } = require('child_process');

const port = process.env.PORT || '10000';
console.log(`Starting korean-law-mcp SSE server on port ${port}...`);

// CLI 명령어 대신 node 프로세스에서 포트와 sse 옵션을 직접 주입하여 실행
const child = spawn('npx', ['korean-law-mcp', '--transport', 'sse', '--port', port], {
  stdio: 'inherit',
  shell: true,
  env: process.env
});

child.on('exit', (code) => {
  console.log(`Child process exited with code ${code}`);
  process.exit(code);
});
