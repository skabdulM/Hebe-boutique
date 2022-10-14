import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { Auth2Guard } from './Guards/auth2.guard';
import { NosearchQueryGuard } from './Guards/nosearch-query.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account/account.module').then((m) => m.AccountPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'account/login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [Auth2Guard],
  },
  {
    path: 'account/signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
    canActivate: [Auth2Guard],
  },
  {
    path: 'account/orders',
    loadChildren: () =>
      import('./pages/orders/orders.module').then((m) => m.OrdersPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'product/:id',
    loadChildren: () =>
      import('./pages/product/product.module').then((m) => m.ProductPageModule),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./pages/shop/shop.module').then((m) => m.ShopPageModule),
  },
  {
    path: 'shop/:id',
    loadChildren: () =>
      import('./pages/shop/shop.module').then((m) => m.ShopPageModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchPageModule),
    canActivate: [NosearchQueryGuard],
  },
  {
    path: 'aboutus',
    loadChildren: () =>
      import('./pages/aboutus/aboutus.module').then((m) => m.AboutusPageModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./pages/cart/cart.module').then((m) => m.CartPageModule),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
