import { Component, OnInit, Input } from '@angular/core';

import { Trade } from '../../shared';

@Component({
  selector: 'template-card-trade',
  templateUrl: './card-trade.component.html',
  styleUrls: ['./card-trade.component.scss']
})
export class CardTradeComponent implements OnInit {

  @Input('trade') trade: Trade;

  constructor() { }

  ngOnInit() {
  }

}
