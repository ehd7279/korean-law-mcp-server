const http = require('http');
const { spawn } = require('child_process');

const port = process.env.PORT || 10000;

// Render가 포트를 감지할 수 있도록 HTTP 헬스체크 및 SSE 래퍼 서버 생성
const server = http.createServer((req, res) => {
  if (req.url === '/healthz' || req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('korean-law-mcp server is running!');
    return;
  }

  // SSE 및 MCP 요청을 처리할 수 있도록 응답 헤더 설정
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  res.write(`event: endpoint\ndata: /message\n\n`);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
