import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/api/product.service';
import { Products } from 'src/app/interface/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }
  
  products: any = [];
  fetchProducts() {
    this.productService.getAllProduct().subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }
}
