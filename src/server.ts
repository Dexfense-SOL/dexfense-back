import app from './app';
import { config } from './config/env';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as WebSocketServer, WebSocket } from 'ws'; // ✅ 추가
import { socketManager } from './socketManager'; // ✅ 추가

dotenv.config();

// 예외 핸들링
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// ✅ HTTP 서버 따로 생성
const server = createServer(app);

// ✅ WebSocket 서버를 HTTP 서버에 붙임
const wss = new WebSocketServer({ server, path: '/ws' });
console.log(`🚀 WebSocket running on ${config.PORT}`);

wss.on('connection', (ws: WebSocket) => {
  console.log('🔗 클라이언트 연결됨');
  socketManager.addSocket(ws);

  ws.on('close', () => {
    console.log('❌ 클라이언트 연결 종료');
    socketManager.removeSocket(ws);
  });
});

// ✅ 서버 실행
server.listen(Number(config.PORT), '0.0.0.0', () => {
  console.log(`🚀 Server running on ${config.PORT}`);
});