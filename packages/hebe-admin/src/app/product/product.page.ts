import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../api/product.service';
import { AddProduct } from '../interface/addProduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  constructor(private productService: ProductService) {}

  products: any = [];
  addProductForm: FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    productDescription: new FormControl('', [Validators.required]),
    productPrice: new FormControl('', [Validators.pattern('[0-9]{2,4}')]),
    productImage: new FormControl('', [Validators.required]),
    productCategory: new FormControl('', [Validators.required]),
    productBrand: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.fetchProducts();
  }

  addProduct() {
    const product: AddProduct = {
      productName: this.addProductForm.controls['productName'].value,
      productDescription:
        this.addProductForm.controls['productDescription'].value,
      productPrice: this.addProductForm.controls['productPrice'].value,
      productImg: this.addProductForm.controls['productImage'].value,
      category: this.addProductForm.controls['productCategory'].value,
      brand: this.addProductForm.controls['productBrand'].value,
    };
    this.productService.addProduct(product).subscribe(
      () => this.fetchProducts(),
      (error) => {
        console.log(error);
      }
    );
  }

  fetchProducts() {
    this.productService.getAllProduct().subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(() => this.fetchProducts());
  }
}
