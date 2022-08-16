import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/api/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}
  categories = [];
  products = [];
  totalresults: number;
  hidden: boolean = true;
  ngOnInit() {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('id');
    if (categoryName != null) {
      this.getProductsByCategory(categoryName);
    } else {
      this.fetchProducts();
    }
    this.getCategoriesName();
  }
  getProductsByCategory(categoryName: string) {
    this.productService
      .getProductByCategory(categoryName)
      .subscribe((data: any) => {
        if (data.length !== 0) {
          this.products = data[0].products;
          console.log(this.products);

          this.totalresults = this.products.length;
        } else {
          console.log('empty');
          this.hidden = false;
          document.getElementById('product').innerHTML =
            'No product available in this category';
        }
      });
  }

  fetchProducts() {
    this.productService.getAllProduct().subscribe((data: any) => {
      this.products = data;
      this.totalresults = this.products.length;
    });
  }

  getCategoriesName() {
    this.productService.getAllCategory().subscribe((data: any) => {
      this.categories = data;
    });
  }
  temp(temp) {
    console.log(temp);
  }
}
