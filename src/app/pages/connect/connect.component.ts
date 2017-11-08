import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  states = ['Erlich Bachman', 'Dinesh Chugtai', 'Gilfoyle Bertram', 'Nelson \'Big Head\' Bighetti'];
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    // this.open(this.introModal);
  }

  initForm(): void {
    this.form = this.fb.group({
      search: ['', Validators.required]
    });
  }

  searchResult = (text: Observable<string>) =>
    text.debounceTime(200)
    .distinctUntilChanged()
    .map(term => term.length < 1 ? []
      : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));


}
