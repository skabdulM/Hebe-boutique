import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/api/storage.service';
import { UserService } from 'src/app/api/user.service';
import { UpdateUser } from 'src/app/interface/updateUser';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private storage: StorageService
  ) {}
  account: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      Validators.minLength(4),
    ]),
    lastName: new FormControl('', [
      Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      Validators.minLength(4),
    ]),
    email: new FormControl('', [
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
      Validators.email,
      Validators.minLength(9),
    ]),
    phone: new FormControl('', [
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    address: new FormControl(''),
  });

  ngOnInit() {}

  ionViewWillEnter() {
    this.userInfo();
  }

  updateUser() {
    const updateUser: UpdateUser = {
      email: this.account.controls['email'].value,
      firstName: this.account.controls['firstName'].value,
      lastName: this.account.controls['lastName'].value,
      phone: this.account.controls['phone'].value,
      address: this.account.controls['address'].value,
    };
    this.userService.updateUser(updateUser).subscribe(
      () => this.userInfo(),
      (error) => {
        console.log(error);
      }
    );
  }

  userInfo() {
    this.userService.getUser().subscribe(
      (data: any) => {
        this.account.setValue({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          address: data.address,
        });
        this.account.markAsPristine();
      },
      (error: any) => {
        if (error.error.statusCode == 401) {
          this.storage.clear();
          this.router.navigate(['/account/login']);
        } else {
          console.log(error.error);
        }
      }
    );
  }

  logout() {
    this.storage.clear();
    this.router.navigate(['/account/login']);
  }
}
