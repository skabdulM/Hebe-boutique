import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonSlides } from '@ionic/angular';
import { element } from 'protractor';
import { AddTocart } from 'src/app/interface/addTocart';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private cartService: CartService,
    private userService: UserService,
    private alertController: AlertController
  ) {}

  product: any = {};
  brand: string;
  sizeHidden: boolean = true;
  userLoginstatus: boolean;
  colors = [];
  variations = [];
  imgs = [];
  slideIndex = 1;
  segment: string = 'description';
  description: any;
  colorHidden: boolean = true;
  seletedColor: string;

  ngOnInit() {
    this.fetchProduct(this.activatedRoute.snapshot.paramMap.get('id'));
    this.onScroll();
  }

  ionViewDidEnter() {
    this.checkUser().then((status) => (this.userLoginstatus = status));
    this.checkQuantity();
  }

  fetchProduct(id: string) {
    this.productService.getProductById(id).subscribe(
      (data: any) => {
        this.product = data;
        this.variations = this.uniqByKeepLast(
          data.variations,
          (variation) => variation.productSize
        );
        if (this.variations[0].productSize == null) {
          if (this.variations[0].productColor != null) {
            this.colors = this.product.variations;
            this.colors.sort((a, b) => {
              if (a.productColor < b.productColor) {
                return -1;
              }
              if (a.productColor > b.productColor) {
                return 1;
              }
              return 0;
            });
            setTimeout(() => {
              this.autoSelectColor();
            }, 50);
          }
        }
        if (this.product.variations[0].productSize) {
          this.sizeHidden = false;
        } else if (this.product.variations[0].productColor) {
          this.colorHidden = false;
        }
        if (data.brand) {
          this.brand = data.brand.name;
        }
        this.imgs = data.productImg.toString().split(',');
        this.showSlides(this.slideIndex);
        this.description = this.sanitizer.bypassSecurityTrustHtml(
          this.product.productDescription
        );
      },
      (error: any) => {
        console.log(error);
        this.presentAlert('website is down we are working on it');
      }
    );
  }

  autoSelectSize(channelNumber, temp?) {
    let listItems = document.getElementById('items').getElementsByTagName('li');
    var length = listItems.length;
    for (var i = 0; i < length; i++) {
      if (i == channelNumber) {
        if (this.checkquantityReturn(temp)) {
          if (document.getElementsByClassName('selected').length < 1) {
            listItems[i].className = i == channelNumber ? 'selected' : '';
            this.colors = temp;
            if (this.colors[0].productColor != null) {
              this.colorHidden = false;
              this.colors.sort((a, b) => {
                if (a.productColor < b.productColor) {
                  return -1;
                }
                if (a.productColor > b.productColor) {
                  return 1;
                }
                return 0;
              });
              setTimeout(() => {
                this.autoSelectColor();
              }, 50);
            } else {
              this.colorHidden = true;
            }
          }
        }
      }
    }
  }

  selectSize(channelNumber) {
    let listItems = document.getElementById('items').getElementsByTagName('li');
    var length = listItems.length;
    for (var i = 0; i < length; i++) {
      if (i + 1 == channelNumber) {
        const temp = Array.from(document.getElementsByClassName('selected'));
        temp.forEach((element) => {
          element.classList.remove('selected');
        });
        listItems[i].className = i + 1 == channelNumber ? 'selected' : '';
        this.colors = [];
        this.product.variations.forEach((element) => {
          if (element.productSize == listItems[i].innerText) {
            this.colors.push(element);
          }
        });
        if (this.colors[0].productColor != null) {
          this.colorHidden = false;
          this.colors.sort((a, b) => {
            if (a.productColor < b.productColor) {
              return -1;
            }
            if (a.productColor > b.productColor) {
              return 1;
            }
            return 0;
          });
          setTimeout(() => {
            this.autoSelectColor();
          }, 50);
        } else {
          this.colorHidden = true;
        }
      }
    }
  }

  autoSelectColor() {
    let radio_button: any = document
      .getElementById('radios')
      .getElementsByTagName('ion-radio');
    const select = this.colors.find((element) => element.productQuantity > 0)
      ? this.colors.find((element) => element.productQuantity > 0)
      : 'white';
    for (let index = 0; index < radio_button.length; index++) {
      const element = radio_button[index];
      element.style = '--color:' + element.value.trim();
      element.style = '--color-checked:' + element.value.trim();
      element.style.background = element.value.trim();
    }
    this.seletedColor = select.productColor;
  }

  changeColor(event) {
    this.seletedColor = event.detail.value;
  }

  checkQuantity() {
    setTimeout(() => {
      let listItems = document
        .getElementById('items')
        .getElementsByTagName('li');
      var length = listItems.length;
      for (let i = 0; i < length; i++) {
        let temp = [];
        this.product.variations.forEach((element) => {
          if (element.productSize == listItems[i].innerText) {
            temp.push(element);
          }
        });
        if (!this.checkquantityReturn(temp)) {
          listItems[i].className = 'disabled';
        }
        this.autoSelectSize(i, temp);
      }
    }, 300);
  }

  checkquantityReturn(variation: any) {
    return variation.some((element) => {
      if (element.productQuantity > 0) {
        return true;
      } else {
        return false;
      }
    });
  }

  uniqByKeepLast(variation, key) {
    const a: any = [...new Map(variation.map((x) => [key(x), x])).values()];
    a.sort((a, b) => {
      if (a.productSize < b.productSize) {
        return -1;
      }
      if (a.productSize > b.productSize) {
        return 1;
      }
      return 0;
    });
    return a;
  }

  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n) {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n) {
    let i;
    let slides: any = document.getElementsByClassName('mySlides');
    let dots: any = document.getElementsByClassName('dot');
    setTimeout(() => {
      if (n > slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
      }
      slides[this.slideIndex - 1].style.display = 'block';
      dots[this.slideIndex - 1].className += ' active';
    }, 100);
  }

  async addToCart() {
    const size =
      document.getElementsByClassName('selected').length > 0
        ? document.getElementsByClassName('selected')[0].innerHTML.trim()
        : null;
    const color = this.seletedColor ? this.seletedColor.trim() : null;
    const product = this.product.variations.find(
      (element: any) =>
        element.productSize == size && element.productColor == color
    );
    const cartProduct: AddTocart = {
      id: product.id,
      productQuantity: 1,
    };
    if (this.userLoginstatus) {
      (await this.cartService.addToCart(cartProduct)).subscribe(
        (data) => {
          this.presentAlert('Added Successfully');
        },
        (error) => this.presentAlert(error.error.message)
      );
    } else {
      this.presentAlert('Login to add to cart');
    }
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: msg,
      cssClass: 'alertHeader',
      buttons: ['OK'],
    });

    await alert.present();
  }

  checkUser() {
    return this.userService.isLoggedIn().then((boolean) => {
      if (!boolean) {
        return false;
      } else {
        return true;
      }
    });
  }

  @HostListener('ionScroll') onScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-text');
        } else {
          entry.target.classList.remove('show-text');
        }
      });
    });
    const hidden = document.querySelectorAll('.hidden-text');
    hidden.forEach((el) => observer.observe(el));

    const listObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-list');
        } else {
          entry.target.classList.remove('show-list');
        }
      });
    });
    const hiddenList = document.querySelectorAll('.hidden-list');
    hiddenList.forEach((el) => listObserver.observe(el));
  }
}
