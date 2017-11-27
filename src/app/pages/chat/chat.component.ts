import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';

import { Chat, Message } from '../../shared/models';
import { ChatService } from '../../shared/chat.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('scrollable') scrollElement;
  chats: Array<Chat>;
  current: Chat;
  active: number;
  profile: string;

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {
    this.active = -1;
    this.profile = this.authService.getProfilePicture();
    this.chatService.getHeaders().subscribe(chats => {
      this.chats = chats;
      if (this.chats.length > 0) {
        this.active = 0;
        this.chatService.getContent(0).subscribe(chat => {
          this.current = chat;
        });
      }
    });

    // this.chatService.getMessages().subscribe(message => {
    //   console.log(message);
    // });
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      this.scrollElement.nativeElement.scrollTop =
        this.scrollElement.nativeElement.scrollHeight;
    } catch(err) {}
  }

  addChat() {
    console.log('add chat');
  }

  goToChat(index: number) {
    this.chatService.getContent(index).subscribe(chat => {
      this.active = index;
      this.current = chat;
    });
  }

}
