import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
// import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  states = ['Developer', 'Used cars', 'Mushrooms', 'Cult', 'Technology', 'Human resources'];
  searchResult;
  form: FormGroup;
  cards: Array<Object>;
  @ViewChild('introModal') introModal;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.cards = []
    // this.cards.push({
    //   name: 'Erlich Bachman',
    //   img: '/assets/img/erlich.jpg',
    //   trades: ['mushrooms', 'developer'],
    //   tagline: 'Today\'s user wants access to all their files, from all of their devices, instantly. That\'s why cloud-based is the Holy Grail. But when it comes to audio and video files, they might as well be called Dripbox.',
    //   friends: ['Jin Yang']
    // });
    this.cards.push({
      name: 'Dinesh Chugtai',
      img: '/assets/img/dinesh.jpg',
      trades: ['developer'],
      tagline: 'No, my software\'s fine. It\'s \'cause it\'s running on your s*** hardware.',
      friends: ['Gilfoyle Bertram'],
      place: 'San Francisco, CA'
    });
    this.cards.push({
      name: 'Gilfoyle Bertram',
      img: '/assets/img/gilfoyle.jpg',
      trades: ['developer'],
      tagline: 'But does anyone appreciate that? While you were busy minoring in gender studies and singing a capella at Sarah Lawrence, I was gaining root access to NSA servers. I was one click away from starting a second Iranian revolution. ',
      friends: ['Dinesh Chugtai'],
      place: 'San Francisco, CA'
    });
  }

  ngOnInit() {
    this.initForm();
    this.searchResult = (text: Observable<string>) =>
      text.debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
    // this.open(this.introModal);
  }

  initForm(): void {
    this.form = this.fb.group({
      search: ['', Validators.required]
    });
  }

  onSubmit(values: Object) {
    console.log('search', values);
  }

  open(content) {
    this.modalService.open(content);
  }

}
