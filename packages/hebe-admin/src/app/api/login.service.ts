import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Serverurl } from './url';
import { SignIn } from '../interface/signIn';
@Injectable({
  providedIn: 'root'
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
    console.log(jwt);
    const url: string = Serverurl + '/users/me';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return this.http.get(url, { headers: headers });
  }
}
