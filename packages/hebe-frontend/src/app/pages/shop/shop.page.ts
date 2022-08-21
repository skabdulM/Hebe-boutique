import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/api/product.service';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  cursor: string;
  filter: string;
  sort: string;
  totalresults: number = 0;
  count: number = 0;
  min: number = 300;
  max: number = 10000;
  take = 12;
  hidden: boolean = true;
  spinner: boolean;
  categories = [];
  products = [];

  ngOnInit() {
    this.spinner = true;
    const categoryName = this.activatedRoute.snapshot.paramMap.get('id');
    if (categoryName != null) {
      this.search(categoryName);
    } else {
      this.fetchProducts();
    }
    this.getCategoriesName();
  }

  loadData(event) {
    setTimeout(() => {
      this.loadMoreresults();
      event.target.complete();
    }, 500);
  }

  loadMoreresults() {
    if (this.filter) {
      this.productService
        .searchproduct(this.filter, this.min, this.max, this.take, this.cursor)
        .subscribe((data: any) => {
          if (data.length !== 0) {
            data.forEach((element) => {
              this.products.push(element);
            });
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
    } else {
      this.productService
        .getProducts(this.min, this.max, this.take, this.cursor)
        .subscribe((data: any) => {
          data.forEach((element) => {
            this.products.push(element);
          });
          let lastProduct = this.products[this.products.length - 1];
          this.cursor = lastProduct.id;
          this.totalresults = this.products.length;
        });
    }
  }

  range(event?: any) {
    this.min = event.detail.value.lower;
    this.max = event.detail.value.upper;
  }

  localSort(event?: any) {
    this.sort = event.detail.value;
    if (this.sort == 'asc') {
      this.products.sort((a, b) => a.productPrice - b.productPrice);
    } else if (this.sort == 'desc') {
      this.products.sort((a, b) => b.productPrice - a.productPrice);
    } else if (this.sort == 'latest') {
      this.products.sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
    }
  }

  fetchProducts() {
    this.productService
      .getProducts(this.min, this.max, this.take)
      .subscribe(async (data: any) => {
        let lastProduct = data[data.length - 1];
        this.products = data;
        this.cursor = lastProduct.id;
        this.totalresults = this.products.length;
        this.spinner = false;
      });
    this.getCount();
  }

  getCategoriesName() {
    this.productService.getcategorynames().subscribe((data: any) => {
      data.forEach((element) => {
        this.categories.push(element.name);
      });
      this.categories.sort();
    });
  }

  getCount(query?: string) {
    if (query) {
      this.productService
        .getcount(query, this.min, this.max)
        .subscribe((data: any) => {
          this.count = data;
        });
    } else {
      let temp: string;
      this.productService
        .getcount(temp, this.min, this.max)
        .subscribe((data: any) => {
          this.count = data;
        });
    }
  }

  search(query?: string) {
    this.spinner = true;
    if (query) {
      this.productService
        .searchproduct(query, this.min, this.max, this.take)
        .subscribe((data: any) => {
          this.filter = query;
          this.products = data;
          this.hidden = true;
          if (this.products != null) {
            this.totalresults = this.products.length;
            if (this.totalresults != 0) {
              let lastProduct = data[data.length - 1];
              this.cursor = lastProduct.id;
            } else {
              this.hidden = false;
            }
          } else {
            this.totalresults = 0;
            this.hidden = false;
          }
          this.spinner = false;
        });
      this.getCount(query);
    } else {
      this.filter = null;
      this.fetchProducts();
    }
  }
}
