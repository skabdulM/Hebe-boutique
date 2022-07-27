import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SingUp } from '../interface/signUp';
import { SignIn } from '../interface/signIn';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000';

  signUp(data: SingUp) {
    const url: string = this.url + '/auth/signup';
    return this.http.post<SingUp[]>(url, {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }

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
    return this.http.get(url, { headers: headers })
  }
}
