import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Chat } from './models';
import * as Chats from './mock/chat.json';

const chats: Array<Chat> = Chat.getChats(Chats['chats']);

@Injectable()
export class ChatService {

  private apiBase = '';

  constructor() { }

  getHeaders(): Observable<Array<Chat>> {
    return Observable.of(chats);
  }

  getContent(id: number): Observable<Chat> {
    return Observable.of(chats[id]);
  }

}
