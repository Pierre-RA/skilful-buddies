import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'ngx-facebook';

import { Observable } from 'rxjs/Observable';

import { User } from './models';

@Injectable()
export class AuthService {

  redirectUrl: string;

  constructor(
    private router: Router
  ) { }

  isLoggedIn(): Observable<User> {
    if (window.localStorage.getItem('token')) {
      return Observable.of(true);
    }
    return Observable.of(false);
  }

  facebookLogin(res: LoginResponse) {
    if (res.status == 'connected') {
      window.localStorage.setItem('token', res.authResponse.accessToken);
      this.router.navigate(['/']);
    }
  }

  logout() {
    window.localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
