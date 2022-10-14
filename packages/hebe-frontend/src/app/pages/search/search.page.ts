import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private productService: ProductService
  ) {}
  products = [];
  min: number = 300;
  max: number = 10000;
  totalresults: number = 0;
  cursor: string;
  count: number = 0;
  take = 6;
  hidden: boolean = true;
  searchQuery: string;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params && params.search) {
        this.search(params.search);
      } else {
        this.route.navigateByUrl('/home');
      }
    });
  }

  search(query?: string) {
    this.searchQuery = query;
    this.productService
      .searchproduct(query, this.min, this.max, this.take)
      .subscribe((data: any) => {
        data.forEach((product) => {
          product.productImg = product.productImg.toString().split(',');
        });
        this.products = data;
        // this.products.forEach((product) => {
        //   product.productImg = product.productImg.toString().split(',');
        // });
        this.hidden = true;
        if (this.products != null) {
          this.totalresults = this.products.length;
          if (this.totalresults != 0) {
            let lastProduct = data[data.length - 1];
            this.cursor = lastProduct.id;
            // this.localSort();
          } else {
            this.hidden = false;
          }
        } else {
          this.totalresults = 0;
          this.hidden = false;
        }
      });
    this.getCount(query);
  }

  getCount(query?: string) {
    this.productService
      .getcount(query, this.min, this.max)
      .subscribe((data: any) => {
        this.count = data;
      });
  }

  loadMoreresults() {
    this.productService
      .searchproduct(
        this.searchQuery,
        this.min,
        this.max,
        this.take,
        this.cursor
      )
      .subscribe((data: any) => {
        if (data.length !== 0) {
          data.forEach((product) => {
            product.productImg = product.productImg.toString().split(',');
          });
          this.products = this.products.concat(data);
          let lastProduct = data[data.length - 1];
          this.cursor = lastProduct.id;
          this.totalresults = this.products.length;
          this.hidden = true;
          if (this.totalresults == 0) {
            this.hidden = false;
          }
        } else if (this.totalresults == 0) {
          this.hidden = false;
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
