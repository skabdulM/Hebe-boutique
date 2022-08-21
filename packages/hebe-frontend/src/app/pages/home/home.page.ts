import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/api/product.service';
import { Products } from 'src/app/interface/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private productService: ProductService) {}
  @Input() title: string;
  dropdown = false;
 
  @ViewChild('productbtn', { read: ElementRef })productbtn: ElementRef;
 
  ngOnInit() {
    // this.fetchProducts();
  }
  
  products: any = [];
  fetchProducts() {
    this.productService.getcategorynames().subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }
  hideDropdown(event) {
    const xTouch = event.clientX;
    const yTouch = event.clientY;
    
    const rect = this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top+2;
    const leftBoundary = rect.left+2;
    const rightBoundary = rect.right-2;
 
    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {      
      this.dropdown = false;
    }
  }
}
