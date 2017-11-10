import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  value: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.setValue(this.activatedRoute.snapshot.data['value']);
  }

  ngOnInit(): void {
  }

  facebookLogin(): void {
    this.authService.facebookLogin();
  }

  setValue(value): void {
    this.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    this.value = this.value.replace(/-/i, ' ');
  }

}
