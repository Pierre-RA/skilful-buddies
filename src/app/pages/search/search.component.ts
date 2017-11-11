import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
// import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Contact } from '../../shared';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  states = ['Developer', 'Used cars', 'Mushrooms', 'Cult', 'Technology', 'Human resources'];
  form: FormGroup;
  cards: Array<Contact>;
  @ViewChild('introModal') introModal;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
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

  onSubmit(values: Object) {
    if (this.states.indexOf(values['search']) != -1) {
      this.search(values['search']);
    }
  }

  itemSelected(values: Object) {
    if (values['item']) {
      this.search(values['item']);
    }
  }

  search(query: string) {
    this.cards = [];
    this.searchService.queryContacts(query).subscribe(
      contacts => {
        this.cards = contacts;
      }
    );
  }

  searchResult = (text: Observable<string>) =>
    text.debounceTime(200)
    .distinctUntilChanged()
    .map(term => term.length < 1 ? []
      : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  open(content) {
    this.modalService.open(content);
  }

}
