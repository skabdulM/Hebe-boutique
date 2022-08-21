import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/api/product.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private productService: ProductService) {}
  // @Input() title: string;
  // dropdown = false;

  // @ViewChild('productbtn', { read: ElementRef })productbtn: ElementRef;
  categories = [];
  ngOnInit() {
    this.getCategoriesName();
  }

  getCategoriesName() {
    this.productService.getcategorynames().subscribe((data: any) => {
      data.forEach(element => {
        this.categories.push(element.name)
      });
      this.categories.sort()
    });
  }
  // hideDropdown(event) {
  //   const xTouch = event.clientX;
  //   const yTouch = event.clientY;

  //   const rect = this.productbtn.nativeElement.getBoundingClientRect();
  //   const topBoundary = rect.top+2;
  //   const leftBoundary = rect.left+2;
  //   const rightBoundary = rect.right-2;

  //   if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
  //     this.dropdown = false;
  //   }
  // }
}
