import { Component, OnInit } from '@angular/core';

import { Chat, Message } from '../../shared/models';
import { ChatService } from '../../shared/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chats: Array<Chat>;
  current: Chat;
  active: number;

  constructor(
    private chatService: ChatService
  ) {
    this.active = -1;
    this.chatService.getHeaders().subscribe(chats => {
      this.chats = chats;
      if (this.chats.length > 0) {
        this.active = 0;
        this.chatService.getContent(0).subscribe(chat => {
          this.current = chat;
        });
      }
    });
  }

  ngOnInit() {
  }

}
