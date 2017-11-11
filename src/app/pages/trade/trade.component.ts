import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {

  states = ['drill', 'mushrooms'];
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
