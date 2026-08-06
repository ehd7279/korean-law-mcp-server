FROM node:20-slim

WORKDIR /app

# 필요 패키지 설치
COPY package*.json ./
RUN npm install
RUN npm install -g korean-law-mcp

COPY server.js ./

ENV PORT=10000
EXPOSE 10000

# server.js를 통해 포트 바인딩 및 SSE 실행
CMD ["node", "server.js"]
