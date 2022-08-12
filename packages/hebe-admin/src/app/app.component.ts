import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './api/login.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
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
