FROM node:20-slim

WORKDIR /app

# 글로벌 설치 대신 package.json으로 설치 및 실행
COPY package*.json ./
RUN npm install

# Render가 지정하는 PORT 사용
ENV PORT=10000
EXPOSE 10000

CMD ["npx", "korean-law-mcp", "--transport", "sse"]
