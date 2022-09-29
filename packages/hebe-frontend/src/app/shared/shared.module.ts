import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from '../directives/hide-header.directive';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ShopPageRoutingModule } from '../pages/shop/shop-routing.module';
import { MenuComponent } from '../components/menu/menu.component';
import { SearchDialogComponent } from '../components/search-dialog/search-dialog.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HideHeaderDirective,
    NavbarComponent,
    MenuComponent,
    SearchDialogComponent,
  ],
  imports: [
    ShopPageRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  exports: [
    HideHeaderDirective,
    NavbarComponent,
    MenuComponent,
    SearchDialogComponent,
  ],
})
export class SharedDirectivesModule {}
