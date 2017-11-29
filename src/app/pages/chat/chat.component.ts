import { Component, OnInit, OnDestroy, ViewChild, AfterViewChecked, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Chat, Message, User, PartialFriendList } from '../../shared/models';
import { ChatService } from '../../shared/chat.service';
import { AuthService } from '../../shared/auth.service';
import { UsersService } from '../../shared/users.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('scrollable') scrollElement;
  chats: Array<Chat>;
  current: Chat;
  active: string;
  profile: User;
  form: FormGroup;
  textBoxStatus: boolean;
  userSub: Subscription;
  chatSub: Subscription;
  modal: NgbModalRef;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private usersService: UsersService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.textBoxStatus = false;
    this.active = '';
    let userSub = this.authService.getOwner()
      .subscribe(user => {
        this.profile = user;
      });
    this.chatService.getHeaders().subscribe(chats => {
      this.chats = chats;
      if (this.chats.length > 0) {
        this.active = this.chats[0]['_id'];
        this.chatService.getContent(this.active).subscribe(chat => {
          this.current = chat;
          if (!chat) {
            this.current = new Chat().deserialize({});
          }
        });
      }
    });
    let chatSub = this.chatService.getMessage().subscribe(data => {
      if (!this.isOwner(data['message']['user'])) {
        this.current.messages.push(data['message']);
      }
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
    if (this.chatSub) {
      this.chatSub.unsubscribe();
    }
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

  addChat(content) {
    this.modal = this.modalService.open(content);
  }

  goToChat(id: string) {
    this.chatService.getContent(id).subscribe(chat => {
      this.active = id;
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

  friendSelected(values) {
    if (values && values.item) {
      this.chatService.addChat(
        this.profile['_id'],
        values.item._id,
        'new chat'
      ).subscribe(data => {
        this.modal.close();
        this.chats.push(data);
        this.goToChat(data['_id']);
      });
    }
  }

  queryNames = (text: Observable<string>) =>
    text
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => {
        return this.usersService.getUserFriends(this.profile['_id'], term);
      })
      .map(res => {
        if (res) {
          return res.friends;
        }
        return null;
      });

  formatter = (result: {name: string}) => {
    return result.name;
  };

}
