import { User } from './';

export class Message {
  constructor(private from: User, private content: string) {}
}
