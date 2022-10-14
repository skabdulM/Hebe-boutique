import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { SearchPage } from 'src/app/pages/search/search.page';
import { CartDailogComponent } from '../cart-dailog/cart-dailog.component';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class NavbarComponent implements OnInit {
  constructor(
    private appComponent?: AppComponent,
    private modalCtrl?: ModalController
  ) {}

  categories = this.appComponent.categories;
  brands = this.appComponent.brands;
  toRotate: any;
  el: any;
  loopNum: number;
  period: number;
  txt: string;
  isDeleting: boolean;

  ngOnInit() {
    const elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        this.TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    // var css = document.createElement("style");
    // css.type = "text/css";
    // css.innerHTML = ".typewrite > .wrap { }";
    // document.body.appendChild(css);
  }

  TxtType(el: Element, toRotate: any, period: any | null) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  }
  // TxtType.prototype: any.
  tick = () => {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
    var that = this;
    var delta = 500 - Math.random() * 100;
    if (this.isDeleting) {
      delta /= 2;
    }
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 1000;
    }
    setTimeout(function () {
      that.tick();
    }, delta);
  };

  public async openModal() {
    const modal = await this.modalCtrl.create({
      component: SearchDialogComponent,
    });
    modal.present();
  }

  public async openCart(initBreackPoint: number) {
    const modal = await this.modalCtrl.create({
      component: CartDailogComponent,
      cssClass: 'my-modal',
      backdropDismiss: true,
      initialBreakpoint: initBreackPoint,
      breakpoints: [0.25, 0.5, 0.75, 1],
    });
    modal.present();
  }
}
