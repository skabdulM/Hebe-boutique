import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SingUp } from '../interface/signUp';
import { SignIn } from '../interface/signIn';
import { UpdateUser } from '../interface/updateUser';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  jwt_token: string = '';
  jwt = this.storage
    .getItem('jwt_token')
    .then((data) => {
      this.jwt_token = data;
    })
    .catch((error: any) => {
      console.log(error);
    });
  // url = 'http://localhost:3000';
  url = 'https://hebe-app-backend.herokuapp.com';

  signUp(data: SingUp) {
    const url: string = this.url + '/auth/signup';
    return this.http.post<SingUp[]>(url, {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
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
    const url: string = this.url + '/users/me';
    let headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.jwt_token
    );
    return this.http.get(url, { headers: headers });
  }

  updateUser(data: UpdateUser) {
    const url: string = this.url + '/users/editUser';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' +  this.jwt_token);
    return this.http.patch(url, data, { headers: headers });
  }
}
