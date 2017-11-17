import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { User } from './models';

@Injectable()
export class UsersService {

  apiBase: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiBase = environment.apiBase;
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.apiBase + 'users');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.apiBase + 'users/' + id);
  }

}
