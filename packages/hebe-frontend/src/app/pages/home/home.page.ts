import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Products } from 'src/app/interface/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private productService: ProductService) {}

  spinner: boolean;
  products = [];

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService
      .getProducts({ greaterthan: 0, lessthan: 10000, take: 8, views: 'desc' })
      .subscribe((data: any) => {
        // this.products = data;
        data.forEach((product) => {
          this.products.push(
            this.uniqByKeepLast(
              product,
              product.variations,
              (variation) => variation.productSize
            )
          );

          //   product.variations.filter(function(item, pos) {
          //     return  product.variations.indexOf(item) == pos;
          // })
        });
      });
  }

  uniqByKeepLast(product, variation, key) {
    const a: any = [...new Map(variation.map((x) => [key(x), x])).values()];
    a.sort((a, b) => a.productSize - b.productSize);
    product.variations = a;
    return product;
  }

  @HostListener('ionScroll') onScroll() {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.playVideo();
          entry.target.classList.add('show-video');
        } else {
          this.stopVideo();
          entry.target.classList.remove('show-video');
        }
      });
    });
    const hiddenVideo = document.querySelectorAll('.hidden-video');
    hiddenVideo.forEach((el) => videoObserver.observe(el));

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

  playVideo() {
    let video = document.getElementById('video') as HTMLMediaElement;
    video.play();
    video.muted = true;
  }

  stopVideo() {
    let video = document.getElementById('video') as HTMLMediaElement;
    video.pause();
  }
}
