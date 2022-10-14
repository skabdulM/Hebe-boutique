import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../api/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.loginService.isLoggedIn().then(async (boolean) => {
      if (!boolean) {
        this.router.navigate(['/login']);
        return false;
      }
      console.log(localStorage.getItem('jwt_token'));

      let role: String;
      const response: any = await this.loginService.getUser().toPromise();
      role = response.roles;
      if (role == 'ADMIN' || role == 'MANAGER') {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}
