import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from './guards/authorization.guard';

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
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./pages/orders/orders.module').then((m) => m.OrdersPageModule),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'addproduct',
    loadChildren: () =>
      import('./pages/addproduct/addproduct.module').then(
        (m) => m.AddproductPageModule
      ),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'product/:id',
    loadChildren: () =>
      import('./pages/product/product.module').then((m) => m.ProductPageModule),
    canActivate: [AuthorizationGuard],
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
