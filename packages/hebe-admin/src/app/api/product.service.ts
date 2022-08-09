import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddProduct } from '../interface/addProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000';

  addProduct(data: AddProduct) {
    const jwt = localStorage.getItem('jwt_token');
    const url: string = this.url + '/product/addProduct';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return this.http.post<AddProduct[]>(url, data, {
      headers: headers,
    });
  }
  getAllProduct() {
    return this.http.get(this.url + '/product/getallProducts');
  }

  deleteProduct(id: string) {
    const url: string = this.url + '/product/' + id;
    const jwt = localStorage.getItem('jwt_token');
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return this.http.delete(url, {
      headers: headers,
    });
  }
}
