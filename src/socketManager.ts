import { WebSocket } from 'ws';

class SocketManager {
  sockets: Set<WebSocket> = new Set();

  addSocket(socket: WebSocket) {
    this.sockets.add(socket);
  }

  removeSocket(socket: WebSocket) {
    this.sockets.delete(socket);
  }

  broadcast(data: any) {
    const json = JSON.stringify(data);
    this.sockets.forEach(socket => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(json);
      }
    });
  }
}

export const socketManager = new SocketManager();