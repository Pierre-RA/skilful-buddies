import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Trade } from '../../shared';

@Component({
  selector: 'template-card-trade',
  templateUrl: './card-trade.component.html',
  styleUrls: ['./card-trade.component.scss']
})
export class CardTradeComponent implements OnInit {

  @Input('trade') trade: Trade;
  @Input('editable') editable: boolean;
  @Output() onEdit = new EventEmitter<Trade>();
  shadow: string;

  constructor() {
    this.shadow = 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)'
  }

  ngOnInit() {
    if (this.trade.color) {
      // this.shadow += ',' + this.trade.color;
      this.shadow = this.trade.color;
    }
  }

  edit() {
    this.onEdit.emit(this.trade);
  }

}
