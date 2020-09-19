import { Message } from './message.model';
import { User } from './user.model';

export class ChatMessage extends Message {
  constructor(from: User, content: string) {
    super(from, content);
  }
}
