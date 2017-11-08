import { Component, OnInit, Input } from '@angular/core';

import { Contact } from '../../shared';

@Component({
  selector: 'template-card-result',
  templateUrl: './card-result.component.html',
  styleUrls: ['./card-result.component.scss']
})
export class CardResultComponent implements OnInit {

  @Input('card') card: Contact;

  constructor() { }

  ngOnInit() {
  }

}
