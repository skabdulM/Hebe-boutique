import { Component } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private productService: ProductService) {}
  public categories = [];
  public brands = [];
  ngOnInit() {
    this.getCategoriesName();
    this.getbrandnames();
  }

  getCategoriesName() {
    this.productService.getcategorynames().subscribe((data: any) => {
      data.forEach((element) => {
        this.categories.push(element.name);
      });
      this.categories.sort();
    });
  }

  getbrandnames() {
    this.productService.getbrandnames().subscribe((data: any) => {
      data.forEach((element) => {
        this.brands.push(element.name);
      });
      this.brands.sort();
    });
  }
}
