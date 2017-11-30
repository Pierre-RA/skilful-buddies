import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { User, Skill, Trade } from '../../shared';
import { UsersService } from '../../shared/users.service';
import { AuthService } from '../../shared/auth.service';
import { SkillsService } from '../../shared/skills.service';

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

  skillForm: FormGroup;
  skillEdit: boolean;
  tradeForm: FormGroup;
  tradeEdit: boolean;
  index: number;

  givenAddress: string;
  trades: Array<Trade>;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private skillsService: SkillsService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.editable = false;
    this.trades = [{
      name: 'Smartphone',
      content: 'Something I got from Raviga.'
    }];
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
  }

  checkOwner(id: string) {
    this.authService.getOwner()
      .subscribe(result => {
        if (result) {
          this.editable = result['_id'] == id;
          this.id = result['_id'];
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

  /**
   * SKILLS
   */
  openModalSkill(content, object, index) {
    this.prepareForm(object, index);
    this.openModal(content);
  }

  prepareForm(skill: Skill, index?: number) {
    this.skillEdit = true;
    this.index = index;
    if (!skill) {
      skill = new Skill().deserialize({
        name: '',
        content: '',
        owner: this.profile.id
      });
      this.skillEdit = false;
    }
    this.skillForm = this.fb.group({
      'name': [skill.name, Validators.required],
      'content': [skill.content, Validators.required],
      'owner': [skill.owner],
      '_id': [skill['_id']]
    });
  }

  onSubmitSkill() {
    if (this.skillEdit) {
      this.skillsService.updateSkill(this.skillForm.value).subscribe(skill => {
        this.profile.skills[this.index] = skill;
        this.modal.close();
      });
    } else {
      this.skillsService.addSkill(this.skillForm.value).subscribe(skill => {
        this.profile.skills.push(skill);
        this.modal.close();
      });
    }
  }

}
