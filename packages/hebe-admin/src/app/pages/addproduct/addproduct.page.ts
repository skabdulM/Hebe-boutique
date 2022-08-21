import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/api/product.service';
import { AddProduct } from 'src/app/interface/addProduct';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {
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

  // fetchProducts() {
  //   this.productService.getAllProduct().subscribe((data) => {
  //     this.products = data;
  //     console.log(data);
  //   });
  // }
  fetchProducts() {
    this.productService
      .getProducts(0, 10000,1000)
      .subscribe((data: any) => {
        // let lastProduct = data[data.length - 1];
        this.products = data;
        // this.cursor = lastProduct.id;
        // this.totalresults = this.products.length;
      });
    // this.getCount();
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(() => this.fetchProducts());
  }
}
