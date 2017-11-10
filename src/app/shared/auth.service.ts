import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, LoginOptions, LoginResponse } from 'ngx-facebook';

import { Observable } from 'rxjs/Observable';

import { User } from './models';

@Injectable()
export class AuthService {

  redirectUrl: string;

  constructor(
    private router: Router,
    private fb: FacebookService
  ) {
    fb.init({
      appId: '1465809513539908',
      version: 'v2.11'
    });
  }

  isLoggedIn(): Observable<User> {
    if (window.localStorage.getItem('token')) {
      return Observable.of(true);
    }
    return Observable.of(false);
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
        window.localStorage.setItem('dat', JSON.stringify(res.authResponse));
        this.getProfile();
        this.getPicture();
        this.router.navigate(['/']);
      });
  }

  getProfile(): void {
    this.fb.api('/me?fields=name,gender,age_range')
      .then((res: any) => {
        window.localStorage.setItem('profile_name', res['name']);
        window.localStorage.setItem('profile_gender', res['gender']);
        window.localStorage.setItem('profile_age_range', res['age_range']['min']);
        console.log('Got the users friends', res);
      });
  }

  getPicture(): void {
    this.fb.api('/me/picture')
      .then((res: any) => {
        window.localStorage.setItem('profile_picture', res['data']['url']);
        console.log('Profile picture', res);
      });
  }

  logout() {
    window.localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }

}
