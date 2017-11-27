import { Injectable } from '@angular/core';
// import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Chat } from './models';
import * as Chats from './mock/chat.json';
import { environment } from '../../environments/environment';

const chats: Array<Chat> = Chat.getChats(Chats['chats']);

@Injectable()
export class ChatService {

  private chatBase = '';
  // private socket;

  constructor() {
    this.chatBase = environment.chatBase;
  }

  getHeaders(): Observable<Array<Chat>> {
    return Observable.of(chats);
  }

  getContent(id: number): Observable<Chat> {
    return Observable.of(chats[id]);
  }

  // sendMessage(message){
  //   this.socket.emit('add-message', message);
  // }
  //
  // getMessages() {
  //   let observable = new Observable(observer => {
  //     this.socket = io(this.chatBase);
  //     this.socket.on('message', (data) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   })
  //   return observable;
  // }

}
