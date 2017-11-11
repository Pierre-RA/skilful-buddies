import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'

import { Contact } from './models';
import * as Buddies from './mock/buddies.json';

const buddies: Array<Contact> = Contact.getContacts(Buddies['contacts']);

@Injectable()
export class SearchService {

  private apiBase = '';

  constructor() { }

  queryContacts(keyword: string): Observable<Array<Contact>> {
    let query: Array<Contact> = [];
    buddies.forEach(buddy => {
      if (buddy.skills.indexOf(keyword.toLowerCase()) != -1) {
        query.push(buddy);
      }
    });
    return Observable.of(query);
  }

  queryConnects(keyword: string): Observable<Array<Contact>> {
    let query: Array<Contact> = [];
    buddies.forEach(buddy => {
      if (buddy.name == keyword) {
        query.push(buddy);
      }
    });
    return Observable.of(query);
  }

  queryTrade(keyword: string): Observable<Array<Contact>> {
    let query: Array<Contact> = [];
    buddies.forEach(buddy => {
      if (buddy.trades.indexOf(keyword.toLowerCase()) != 1) {
        query.push(buddy);
      }
    });
    return Observable.of(query);
  }

}
