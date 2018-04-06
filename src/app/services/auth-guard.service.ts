import {Injectable} from '@angular/core';
import {AuthService} from './auth.service'
import {Router, CanActivate} from '@angular/router'

@Injectable()
export class AuthGuardService {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActive() {
    if (this.authService.isLoggedIn()) {
      return true
    }
    this.router.navigate(['/']);
    return false;
  }
}
