import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/api/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  product: any = {};
  brand: string;
  ngOnInit() {
    this.fetchProduct(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  fetchProduct(id: string) {
    this.productService.getProductById(id).subscribe(
      (data: any) => {
        this.product = data;
        this.brand = data.brand.name;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
