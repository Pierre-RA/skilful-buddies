import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Contact } from '../../shared';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  states = ['Erlich Bachman', 'Dinesh Chugtai', 'Gilfoyle Bertram', 'Nelson \'Big Head\' Bighetti'];
  form: FormGroup;
  cards: Array<Contact>;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private typeaheadConfig: NgbTypeaheadConfig
  ) {
    this.typeaheadConfig.showHint = true;
  }

  ngOnInit() {
    this.initForm();
    // this.open(this.introModal);
  }

  initForm(): void {
    this.form = this.fb.group({
      search: ['', Validators.required]
    });
  }

  itemSelected(values: Object) {
    if (values['item']) {
      this.search(values['item']);
    }
  }

  search(query: string) {
    this.cards = [];
    this.searchService.queryConnects(query).subscribe(
      contacts => {
        this.cards = contacts;
      }
    );
  }

  onSubmit(values: Object) {
    if (this.states.indexOf(values['search']) != -1) {
      this.search(values['search']);
    }
  }

  searchResult = (text: Observable<string>) =>
    text.debounceTime(200)
    .distinctUntilChanged()
    .map(term => term.length < 1 ? []
      : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));


}
