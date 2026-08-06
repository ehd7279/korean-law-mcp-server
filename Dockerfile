FROM node:20-slim

WORKDIR /app

# korean-law-mcp 패키지 패치 및 전역 설치
RUN npm install -g korean-law-mcp

# Render 기본 포트 설정
ENV PORT=10000
EXPOSE 10000

# SSE 모드로 서버 실행 (Render 포트 환경변수 적용)
CMD ["sh", "-c", "korean-law-mcp --transport sse --port $PORT"]
