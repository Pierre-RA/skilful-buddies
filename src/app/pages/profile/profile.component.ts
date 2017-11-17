import { Component, OnInit } from '@angular/core';

import { User } from '../../shared';
import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  constructor(
    private usersService: UsersService
  ) {
    this.usersService.getUsers().subscribe(data => {
      let tmp = User.getUsers(data);
      console.log(tmp);
    });
  }

  ngOnInit() {
  }

}
