import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    if (localStorage.getItem('jwt_token') == null) {
      this.router.navigate(['/login']);
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
