import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatComponent } from './chat.component';
import { routing } from './chat.routing';

import { HeaderModule } from '../../templates/header/header.module';

import { ChatService } from '../../shared/chat.service';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    routing
  ],
  declarations: [ChatComponent],
  providers: [ChatService]
})
export class ChatModule { }
