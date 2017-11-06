import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'template-card-result',
  templateUrl: './card-result.component.html',
  styleUrls: ['./card-result.component.scss']
})
export class CardResultComponent implements OnInit {

  @Input('card') card: Object;

  constructor() { }

  ngOnInit() {
  }

}
