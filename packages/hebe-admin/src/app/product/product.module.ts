import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductPageRoutingModule } from './product-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ProductPage } from './product.page';
import { ProductService } from '../api/product.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [ProductPage],
  providers:[ProductService]
})
export class ProductPageModule {}
