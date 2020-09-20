import { Action } from './action';
import { User } from './user';

export interface Message{
  from?: User;
  content?: any;
  action?: Action;
}