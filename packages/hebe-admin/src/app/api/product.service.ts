import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Serverurl } from './url';
import { AddProduct } from '../interface/addProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  addProduct(data: AddProduct) {
    const jwt = localStorage.getItem('jwt_token');
    const url: string = Serverurl + '/product/addProduct';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return this.http.post<AddProduct[]>(url, data, {
      headers: headers,
    });
  }
  getAllProduct() {
    return this.http.get(Serverurl + '/product/getallProducts');
  }
  getProductById(id: string) {
    return this.http.get(Serverurl + '/product/'+id);
  }

  deleteProduct(id: string) {
    const url: string = Serverurl + '/product/' + id;
    const jwt = localStorage.getItem('jwt_token');
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return this.http.delete(url, {
      headers: headers,
    });
  }
}
