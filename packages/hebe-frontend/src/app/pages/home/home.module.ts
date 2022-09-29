import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomePage } from './home.page';
import { ProductService } from 'src/app/services/product.service';
import { SharedDirectivesModule } from 'src/app/shared/shared.module';
import { SearchPage } from '../search/search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    SharedDirectivesModule,
  ],
  declarations: [HomePage],
  providers: [ProductService, SearchPage],
})
export class HomePageModule {}
