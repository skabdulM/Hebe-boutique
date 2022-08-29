import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/api/product.service';
import { Products } from 'src/app/interface/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private productService: ProductService) {}
  spinner: boolean;
  products: any = [];

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService
      .getProducts({ greaterthan: 0, lessthan: 10000, take: 8, views: 'desc' })
      .subscribe((data) => {
        this.products = data;
        console.log(data);
      });
  }
}
