import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'angular2-markdown';

import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

import { CardTradeComponent } from './card-trade.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MarkdownModule
  ],
  declarations: [CardTradeComponent, SafeHtmlPipe],
  exports: [CardTradeComponent]
})
export class CardTradeModule { }
