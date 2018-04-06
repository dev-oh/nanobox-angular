import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerAnimation} from '../../utils/page.animation';

import {AuthService} from '../../services/auth.service'

import '../../../assets/js/main.js'
declare var System: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [routerAnimation],
  providers: [AuthService]
})
export class LoginPageComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };
  // Add router animation
  @HostBinding('@routerAnimation') routerAnimation = true;

  constructor(private authService: AuthService, private router: Router) {
    System.import('../../../assets/js/main.js')
      .then(js=>{
        js.animate();
      })
  }
  loginWithGoogle() {
    this.authService.signInWithGoogle(null)
      .then(response => {
        console.log(response)
        this.router.navigate(['main/dashboard'])
      }).catch((err) => console.log('error: ' + err));
  }

  loginWithFacebook() {
    this.authService.signInWithFacebook()
      .then(response => {
        console.log(response)
        this.router.navigate(['main/dashboard'])
      }).catch((err) => console.log('error: ' + err));
  }

  loginWithTwitter() {
    this.authService.signInWithTwitter()
      .then(response => {
        console.log(response)
        this.router.navigate(['main/dashboard'])
      }).catch((err) => console.log('error: ' + err));
  }

  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password)
      .then(response => {
        console.log(response);
        this.router.navigate(['main/dashboard'])
      }).catch((err) => console.log('error: ' + err));
  }

  ngOnInit() {
  }

  /**
   * Login method
   * @param login
   * @param password
   */
  login(login, password) {
    this.router.navigateByUrl('/main');
  }
}
