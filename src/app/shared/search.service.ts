import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'

import { Contact } from './models';

const erlich: Contact = {
  name: 'Erlich Bachman',
    img: '/assets/img/erlich.jpg',
    trades: ['mushrooms', 'developer'],
    tagline: 'Today\'s user wants access to all their files, from all of their devices, instantly. That\'s why cloud-based is the Holy Grail. But when it comes to audio and video files, they might as well be called Dripbox.',
    friends: ['Jin Yang'],
    place: 'San Francisco, CA'
};
const dinesh: Contact = {
  name: 'Dinesh Chugtai',
  img: '/assets/img/dinesh.jpg',
  trades: ['developer'],
  tagline: 'No, my software\'s fine. It\'s \'cause it\'s running on your s*** hardware.',
  friends: ['Gilfoyle Bertram'],
  place: 'San Francisco, CA'
};
const gilfoyle: Contact = {
  name: 'Gilfoyle Bertram',
  img: '/assets/img/gilfoyle.jpg',
  trades: ['developer'],
  tagline: 'But does anyone appreciate that? While you were busy minoring in gender studies and singing a capella at Sarah Lawrence, I was gaining root access to NSA servers. I was one click away from starting a second Iranian revolution. ',
  friends: ['Dinesh Chugtai'],
  place: 'San Francisco, CA'
};
const bighead: Contact = {
  name: 'Nelson \'Big Head\' Bighetti',
  img: '/assets/img/big_head.jpg',
  trades: ['developer'],
  tagline: '',
  friends: ['Richard Hendricks'],
  place: 'San Francisco, CA'
};

const developers: Array<Contact> = [dinesh, gilfoyle, bighead];

@Injectable()
export class SearchService {

  private apiBase = '';

  constructor() { }

  queryContacts(keywords: string): Observable<Array<Contact>> {
    return Observable.of(developers);
  }

}
