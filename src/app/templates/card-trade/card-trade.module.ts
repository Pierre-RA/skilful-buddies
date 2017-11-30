import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'angular2-markdown';

import { CardTradeComponent } from './card-trade.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MarkdownModule
  ],
  declarations: [CardTradeComponent],
  exports: [CardTradeComponent]
})
export class CardTradeModule { }
