import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Serverurl } from './url';
import { AddProduct } from '../interface/addProduct';
import { AddTag } from '../interface/addTag';
import { UpdateProduct } from '../interface/updateProduct';
import { AddCategory } from '../interface/addCategory';

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

  addProductCategory(data: AddCategory) {
    const jwt = localStorage.getItem('jwt_token');
    const url: string = Serverurl + '/product/addProductCategory';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return this.http.patch<AddProduct[]>(url, data, {
      headers: headers,
    });
  }

  removeCategory(data: AddCategory) {
    const jwt = localStorage.getItem('jwt_token');
    const url: string = Serverurl + '/product/removeCategory';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return this.http.patch<AddProduct[]>(url, data, {
      headers: headers,
    });
  }

  getProducts(
    greaterthan: number,
    lessthan: number,
    take: number,
    cursor?: string
  ) {
    let params = new HttpParams();
    params = params.append('greaterthan', greaterthan);
    params = params.append('lessthan', lessthan);
    params = params.append('take', take);
    if (cursor) {
      params = params.append('cursor', cursor);
    }
    const url = Serverurl + '/product/getproducts';
    return this.http.get(url, {
      params: params,
    });
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
