import { createServer, Server } from 'http';
import express from 'express';
import socketIo from 'socket.io';

import { Message } from './models';
import { config } from '../config';

export class ChatServer {
  public static readonly PORT: any = config.api.port;
  #app!: express.Application;
  #server!: Server;
  #io!: socketIo.Server;
  #port!: string | number;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }
  protected createApp(): void {
    this.#app = express();
  }

  protected createServer(): void {
    this.#server = createServer(this.#app);
  }

  protected config(): void {
    this.#port = ChatServer.PORT;
  }

  protected sockets(): void {
    this.#io = socketIo(this.#server);
  }

  protected listen(): void {
    this.#server.listen(this.#port, () => {
      console.log('Running server on the port %s', this.#port);
    });

    this.#io.on('connect', (socket: any) => {
      console.log('Connected client on port %s', this.#port);
      socket.on('message', (msg: Message) => {
        console.log('[Server](message): %s', JSON.stringify(msg));
        this.#io.emit('message', msg);
      });
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
  public getApp(): express.Application {
    return this.#app;
  }
}
