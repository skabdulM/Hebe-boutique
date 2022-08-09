import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignIn } from '../interface/signIn';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // url = 'https://hebe-app-backend.herokuapp.com';
  url = 'http://localhost:3000';



  signIn(data: SignIn) {
    const url: string = this.url + '/auth/signin';
    return this.http.post<SignIn[]>(url, {
      email: data.email,
      password: data.password,
    });
  }

  getUser() {
    const jwt = localStorage.getItem('jwt_token');
    const url: string = this.url + '/users/me';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return this.http.get(url, { headers: headers });
  }
}
