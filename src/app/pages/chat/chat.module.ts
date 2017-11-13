import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatComponent } from './chat.component';
import { routing } from './chat.routing';

import { HeaderModule } from '../../templates/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    routing
  ],
  declarations: [ChatComponent]
})
export class ChatModule { }
