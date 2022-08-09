import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/api/user.service';
import { SignIn } from 'src/app/interface/signIn';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController
  ) {}

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

  ngOnInit() {
    if (localStorage.getItem('jwt_token') != null) {
      this.router.navigate(['/account']);
    }
  }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  signIn() {
    const signIn: SignIn = {
      email: this.accountLogin.controls['email'].value,
      password: this.accountLogin.controls['password'].value,
    };
    this.userService.signIn(signIn).subscribe(
      (data: any) => {
        localStorage.setItem('jwt_token', data.access_token);
        this.router.navigate(['/account']);
      },
      (error) => {
        this.presentAlert(error.error.message);
      }
    );
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
