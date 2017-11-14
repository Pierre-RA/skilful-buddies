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

  constructor(
    private chatService: ChatService
  ) {
    this.chatService.getHeaders().subscribe(chats => {
      this.chats = chats;
    });
  }

  ngOnInit() {
  }

}
