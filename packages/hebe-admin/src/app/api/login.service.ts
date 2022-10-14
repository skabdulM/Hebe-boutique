import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Serverurl } from './url';
import { SignIn } from '../interface/signIn';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  signIn(data: SignIn) {
    const url: string = Serverurl + '/auth/signin';
    return this.http.post<SignIn[]>(url, {
      email: data.email,
      password: data.password,
    });
  }

  getUser() {
    const jwt = localStorage.getItem('jwt_token');
    const url: string = Serverurl + '/users/me';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return this.http.get(url, { headers: headers });
  }

  async isLoggedIn() {
    let token: string;
    token = localStorage.getItem('jwt_token');
    if (!token) {
      return false;
    }
    const payload = atob(token.split('.')[1]);
    const parsedPayload = JSON.parse(payload);
    if (parsedPayload.exp > Date.now() / 1000) {
      return true;
    }
    // const token = localStorage.getItem('token'); // get token from local storage
    // decode payload of token
    // convert payload into an Object

    // return parsedPayload.exp > Date.now() / 1000; // check if token is expired
  }
}
