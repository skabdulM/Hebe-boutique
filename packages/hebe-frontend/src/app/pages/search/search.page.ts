import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
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
  filter: string;
  searchQuery: string;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params && params.search) {
        this.search(params.search);
      }
    });
  }

  search(query?: string) {
    if (query) {
      this.searchQuery = query;
      this.productService
        .searchproduct(query, this.min, this.max, this.take)
        .subscribe((data: any) => {
          this.products = data;
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
          // this.spinner = false;
        });
      this.getCount(query);
    } else {
      this.filter = null;
    }
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

  loadMoreresults() {
    if (this.filter) {
      this.productService
        .searchproduct(this.filter, this.min, this.max, this.take, this.cursor)
        .subscribe((data: any) => {
          if (data.length !== 0) {
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
  }
}
