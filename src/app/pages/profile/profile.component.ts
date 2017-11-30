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
import { TradeService } from '../../shared/trade.service';

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

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private skillsService: SkillsService,
    private tradeService: TradeService,
    private router: Router,
    private fb: FormBuilder,
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
    this.profile.skills = this.profile.skills || [];
    this.profile.trades = this.profile.trades || [];
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
    this.prepareSkillForm(object, index);
    this.openModal(content);
  }

  prepareSkillForm(skill: Skill, index?: number) {
    this.skillEdit = true;
    this.index = index;
    if (!skill) {
      skill = new Skill().deserialize({
        name: '',
        content: '',
        owner: this.profile['_id']
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
      if (!this.skillForm.value['_id']) {
        delete this.skillForm.value['_id'];
      }
      this.skillsService.addSkill(this.skillForm.value).subscribe(skill => {
        this.profile.skills.push(skill);
        this.modal.close();
      });
    }
  }

  removeSkill(skill: Skill) {
    this.skillsService.removeSkill(this.skillForm.value).subscribe(skill => {
      this.profile.skills.splice(this.index, 1);
      this.modal.close();
    })
  }

  /**
   * TRADES
   */
   openModalTrade(content, object, index) {
     this.prepareTradeForm(object, index);
     this.openModal(content);
   }

   prepareTradeForm(trade: Trade, index?: number) {
     this.tradeEdit = true;
     this.index = index;
     if (!trade) {
        trade = new Trade().deserialize({
         name: '',
         content: '',
         owner: this.profile['_id'],
         // TODO: PRICE!!!
       });
       this.tradeEdit = false;
     }
     this.tradeForm = this.fb.group({
       'name': [trade.name, Validators.required],
       'content': [trade.content, Validators.required],
       'owner': [trade.owner],
       '_id': [trade['_id']]
     });
   }

   onSubmitTrade() {
     if (this.tradeEdit) {
       this.tradeService.updateTrade(this.tradeForm.value).subscribe(trade => {
         this.profile.trades[this.index] = trade;
         this.modal.close();
       });
     } else {
       if (!this.tradeForm.value['_id']) {
         delete this.tradeForm.value['_id'];
       }
       this.tradeService.addTrade(this.tradeForm.value).subscribe(trade => {
         this.profile.trades.push(trade);
         this.modal.close();
       });
     }
   }

   removeTrade(trade: Trade) {
     this.tradeService.removeTrade(this.tradeForm.value).subscribe(trade => {
       this.profile.trades.splice(this.index, 1);
       this.modal.close();
     })
   }
}
