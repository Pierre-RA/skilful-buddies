import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'template-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('active') active: string;

  constructor() { }

  ngOnInit() {
  }

}
