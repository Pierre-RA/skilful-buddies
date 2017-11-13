import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'template-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input('url') url: string;
  @Input('type') type: string;
  @Input('isNotified') isNotified: boolean;

  constructor() { }

  ngOnInit() {
    this.type = 'fa-' + this.type;
  }

}
