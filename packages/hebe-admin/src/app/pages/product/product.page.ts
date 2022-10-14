import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonButton, IonicSafeString } from '@ionic/angular';
import { ProductService } from 'src/app/api/product.service';
import { AddCategory } from 'src/app/interface/addCategory';
import { AddTag } from 'src/app/interface/addTag';
import { AddVariation } from 'src/app/interface/addvariation';
import { UpdateProduct } from 'src/app/interface/updateProduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private alertController: AlertController
  ) {}

  productForm: FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    productDescription: new FormControl('', [Validators.required]),
    productPrice: new FormControl('', [Validators.pattern('[0-9]{2,4}')]),
    productDiscount: new FormControl('', [
      Validators.pattern('[0-9]{1,3}'),
      Validators.max(99),
    ]),
    productImage: new FormControl('', [Validators.required]),
    productBrand: new FormControl(''),
  });
  tagForm: FormGroup = new FormGroup({
    productTag: new FormControl('', [Validators.required]),
  });
  categoryForm: FormGroup = new FormGroup({
    productCategory: new FormControl('', [Validators.required]),
  });
  variation: FormGroup = new FormGroup({
    productSize: new FormControl(''),
    productColor: new FormControl(''),
    productQuantity: new FormControl('', [Validators.pattern('[0-9]{1,8}')]),
  });
  productId: string;
  tags = [];
  categories = [];
  variations = [];
  addcategory = false;
  addtag = false;
  add_variation = false;

  ngOnInit() {
    this.fetchProduct(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  fetchProduct(id: string) {
    this.productId = id;
    this.productService.getProductById(id).subscribe(
      (data: any) => {
        this.productForm.setValue({
          productName: data.productName,
          productDescription: data.productDescription,
          productPrice: data.productPrice,
          productDiscount: data.productDiscount ? data.productDiscount : null,
          productImage: data.productImg,
          productBrand: data.brand ? data.brand.name : null,
        });
        this.tags = data.tags;
        this.categories = data.category;
        this.variations = data.variations;
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
        this.addtag = false;
        this.tagForm.reset();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  addVariation(productId: string) {
    const variation: AddVariation = {
      productId,
      productSize: this.variation.controls['productSize'].value
        ? this.variation.controls['productSize'].value
        : null,
      productColor: this.variation.controls['productColor'].value
        ? this.variation.controls['productColor'].value
        : null,
      productQuantity: this.variation.controls['productQuantity'].value,
    };
    this.productService.addProductVariation(variation).subscribe(
      () => this.fetchProduct(this.productId),
      (error: any) => {
        console.log(error);
      }
    );
  }
  removeTag(tagName: string, productId: string) {
    const tag: AddTag = {
      tagName: tagName,
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

  addCategory(productId: string) {
    const category: AddCategory = {
      name: this.categoryForm.controls['productCategory'].value,
      productId: productId,
    };
    this.productService.addProductCategory(category).subscribe(
      (data: any) => {
        this.categories = data.category;
        this.addcategory = false;
        this.categoryForm.reset();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  removeCategory(name: string, productId: string) {
    const tag: AddCategory = {
      name: name,
      productId: productId,
    };
    this.productService.removeCategory(tag).subscribe(
      (data: any) => {
        this.categories = data.category;
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
      productDiscount: this.productForm.controls['productDiscount'].value
        ? this.productForm.controls['productDiscount'].value
        : null,
      productPrice: parseInt(this.productForm.controls['productPrice'].value),
      productImg: this.productForm.controls['productImage'].value,
    };
    this.productService.updateProduct(productId, updateProduct).subscribe(
      () => this.fetchProduct(this.productId),
      (error) => {
        console.log(error);
      }
    );
  }

  async changed(size, color, productQuantity) {
    const alert = await this.alertController.create({
      animated: true,
      backdropDismiss: false,
      header: 'Product Variation',
      inputs: [
        {
          value: size,
          disabled: true,
        },
        {
          name: 'color',
          value: color,
          label: 'Product Color',
          placeholder: 'Product Color',
          attributes: {
            maxlength: 8,
          },
        },
        {
          name: 'quantity',
          value: productQuantity,
          label: 'product Quantity',
          type: 'number',
          placeholder: 'product quantity',
          min: 1,
        },
      ],
      buttons: [
        {
          text: 'update',
          handler: (alertData) => {
            if (alertData.color.length >= 3) {
            } else {
            }
            if (alertData.quantity >= 1) {
            } else {
            }
            // console.log(alertData.quantity);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }
}
