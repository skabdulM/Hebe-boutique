import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AccountPageRoutingModule } from './account-routing.module';
import { AccountPage } from './account.page';
import { UserService } from 'src/app/services/user.service';
import { SharedDirectivesModule } from 'src/app/shared/shared.module';
import { SearchPage } from '../search/search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedDirectivesModule,
  ],
  declarations: [AccountPage],
  providers: [UserService, SearchPage],
})
export class AccountPageModule {}
