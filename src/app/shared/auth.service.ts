import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FacebookService, LoginOptions, LoginResponse } from 'ngx-facebook';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';
import { User } from './models';

@Injectable()
export class AuthService {

  apiBase: string;
  redirectUrl: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FacebookService
  ) {
    this.apiBase = environment.apiBase;
    fb.init({
      appId: '1465809513539908',
      version: 'v2.11'
    });
  }

  isLoggedIn(): Observable<string> {
    return Observable.of(window.localStorage.getItem('profile_id'));
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
      { 'access_token': window.localStorage.getItem('token') }).subscribe(data => {
        window.localStorage.setItem('profile', JSON.stringify(data));
        window.localStorage.setItem('profile_id', data['_id']);
        this.router.navigate(['/search']);
      });
  }

  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('profile_id');
    this.router.navigate(['/']);
  }

}
