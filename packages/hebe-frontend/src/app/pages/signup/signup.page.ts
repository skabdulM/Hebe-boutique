import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';
import { SingUp } from 'src/app/interface/signUp';
import { CustomValidators } from './confirm-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('jwt_token') != null) {
      this.router.navigate(['/account']);
    }
  }
  accountSignup: FormGroup = new FormGroup(
    {
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
      password: new FormControl('', [
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
        Validators.minLength(8),
      ]),

      phone: new FormControl('', [
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
        Validators.minLength(8),
      ]),
    },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
  );

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  
  signUp() {
    const signUpInfo: SingUp = {
      email: this.accountSignup.controls['email'].value,
      password: this.accountSignup.controls['password'].value,
      firstName: this.accountSignup.controls['firstName'].value,
      lastName: this.accountSignup.controls['lastName'].value,
      phone: this.accountSignup.controls['phone'].value,
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
  
  get passwordMatchError() {
    return (
      this.accountSignup.getError('mismatch') &&
      this.accountSignup.get('confirmPassword')?.touched
    );
  }
}
