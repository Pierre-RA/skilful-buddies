import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

import { Chat, Message } from './models';
import * as Chats from './mock/chat.json';
import { environment } from '../../environments/environment';

const chats: Array<Chat> = Chat.getChats(Chats['chats']);

@Injectable()
export class ChatService {

  private chatBase: string;
  private apiBase: string;
  private socket;
  private sub: BehaviorSubject<Chat>;
  private current: Chat;

  constructor(
    private http: HttpClient
  ) {
    this.chatBase = environment.chatBase;
    this.apiBase = environment.apiBase;
    this.current = null;
    this.sub = new BehaviorSubject<Chat>(null);
  }

  getHeaders(): Observable<Array<Chat>> {
    return Observable.of(chats);
  }

  getContent(id: number): Observable<Chat> {
    return this.http.get<Chat>(this.apiBase + 'chat/' + id)
      .catch(err => {
        return Observable.of(null);
      });
  }

  getMessage(): Observable<Message> {
    let observable = new Observable<Message>(observer => {
        this.socket = io(this.chatBase);
        this.socket.on('message', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      })
      return observable;
  }

  addMessage(id: number, message: Message) {
    this.socket.emit('add-message', {
      id: id,
      user: message.user,
      text: message.text,
      date: message.date
    });
  }

  addChat(user1: string, user2: string, title: string) {
    console.log('add chat');
  }

}
