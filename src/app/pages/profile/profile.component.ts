import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

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
  editable: boolean;
  id: string;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .switchMap(params => {
        return this.usersService.getUser(params['id']);
      })
      .subscribe(user => this.getProfile(user));
  }

  getProfile(user: User) {
    this.profile = user;
    this.profile.place = {
      address: '5230 Newell Road, Palo Alto',
      latitude: 37.4461178,
      longitude: -122.1481813
    };
    console.log(this.profile);
  }

}
