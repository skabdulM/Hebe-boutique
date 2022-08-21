import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Products } from '../interface/product';
import { Serverurl } from './url';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

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

  searchproduct(
    searchQuery: string,
    greaterthan: number,
    lessthan: number,
    take: number,
    cursor?: string
  ) {
    let params = new HttpParams();
    params = params.append('searchQuery', searchQuery);
    params = params.append('greaterthan', greaterthan);
    params = params.append('lessthan', lessthan);
    params = params.append('take', take);
    if (cursor) {
      params = params.append('cursor', cursor);
    }
    const url = Serverurl + '/product/search';
    return this.http.get(url, {
      params: params,
    });
  }

  filterPrice(greaterthan: number, lessthan: number) {
    const url =
      Serverurl +
      '/product/getproducts/sortprice/' +
      greaterthan +
      '/' +
      lessthan;
    return this.http.get(url);
  }

  getProductById(id: string) {
    return this.http.get(Serverurl + '/product/' + id);
  }

  getcount(searchQuery: string, greaterthan: number, lessthan: number) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('searchQuery', searchQuery);
    }
    params = params.append('greaterthan', greaterthan);
    params = params.append('lessthan', lessthan);

    console.log(params);

    const url = Serverurl + '/product/getproducts/count';
    return this.http.get(url, {
      params: params,
    });
  }

  getcategorynames() {
    return this.http.get(Serverurl + '/product/category');
  }
}
