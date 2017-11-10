import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'template-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('active') active: string;
  profile: Profile;

  constructor(
    private authService: AuthService
  ) {
    this.getProfile();
  }

  ngOnInit() {
    // this.getProfile();
  }

  logout() {
    this.authService.logout();
  }

  getProfile() {
    this.profile = {
      name: window.localStorage.getItem('profile_name'),
      gender: window.localStorage.getItem('profile_gender'),
      ageRange: window.localStorage.getItem('profile_age_range'),
      picture: window.localStorage.getItem('profile_picture')
    };
  }

}

interface Profile {
  name: string;
  gender: string;
  ageRange: string;
  picture: string;
}
