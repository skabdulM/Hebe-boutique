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

  ngOnInit() {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('id');
    if (categoryName != null) {
      this.getProductsByCategory(categoryName);
    } else {
      console.log('no category Name');
    }
  }
  getProductsByCategory(categoryName: string) {
    this.productService
      .getProductByCategory(categoryName)
      .subscribe((data: any) => {
        if (data.length !== 0) {
          console.log(data);
        } else {
          console.log('empty');
        }
      });
  }
}
