import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacebookService, LoginOptions, LoginResponse } from 'ngx-facebook';

import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  value: string;

  constructor(
    private fb: FacebookService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    fb.init({
      appId: '1465809513539908',
      version: 'v2.11'
    });
    this.setValue(this.activatedRoute.snapshot.data['value']);
  }

  ngOnInit(): void {
  }

  facebookLogin(): void {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends'
    };

    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        this.authService.facebookLogin(res);
      })
      .catch(this.handleError);
  }

  setValue(value): void {
    this.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    this.value = this.value.replace(/-/i, ' ');
  }

  private handleError(error): void {
    console.error('Error processing action', error);
  }

}
