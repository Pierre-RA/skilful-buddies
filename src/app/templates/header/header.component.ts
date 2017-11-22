import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Notification, User } from '../../shared';
import { AuthService } from '../../shared/auth.service';
import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'template-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('active') active: string;
  profile: User;
  sub: Subscription;
  homeURI: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService
  ) {
    this.homeURI = '';
    this.getProfile();
  }

  ngOnInit() {
    // this.getProfile();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

  getProfile() {
    this.authService.isLoggedIn()
      .subscribe(result => {
        if (result) {
          this.homeURI = '/profile/' + result;
        }
      });
    this.sub = this.usersService.getOwner().subscribe(user => {
      this.profile = user;
    });
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
