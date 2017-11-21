import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageScrollConfig } from 'ng2-page-scroll';

import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.isLoggedIn()
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/profile', result]);
        }
      });
    PageScrollConfig.defaultDuration = 500;
  }

  ngOnInit() {
  }

}
