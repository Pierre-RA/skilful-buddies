import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn().map(user => {
      if (!user) {
        this.authService.redirectUrl = state.url;
        this.router.navigate(['/']);
      }
      return !!user;
    });
  }

  canActivateChild(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn().map(user => {
      if (!user) {
        this.authService.redirectUrl = state.url;
        this.router.navigate(['/']);
      }
      return !!user;
    });
  }

}
