import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  url = 'https://hebe-app-backend.herokuapp.com';

  getAllProduct() {
    return this.http.get<Products[]>(this.url + '/product/getallProducts');
  }
}
