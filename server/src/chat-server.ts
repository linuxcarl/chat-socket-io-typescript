import { createServer, Server } from 'http';
import express from 'express';
import socketIo from 'socket.io';

import { Message } from './models/message.model';
import { config } from './config';

export class ChatServer {
  public static readonly PORT: any = config.api.port;
  private app!: express.Application;
  private server!: Server;
  private io!: socketIo.Server;
  private port!: string | number;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }
  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = ChatServer.PORT;
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on the port %s', this.port);
    });

    this.io.on('connect', (socket: any) => {
      console.log('Connected client on port %s', this.port);
      socket.on('message', (msg: Message) => {
        console.log('[Server](message): %s', JSON.stringify(msg));
        this.io.emit('message', msg);
      });
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
  public getApp(): express.Application {
    return this.app;
  }
}
