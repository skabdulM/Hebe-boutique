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

  product:any = {};
  ngOnInit() {
    this.fetchProducts(this.activatedRoute.snapshot.paramMap.get('id'));
  }
  fetchProducts(id: string) {
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
    });
  }
}
