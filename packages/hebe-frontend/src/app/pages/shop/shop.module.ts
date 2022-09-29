import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopPageRoutingModule } from './shop-routing.module';

import { ShopPage } from './shop.page';
import { SharedDirectivesModule } from 'src/app/shared/shared.module';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ProductService } from 'src/app/services/product.service';
import { SearchPage } from '../search/search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopPageRoutingModule,
    SharedDirectivesModule,
  ],
  declarations: [ShopPage],
  providers: [ProductService, SearchPage],
})
export class ShopPageModule {}
