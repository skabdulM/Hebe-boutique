import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private appComponent: AppComponent
  ) {}

  cursor: string;
  filter: string;
  sort: string;
  totalresults: number = 0;
  count: number = 0;
  min: number = 300;
  max: number = 10000;
  take = 6;
  hidden: boolean = true;
  spinner: boolean;
  categories = this.appComponent.categories;
  brands = this.appComponent.brands;
  products = [];

  ngOnInit() {
    this.spinner = true;
    const searchQuery = this.activatedRoute.snapshot.paramMap.get('id');
    if (searchQuery != null) {
      this.search(searchQuery);
    } else {
      this.fetchProducts();
    }
  }

  loadData(event) {
    setTimeout(() => {
      this.loadMoreresults();
      event.target.complete();
    }, 500);
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
        .getProducts({greaterthan: this.min,lessthan: this.max,take: this.take,cursor:this.cursor})
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
    if (event) {
      this.sort = event.detail.value;
    }
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
      .getProducts( {greaterthan: this.min,lessthan: this.max,take: this.take})
      .subscribe(async (data: any) => {
        this.hidden = true;
        this.products = data;
        console.log(this.products);
        if (this.products != null) {
          this.totalresults = this.products.length;
          if (this.totalresults != 0) {
            let lastProduct = data[data.length - 1];
            this.cursor = lastProduct.id;
            this.localSort();
          } else {
            this.hidden = false;
          }
        }
        // if any error then use this else block
        // else {
        //     this.totalresults = 0;
        //     this.hidden = false;
        //   }
        this.spinner = false;
      });
    this.getCount();
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
          console.log(this.products);
          this.hidden = true;
          if (this.products != null) {
            this.totalresults = this.products.length;
            if (this.totalresults != 0) {
              let lastProduct = data[data.length - 1];
              this.cursor = lastProduct.id;
              this.localSort();
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
