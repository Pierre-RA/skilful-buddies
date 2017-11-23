import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardTradeComponent } from './card-trade.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [CardTradeComponent],
  exports: [CardTradeComponent]
})
export class CardTradeModule { }
