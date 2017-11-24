import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FacebookService } from 'ngx-facebook';

import { ChatComponent } from './chat.component';
import { HeaderModule } from '../../templates/header/header.module';

import { ChatService } from '../../shared/chat.service';
import { AuthService } from '../../shared/auth.service';
import { UsersService } from '../../shared/users.service';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HeaderModule,
        RouterTestingModule,
        HttpClientModule,

      ],
      providers: [ChatService, AuthService, FacebookService, UsersService],
      declarations: [ ChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
