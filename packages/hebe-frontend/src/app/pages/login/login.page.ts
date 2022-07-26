import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';
import { SignIn } from 'src/app/interface/signIn';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('jwt_token') != null) {
      this.router.navigate(['/account']);
    }
  }
  accountLogin: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    ]),
    password: new FormControl('', [
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      ),
    ]),
  });

  signIn() {
    const signIn: SignIn = {
      email: this.accountLogin.controls['email'].value,
      password: this.accountLogin.controls['password'].value,
    };
    this.userService.signIn(signIn).subscribe(
      (data: any) => {
        localStorage.setItem('jwt_token', data.access_token);
        this.userService.getUser();
        this.router.navigate(['/account']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
