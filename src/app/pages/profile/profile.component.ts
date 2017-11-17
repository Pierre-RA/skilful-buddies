import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { User } from '../../shared';
import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  sub: Subscription;
  profile: User;

  constructor(
    private usersService: UsersService
  ) {
    this.getProfile();
    // this.usersService.getUsers().subscribe(data => {
    //   let tmp = User.getUsers(data);
    //   console.log(tmp);
    // });
  }

  ngOnInit() {
  }

  getProfile() {
    this.sub = this.usersService.getOwner().subscribe(user => {
      this.profile = user;
      console.log(this.profile.friends);
    });
  }

}
