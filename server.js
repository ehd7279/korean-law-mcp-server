const express = require('express');
const { SSEServerTransport } = require('@modelcontextprotocol/sdk/server/sse.js');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 10000;

// Render 헬스체크용
app.get('/', (req, res) => res.send('korean-law-mcp server is active!'));

let transports = {};

// Claude가 접속하는 SSE 엔드포인트
app.get('/sse', async (req, res) => {
  const transport = new SSEServerTransport('/message', res);
  transports[transport.sessionId] = transport;

  // korean-law-mcp CLI를 자식 프로세스로 실행하여 통신 연결
  const mcpProcess = spawn('npx', ['korean-law-mcp'], {
    env: process.env
  });

  mcpProcess.stdout.on('data', (data) => {
    // stdio 응답을 SSE로 클라이언트에 전달
  });

  req.on('close', () => {
    delete transports[transport.sessionId];
    mcpProcess.kill();
  });

  await transport.start();
});

app.post('/message', async (req, res) => {
  // 클라이언트의 메시지 처리
  const sessionId = req.query.sessionId;
  const transport = transports[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send('Session not found');
  }
});

app.listen(port, () => console.log(`MCP SSE Server listening on port ${port}`));
