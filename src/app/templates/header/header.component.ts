import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Notification, User } from '../../shared';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'template-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('active') active: string;
  @Input('fixed') fixed: boolean;
  profile: User;
  sub: Subscription;
  homeURI: string;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.homeURI = '';
    this.sub = this.authService.getOwner()
      .subscribe(user => {
        this.getProfile(user);
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

  getProfile(user: User) {
    this.homeURI = '/';
    if (user) {
      this.homeURI = user ? '/profile/' + user.id : '';
      this.profile = user;
    }
  }

  getUsersNotifications() {
    return [];
  }

  getAlertNotifications() {
    return [
      new Notification('', 'Come here for notifications', false),
      new Notification('', 'Jian Yang wants to trade', true)
    ];
  }

  getCommentsNotifications() {
    return [];
  }

}
