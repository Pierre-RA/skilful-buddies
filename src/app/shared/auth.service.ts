import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FacebookService, LoginOptions, LoginResponse } from 'ngx-facebook';
import { JwtHelper } from 'angular2-jwt';

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
  jwtHelper: JwtHelper;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FacebookService,
    private usersService: UsersService
  ) {
    this.jwtHelper = new JwtHelper();
    this.apiBase = environment.apiBase;
    fb.init({
      appId: '1465809513539908',
      version: 'v2.11'
    });
    this.sub = new BehaviorSubject<User>(null);
    this.usersService.getUser(this.getOwnerId())
      .subscribe(user => {
        this.sub.next(user);
      });
  }

  getOwner(): Observable<User> {
    return this.sub.asObservable();
  }

  getOwnerId(): string {
    const sessionToken = window.localStorage.getItem('session-token');
    if (sessionToken) {
      return this.jwtHelper.decodeToken(sessionToken)['id'];
    }
    return null;
  }

  isLoggedIn(): Observable<boolean> {
    return this.sub.asObservable().map(user => {
      return !!user;
    });
  }

  facebookLogin() {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends'
    };

    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        this.serverLogin(res.authResponse.accessToken);
      });
  }

  serverLogin(token) {
    this.http.post(
      this.apiBase + 'users/facebook',
      { 'access_token': token })
      .subscribe((data: {token: string, user: User}) => {
        window.localStorage.setItem('session-token', data.token);
        this.sub.next(data.user);
        this.router.navigate(['/profile/', data.user['_id']]);
      });
  }

  logout() {
    window.localStorage.removeItem('session-token');
    this.sub.next(null);
    this.router.navigate(['/']);
  }

}
