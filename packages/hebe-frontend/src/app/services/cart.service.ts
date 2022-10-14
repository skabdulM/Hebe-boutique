import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddTocart } from '../interface/addTocart';
import { StorageService } from './storage.service';
import { Serverurl } from './url';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  async addToCart(data: AddTocart) {
    let jwt_token;
    await this.storage
      .getItem('jwt_token')
      .then((data) => {
        jwt_token = data;
      })
      .catch((error: any) => {
        console.log(error);
      });
    const url: string = Serverurl + '/cart/addtoCart';
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + jwt_token
    );
    return this.http.post<AddTocart[]>(url, data, {
      headers: headers,
    });
  }
}
