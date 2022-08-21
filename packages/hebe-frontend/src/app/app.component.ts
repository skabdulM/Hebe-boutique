import { Component } from '@angular/core';
import { ProductService } from './api/product.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private productService: ProductService) {}
  categories = [];
  ngOnInit() {
    this.getCategoriesName();
  }

  getCategoriesName() {
    this.productService.getcategorynames().subscribe((data: any) => {
      data.forEach((element) => {
        this.categories.push(element.name);
      });
      this.categories.sort();
    });
  }
}
