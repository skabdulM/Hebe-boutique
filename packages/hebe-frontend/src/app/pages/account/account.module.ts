import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AccountPageRoutingModule } from './account-routing.module';
import { AccountPage } from './account.page';
import { UserService } from 'src/app/api/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [AccountPage],
  providers: [UserService],
})
export class AccountPageModule {}
