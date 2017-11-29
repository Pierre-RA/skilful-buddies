import { Component, OnInit, OnDestroy, ViewChild, AfterViewChecked, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { Chat, Message, User } from '../../shared/models';
import { ChatService } from '../../shared/chat.service';
import { AuthService } from '../../shared/auth.service';

import { Subscription } from 'rxjs/Subscription';

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
  profile: User;
  form: FormGroup;
  textBoxStatus: boolean;
  userSub: Subscription;
  chatSub: Subscription;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.textBoxStatus = false;
    this.active = -1;
    let userSub = this.authService.getOwner()
      .subscribe(user => {
        this.profile = user;
      });
    this.chatService.getHeaders().subscribe(chats => {
      this.chats = chats;
      if (this.chats.length > 0) {
        this.active = 0;
        this.chatService.getContent(0).subscribe(chat => {
          this.current = chat;
          if (!chat) {
            this.current = new Chat().deserialize({});
          }
        });
      }
    });
    let chatSub = this.chatService.getMessage().subscribe(data => {
      console.log('message', data);
    });
    this.form = this.fb.group({
      'content': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.chatSub.unsubscribe();
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

  isOwner(id: string) {
    return id == this.profile['_id'];
  }

  onSubmit() {
    let message: Message = {
      user: this.profile['_id'],
      date: new Date().toISOString(),
      text: this.form.controls['content'].value
    };
    this.chatService.addMessage(this.active, message);
    this.current.messages.push(message);
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
