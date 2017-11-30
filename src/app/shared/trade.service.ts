import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Trade } from './models';
import { environment } from '../../environments/environment';

@Injectable()
export class TradeService {

  private apiBase: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiBase = environment.apiBase;
  }

  addTrade(trade: Trade): Observable<Trade> {
    return this.http.post<Trade>(this.apiBase + 'trade', trade, {
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

  updateTrade(trade: Trade): Observable<Trade> {
    return this.http.put<Trade>(this.apiBase + 'trade/' + trade['_id'], trade, {
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

  removeTrade(trade: Trade): Observable<Trade> {
    return this.http.delete<Trade>(this.apiBase + 'trade/' + trade['_id'], {
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

}
