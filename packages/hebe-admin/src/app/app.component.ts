import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './api/login.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  jwt = localStorage.getItem('jwt_token');
  userDetails: any = {};
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.userInfo();
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
          this.logout();
        }
      },
      (error: any) => {
        if (error.error.statusCode == 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        } else {
        }
        
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
