import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../interface/product';
import { Serverurl } from './url';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProduct() {
    return this.http.get<Products[]>(Serverurl + '/product/getallProducts');
  }
}
