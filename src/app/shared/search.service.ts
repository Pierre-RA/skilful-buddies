import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'

import { Contact } from './models';
import * as Buddies from './mock/buddies.json';

const developers: Array<Contact> = Contact.getContacts(Buddies['contacts']);

@Injectable()
export class SearchService {

  private apiBase = '';

  constructor() { }

  queryContacts(keywords: string): Observable<Array<Contact>> {
    return Observable.of(developers);
  }

}
