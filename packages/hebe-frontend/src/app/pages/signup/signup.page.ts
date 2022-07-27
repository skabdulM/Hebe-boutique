import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';
import { SingUp } from 'src/app/interface/signUp';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('jwt_token') != null) {
      this.router.navigate(['/account']);
    }
  }
  accountSignup: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
    lastName: new FormControl('', [Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
    email: new FormControl('', [
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    ]),
    password: new FormControl('', [
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      ),
    ]),
    phone: new FormControl('', [
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
  });

  signUp() {
    const signUpInfo: SingUp = {
      email: this.accountSignup.controls['email'].value,
      password: this.accountSignup.controls['password'].value,
      firstName: this.accountSignup.controls['firstName'].value,
      lastName: this.accountSignup.controls['lastName'].value,
    };
    this.userService.signUp(signUpInfo).subscribe(
      (data: any) => {
        localStorage.setItem('jwt_token', data.access_token);
        this.router.navigate(['/account']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
