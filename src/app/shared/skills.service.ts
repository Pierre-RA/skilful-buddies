import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Skill } from './models';
import { environment } from '../../environments/environment';

@Injectable()
export class SkillsService {

  private apiBase: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiBase = environment.apiBase;
  }

  addSkill(skill: Skill): Observable<Skill> {
    console.log(skill);
    return this.http.post<Skill>(this.apiBase + 'skills', skill, {
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

  updateSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(this.apiBase + 'skills/' + skill['_id'], skill, {
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

  removeSkill(skill: Skill): Observable<Skill> {
    return this.http.delete<Skill>(this.apiBase + 'skills/' + skill['_id'], {
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

}
