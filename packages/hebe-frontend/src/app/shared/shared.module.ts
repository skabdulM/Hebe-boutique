import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from '../directives/hide-header.directive';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ShopPageRoutingModule } from '../pages/shop/shop-routing.module';

@NgModule({
  declarations: [HideHeaderDirective, NavbarComponent],
  imports: [ShopPageRoutingModule, CommonModule, IonicModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  exports: [HideHeaderDirective, NavbarComponent],
})
export class SharedDirectivesModule {}
