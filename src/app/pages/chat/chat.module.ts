import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChatComponent } from './chat.component';
import { routing } from './chat.routing';

import { HeaderModule } from '../../templates/header/header.module';

import { ChatService } from '../../shared/chat.service';
import { AuthService } from '../../shared/auth.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    HeaderModule,
    routing,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ChatComponent],
  providers: [ChatService, AuthService]
})
export class ChatModule { }
