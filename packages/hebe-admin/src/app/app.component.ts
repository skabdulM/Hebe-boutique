import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './api/login.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private loginService: LoginService) {}
  jwt = localStorage.getItem('jwt_token');
  userDetails: any = {};

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
        if (error) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
