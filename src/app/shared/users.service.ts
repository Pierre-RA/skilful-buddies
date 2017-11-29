import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';

import { environment } from '../../environments/environment';
import { User, PartialFriendList } from './models';

@Injectable()
export class UsersService {

  apiBase: string;
  owner: Observable<User>;

  constructor(
    private http: HttpClient
  ) {
    this.apiBase = environment.apiBase;
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.apiBase + 'users');
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.apiBase + 'users/' + id);
  }

  getUserFriends(id: string, like: string): Observable<PartialFriendList> {
    let params = null;
    if (like) {
      params = new HttpParams().set('name', like);
    }
    return this.http.get<PartialFriendList>(this.apiBase + 'users/friends/' + id, { params: params });
  }

  updateUser(id: string, update: Object): Observable<User> {
    return this.http.put<User>(this.apiBase + 'users/' + id, update);
  }

  updateAddress(id: string, address: string): Observable<User> {
    return this.http.put<User>(this.apiBase + 'users/geocode/' + id, {
      address: address
    });
  }

  getOwner(): Observable<User> {
    if (!this.owner) {
      let id = window.localStorage.getItem('profile_id');
      this.owner = this.http.get<User>(this.apiBase + 'users/' + id);
      // TODO: add publishReplay(1)
    }
    return this.owner;
  }

}
