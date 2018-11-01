import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { UserService } from './user.service';
import { Irrigation } from '../interfaces/irrigation';
import { CONFIGS } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class IrrigationService {

  private irrigationSelected: Irrigation;
  protected url = `${CONFIGS.BASE_SERVICE}/irrigacao/`;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  public create(irrigation: Irrigation) {
    return this.http.post(`${this.url}new`, irrigation, {
      headers: new HttpHeaders({
        Authorization: `jwt ${this.userService.getToken()}`
      })
    });
  }

  public update(irrigation: Irrigation) {
    return this.http.put(`${this.url}update`, irrigation, {
      headers: new HttpHeaders({
        Authorization: `jwt ${this.userService.getToken()}`
      })
    });
  }

  public getAll() {
    return this.http.get(`${this.url}all`, {
      headers: new HttpHeaders({
        Authorization: `jwt ${this.userService.getToken()}`
      })
    });
  }

  public getSelected(): Irrigation {
    return this.irrigationSelected;
  }

  public setSelected(irrigation: Irrigation) {
    this.irrigationSelected = irrigation;
  }
}
