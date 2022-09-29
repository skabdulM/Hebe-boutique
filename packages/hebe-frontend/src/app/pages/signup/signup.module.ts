import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { SharedDirectivesModule } from 'src/app/shared/shared.module';
import { SearchPage } from '../search/search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedDirectivesModule,
  ],
  declarations: [SignupPage],
  providers: [UserService, SearchPage],
})
export class SignupPageModule {}
