import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ProductPageRoutingModule } from './product-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ProductPage } from './product.page';
import { ProductService } from 'src/app/api/product.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [ProductPage],
  providers: [ProductService],
})
export class ProductPageModule {}
