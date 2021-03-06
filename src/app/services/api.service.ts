import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Axios from 'axios-observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly baseUrl = "https://openexchangerates.org/api";
  readonly appId = "43376053ed7a4ee3b550ebf0c4f56a08";

  getAllCurrencies(): Observable<any> {
    return Axios.get(`${this.baseUrl}/currencies.json`);
  }

  getRates(start: string, end: string, base: string, symbols: string): Observable<any> {
    return Axios.get(`${this.baseUrl}/time-series.json`, {
      params: { app_id: this.appId, start, end, base, symbols }
    });
  }
}
