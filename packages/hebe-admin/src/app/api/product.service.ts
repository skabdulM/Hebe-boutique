import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Serverurl } from './url';
import { AddProduct } from '../interface/addProduct';
import { AddTag } from '../interface/addTag';
import { UpdateProduct } from '../interface/updateProduct';

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

  addProductTag(data: AddTag) {
    const jwt = localStorage.getItem('jwt_token');
    const url: string = Serverurl + '/product/addProductTag';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return this.http.patch<AddProduct[]>(url, data, {
      headers: headers,
    });
  }

  removeTag(data: AddTag) {
    const jwt = localStorage.getItem('jwt_token');
    const url: string = Serverurl + '/product/removeTag';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return this.http.patch<AddProduct[]>(url, data, {
      headers: headers,
    });
  }

  getAllProduct() {
    return this.http.get(Serverurl + '/product/getallProducts');
  }

  getProductById(id: string) {
    return this.http.get(Serverurl + '/product/' + id);
  }

  updateProduct(id: string, data: UpdateProduct) {
    const jwt = localStorage.getItem('jwt_token');
    const url: string = Serverurl + '/product/updateProduct/' + id;
    let headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + jwt
    );
    return this.http.patch(url, data, { headers: headers });
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
