import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { element } from 'protractor';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-dailog',
  templateUrl: './cart-dailog.component.html',
  styleUrls: ['./cart-dailog.component.scss'],
})
export class CartDailogComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private modalController: ModalController
  ) {}
  public products = [];

  ngOnInit() {
    this.getCartProducts();
  }

  async getCartProducts() {
    (await this.cartService.getCartProducts()).subscribe((data: any) => {
      this.products = [];
      data.forEach((data) => {
        this.products.push(this.arrangeProduct(data));
      });
    });
  }

  arrangeProduct(data) {
    const product = {
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      cartProductId: data.id,
      productQuantity: data.productQuantity,
      variationId: data.product[0].id,
      productColor: data.product[0].productColor,
      productSize: data.product[0].productSize,
      productId: data.product[0].Products.id,
      productName: data.product[0].Products.productName,
      productPrice: data.product[0].Products.productPrice,
      productDiscount: data.product[0].Products.productDiscount,
      productImg: data.product[0].Products.productImg.toString().split(','),
    };
    return product;
  }

  async changeProductQuantity(cartProductId: number, data) {
    const updateCartProduct = {
      id: cartProductId,
      productQuantity: data.detail.value,
    };
    (await this.cartService.updateCartProduct(updateCartProduct)).subscribe(
      (data: any) => {
        const productIndex: number = this.products.findIndex(
          (element) => element.cartProductId == data.id
        );
        this.products[productIndex].productQuantity = data.productQuantity;
      }
    );
  }

  async removeCartProduct(cartProductId: number) {
    const removeCartProduct = {
      id: cartProductId,
    };
    (await this.cartService.removeCartProduct(removeCartProduct)).subscribe(
      (data: any) => {
        const productIndex: number = this.products.findIndex(
          (element) => element.cartProductId == cartProductId
        );
        this.products.splice(productIndex, 1);
      }
    );
  }

  getTotal(): number {
    return this.products.reduce(
      (i: number, j: any) =>
        i +
        (j.productPrice - (j.productPrice * j.productDiscount) / 100) *
          j.productQuantity,
      0
    );
  }

  close() {
    this.modalController.dismiss();
  }
}
