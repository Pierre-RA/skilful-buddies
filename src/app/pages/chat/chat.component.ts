import { Component, OnInit, ViewChild, AfterViewChecked, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

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
  form: FormGroup;
  textBoxStatus: boolean;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.textBoxStatus = false;
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
    this.form = this.fb.group({
      'content': ['', Validators.required]
    });
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

  onSubmit() {
    this.chatService.addMessage(this.active, {
      user: 'right',
      time: '12:33',
      text: this.form.controls['content'].value
    });
    this.form.controls['content'].setValue('');
    this.scrollToBottom();
  }

  onKeySubmitted(event) {
    if (event.keyCode == 13 && event.shiftKey) {
      this.textBoxStatus = true;
      this.onSubmit();
    }
  }

  onClear() {
    if (this.textBoxStatus) {
      this.form.controls['content'].setValue('');
      this.textBoxStatus = false;
    }
  }

}
