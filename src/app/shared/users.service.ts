import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';
import { User, PartialFriendList } from './models';

@Injectable()
export class UsersService {

  apiBase: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiBase = environment.apiBase;
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.apiBase + 'users', {
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

  getUser(id: string): Observable<User> {
    if (id) {
      return this.http.get<User>(this.apiBase + 'users/' + id, {
        headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
      });
    } else {
      return Observable.of(null);
    }
  }

  getUserFriends(id: string, like: string): Observable<PartialFriendList> {
    let params = null;
    if (like) {
      params = new HttpParams().set('name', like);
    }
    return this.http.get<PartialFriendList>(this.apiBase + 'users/friends/' + id, {
      params: params,
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

  updateUser(id: string, update: Object): Observable<User> {
    return this.http.put<User>(this.apiBase + 'users/' + id, update, {
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

  updateAddress(id: string, address: string): Observable<User> {
    return this.http.put<User>(this.apiBase + 'users/geocode/' + id, {
      address: address
    }, {
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

}
