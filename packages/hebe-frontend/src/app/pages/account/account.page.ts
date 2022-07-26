import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
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
    private storage: StorageService,
    private alertController: AlertController
  ) {}

  showLoader: boolean;
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

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userInfo();

  }
  // async isLoggedIn() {
  //   let token: any;
  //   this.storage
  //     .getItem('jwt_token')
  //     .then((data) => {
  //       if (data == null) {
  //         this.router.navigateByUrl('/account/login');
  //       } else {
  //         // this.userInfo();
  //         token = data;
  //         const payload = atob(token.split('.')[1]);
  //         const parsedPayload = JSON.parse(payload);
  //         console.log(parsedPayload);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //  await this.storage
  //     .getItem('jwt_token')
  //     .then((data) => token = data)
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log(token);

  //   // const token = localStorage.getItem('token'); // get token from local storage
  //   // decode payload of token
  //   // convert payload into an Object

  //   // return parsedPayload.exp > Date.now() / 1000; // check if token is expired
  // }
  updateUser() {
    this.showProgressBar();
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

  async userInfo() {
    this.showProgressBar();
    (await this.userService.getUser()).subscribe(
      (data: any) => {
        this.account.setValue({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          address: data.address,
        });
        this.account.markAsPristine();
        this.hideProgressBar();
      },
      (error: any) => {
        this.presentAlert('Session expired');
        console.log(error);
      }
    )
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: msg,
      buttons: ['OK'],
    });
    await alert.present();
    await alert.onDidDismiss().then(() => {
      this.logout();
      this.hideProgressBar();
    });
  }

  showProgressBar() {
    this.showLoader = true;
  }

  hideProgressBar() {
    this.showLoader = false;
  }

  logout() {
    this.storage.clear();
    this.router.navigate(['/account/login']);
  }
}
