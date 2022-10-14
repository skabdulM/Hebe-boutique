import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  constructor() {}

  ngOnInit() {}

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
