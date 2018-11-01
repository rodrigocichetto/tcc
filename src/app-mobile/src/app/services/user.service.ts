import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { User } from '../interfaces/user';
import { UserOptions } from '../interfaces/user-options';
import { CONFIGS } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected url = `${CONFIGS.BASE_SERVICE}/user/`;
  private token: string = '';

  constructor(private http: HttpClient) { }

  public register(user: User) {
    return this.http.post(`${this.url}new`, user);
  }

  public login(user: UserOptions) {
    return this.http.post(`${this.url}login`, user);
  }

  public getMe() {
    return this.http.get(`${this.url}me`, {
      headers: new HttpHeaders({
        Authorization: `jwt ${this.token}`
      })
    });
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getToken(): string {
    return this.token;
  }
}
