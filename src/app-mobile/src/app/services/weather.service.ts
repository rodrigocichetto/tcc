import { Injectable } from '@angular/core';
// import { HTTP } from '@ionic-native/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { CONFIGS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  protected url = `${CONFIGS.BASE_SERVICE}/inpe/cidade/previsao/`;

  constructor(private http: HttpClient) { }

  public getWeatherCity(id: number) {
    // let teste = await this.http.get(`${this.url}`, { params: new HttpParams().set('id', id.toString()) });
    return this.http.get(`${this.url+id}`);
  }
}