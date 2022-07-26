import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000';

  getAllProduct() {
    return this.http.get<Products[]>(this.url + '/product/getallProducts');
  }
}
