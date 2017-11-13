import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'template-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input('url') url: string;
  @Input('type') type: string;
  @Input('notifications') notifications: Array<Object>;
  menuOpened: boolean;
  isNotified: boolean;

  constructor(
    private elemRef: ElementRef
  ) {
    this.menuOpened = false;
  }

  ngOnInit() {
    this.type = 'fa-' + this.type;
    this.isNotified = this.notifications && this.notifications.length > 0;
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  slice(index: number) {
    console.log('slice: ', index);
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  toggle(event) {
    if (this.elemRef.nativeElement.contains(event.target)) {
      this.menuOpened = !this.menuOpened;
    } else {
      this.menuOpened = false;
    }
  }
}
