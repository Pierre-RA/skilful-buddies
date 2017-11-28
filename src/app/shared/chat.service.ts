import { Injectable } from '@angular/core';
// import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

import { Chat, Message } from './models';
import * as Chats from './mock/chat.json';
import { environment } from '../../environments/environment';

const chats: Array<Chat> = Chat.getChats(Chats['chats']);

@Injectable()
export class ChatService {

  private chatBase = '';
  // private socket;
  private sub: BehaviorSubject<Chat>;
  private current: Chat;

  constructor() {
    this.chatBase = environment.chatBase;
    this.current = null;
    this.sub = new BehaviorSubject<Chat>(null);
  }

  getHeaders(): Observable<Array<Chat>> {
    return Observable.of(chats);
  }

  getContent(id: number): Observable<Chat> {
    this.current = chats[id];
    this.sub.next(this.current);
    return this.sub.asObservable();
    // return Observable.of(chats[id]);
  }

  addMessage(id: number, message: Message) {
    this.current.messages.push(message);
    this.sub.next(this.current);
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
