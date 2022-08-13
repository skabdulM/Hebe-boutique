import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/api/product.service';
import { AddTag } from 'src/app/interface/addTag';
import { UpdateProduct } from 'src/app/interface/updateProduct';

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

  productForm: FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    productDescription: new FormControl('', [Validators.required]),
    productPrice: new FormControl('', [Validators.pattern('[0-9]{2,4}')]),
    productImage: new FormControl('', [Validators.required]),
    productCategory: new FormControl('', [Validators.required]),
    productBrand: new FormControl('', [Validators.required]),
  });
  tagForm: FormGroup = new FormGroup({
    productTag: new FormControl('', [Validators.required]),
  });
  productId: string;
  tags = [];

  ngOnInit() {
    this.fetchProduct(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  fetchProduct(id: string) {
    this.productService.getProductById(id).subscribe(
      (data: any) => {
        this.productForm.setValue({
          productName: data.productName,
          productDescription: data.productDescription,
          productPrice: data.productPrice,
          productImage: data.productImg,
          productCategory: data.category[0].name,
          productBrand: data.brand.name,
        });
        this.tags = data.tags;
        this.productForm.markAsPristine();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  addTag(productId: string) {
    const tag: AddTag = {
      tagName: this.tagForm.controls['productTag'].value,
      productId: productId,
    };
    this.productService.addProductTag(tag).subscribe(
      (data: any) => {
        this.tags = data.tags;
        this.tagForm.reset();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  removeTag(tagName: string, productId: string) {
    const tag: AddTag = {
      tagName:tagName,
      productId: productId,
    };
    this.productService.removeTag(tag).subscribe(
      (data: any) => {
        this.tags = data.tags;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateProduct(productId: string) {
    const updateProduct: UpdateProduct = {
      productName: this.productForm.controls['productName'].value,
      productDescription: this.productForm.controls['productDescription'].value,
      productPrice: parseInt(this.productForm.controls['productPrice'].value),
      productImg: this.productForm.controls['productImage'].value,
      category: this.productForm.controls['productCategory'].value,
      brand: this.productForm.controls['productBrand'].value,
    };
    this.productService.updateProduct(productId, updateProduct).subscribe(
      () => this.fetchProduct(this.productId),
      (error) => {
        console.log(error);
      }
    );
  }
}
