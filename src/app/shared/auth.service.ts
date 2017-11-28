import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FacebookService, LoginOptions, LoginResponse } from 'ngx-facebook';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';
import { User } from './models';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {

  apiBase: string;
  redirectUrl: string;
  sub: BehaviorSubject<User>;
  profile: User;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FacebookService,
    private usersService: UsersService
  ) {
    this.apiBase = environment.apiBase;
    fb.init({
      appId: '1465809513539908',
      version: 'v2.11'
    });
    this.sub = new BehaviorSubject<User>(null);
    this.usersService.getOwner()
      .subscribe(user => {
        this.sub.next(user);
      });
  }

  getOwner(): Observable<User> {
    return this.sub.asObservable();
  }

  getOwnerId(): string {
    return window.localStorage.getItem('profile_id');
  }

  isLoggedIn(): Observable<boolean> {
    return this.sub.asObservable().map(user => {
      return !!user;
    });
  }

  getProfilePicture(): string {
    return window.localStorage.getItem('profile_picture');
  }

  facebookLogin() {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends'
    };

    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        window.localStorage.setItem('token', res.authResponse.accessToken);
        // window.localStorage.setItem('dat', JSON.stringify(res.authResponse));
        this.serverLogin();
      });
  }

  serverLogin() {
    this.http.post(
      this.apiBase + 'users/facebook',
      { 'access_token': window.localStorage.getItem('token') })
      .subscribe((data: User) => {
        window.localStorage.setItem('profile', JSON.stringify(data));
        window.localStorage.setItem('profile_id', data['_id']);
        this.sub.next(data);
        this.router.navigate(['/search']);
      });
  }

  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('profile_id');
    this.sub.next(null);
    this.router.navigate(['/']);
  }

}
