import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { User } from '../../shared';
import { UsersService } from '../../shared/users.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  sub: Subscription;
  profile: User;
  editable: boolean;
  id: string;
  modal: NgbModalRef;

  givenAddress: string;
  text: string = 'developer, front-end';

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.editable = false;
  }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap(params => {
        this.checkOwner(params['id']);
        return this.usersService.getUser(params['id']);
      })
      .subscribe(user => this.getProfile(user));
  }

  getProfile(user: User) {
    this.profile = user;
    this.fillPlace();
    console.log(this.profile);
  }

  checkOwner(id: string) {
    this.authService.isLoggedIn()
      .subscribe(result => {
        if (result) {
          this.editable = result == id;
          this.id = result;
        }
      });
  }

  editField(field: string, value) {
    let object = {};
    object[field] = value;
    this.usersService.updateUser(this.id, object).subscribe(
      result => {
      }
    );
  }

  editAddress(value, modal) {
    this.usersService.updateAddress(this.id, value).subscribe(
      result => {
        this.profile.place = result.place;
        this.fillPlace();
        this.modal.close();
      }
    );
  }

  openModal(content) {
    this.modal = this.modalService.open(content);
  }

  fillPlace() {
    if (!this.profile.place) {
      this.profile.place = {
        city: 'Place Not assigned',
        state: '',
        country: '',
        latitude: -13.1808552,
        longitude: 130.7566543
      }
    }
    this.givenAddress = this.profile.place.city;
    if (this.profile.place.country) {
      this.givenAddress += this.profile.place.country == 'United States' ? ', ' + this.profile.place.state : ', ' + this.profile.place.country;
    }
  }

}
