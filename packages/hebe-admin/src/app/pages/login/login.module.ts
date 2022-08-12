import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginPageRoutingModule } from './login-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from './login.page';
import { LoginService } from '../../api/login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPage],
  providers:[LoginService]
})
export class LoginPageModule {}
