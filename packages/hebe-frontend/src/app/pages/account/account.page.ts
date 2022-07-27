import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  constructor(private router: Router, private userService: UserService) {}
  jwt = localStorage.getItem('jwt_token');
  userDetails: any = {};
  ngOnInit() {
    // this.userInfo();
  }

  userInfo() {
    this.userService.getUser().subscribe(
      (data) => {
        this.userDetails = data;
        console.log(this.jwt);
        
      },
      (error: any) => {
        if (error.error.statusCode == 401) {
          localStorage.clear();
          alert('session timeout you will be logged out');
          window.sessionStorage.clear()
        }
        else{

          console.log(error.error);
        }
      }
    );
  }
  ionViewWillEnter() {
    this.userInfo();
  }
  logout() {
    localStorage.clear();
    window.sessionStorage.clear()
    this.router.navigate(['/login']);
  }
}
