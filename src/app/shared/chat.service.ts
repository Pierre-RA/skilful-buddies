import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

import { Chat, Message } from './models';
import { environment } from '../../environments/environment';

@Injectable()
export class ChatService {

  private chatBase: string;
  private apiBase: string;
  private socket;
  private sub: BehaviorSubject<Chat>;
  private current: Chat;
  private token: string;

  constructor(
    private http: HttpClient
  ) {
    this.chatBase = environment.chatBase;
    this.apiBase = environment.apiBase;
    this.current = null;
    this.sub = new BehaviorSubject<Chat>(null);
    this.token = window.localStorage.getItem('token');
  }

  getHeaders(): Observable<Array<Chat>> {
    return this.http.get<Array<Chat>>(
      this.apiBase + 'chat', {
        headers: new HttpHeaders().set('Authorization', 'JWT ' + this.token)
      })
      .catch(err => {
        return Observable.of(null);
      });
  }

  getContent(id: string): Observable<Chat> {
    return this.http.get<Chat>(this.apiBase + 'chat/' + id)
      .catch(err => {
        return Observable.of(null);
      });
  }

  getMessage(): Observable<Message> {
    let observable = new Observable<Message>(observer => {
        this.socket.on('message', (data) => {
          console.log(data);
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      })
      return observable;
  }

  addMessage(id: string, message: Message) {
    this.socket.emit('add-message', {
      id: id,
      user: message.user,
      text: message.text,
      date: message.date
    });
  }

  joinRoom(id: string, name: string) {
    if (!this.socket) {
      this.socket = io(this.chatBase);
      this.socket.emit('send-hello', name);
    }
    this.socket.emit('join-room', id);
  }

  addChat(user1: string, user2: string, title: string): Observable<Chat> {
    return this.http.post<Chat>(this.apiBase + 'chat', {
      user1: user1,
      user2: user2,
      title: title,
      messages: []
    });
  }

}
