import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SignIn } from 'src/app/interface/signIn';
import { LoginService } from '../../api/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertController: AlertController
  ) {}

  showLoader: boolean;
  userDetails: any = {};
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  accountLogin: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
      Validators.email,
      Validators.minLength(9),
    ]),
    password: new FormControl('', [
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      ),
      Validators.minLength(8),
    ]),
  });

  ngOnInit() {}

  ionViewWillEnter() {
    if (localStorage.getItem('jwt_token') != null) {
      // this.userInfo();
    }
  }

  signIn() {
    this.showProgressBar();
    const signIn: SignIn = {
      email: this.accountLogin.controls['email'].value,
      password: this.accountLogin.controls['password'].value,
    };
    this.loginService.signIn(signIn).subscribe(
      (data: any) => {
        localStorage.setItem('jwt_token', data.access_token);
        this.userInfo();
      },
      (error) => {
        this.presentAlert(error.error.message);
      }
    );
  }

  userInfo() {
    this.loginService.getUser().subscribe(
      (data) => {
        this.userDetails = data;
        if (
          this.userDetails.roles == 'ADMIN' ||
          this.userDetails.roles == 'MANAGER'
        ) {
          this.router.navigate(['/home']);
        } else {
          this.presentAlert('Unauthorized');
          this.logout();
        }
      },
      (error: any) => {
        if (error.error.statusCode == 401) {
          this.logout();
        } else {
          console.log(error.error);
        }
      }
    );
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.hideProgressBar();
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss().then(() => {
      this.hideProgressBar();
    });
  }

  showProgressBar() {
    this.showLoader = true;
  }

  hideProgressBar() {
    this.showLoader = false;
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  // location.reload();
}
