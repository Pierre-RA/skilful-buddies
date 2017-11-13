import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'template-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input('url') url: string;
  @Input('type') type: string;
  @Input('isNotified') isNotified: boolean;
  menuOpened: boolean;

  constructor(
    private elemRef: ElementRef
  ) {
    this.menuOpened = false;
  }

  ngOnInit() {
    this.type = 'fa-' + this.type;
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
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
