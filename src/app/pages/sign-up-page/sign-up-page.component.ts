import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerAnimation} from '../../utils/page.animation';
import {ApiService} from './../../services/api.service';
import {MatDialog} from '@angular/material/dialog'
import {AuthService} from '../../services/auth.service'

import {SigningUpDialogComponent} from './signing-up-dialog.component'
import {AccountExistDialogComponent} from './account-exist-dialog.component'
import {ContactSupportDialogComponent} from './contact-support-dialog.component'
import {PasswordExpireDialogComponent} from './password-expire-dialog.component'
import {SignInDialogComponent} from './sign-in-dialog.component'
import {ErrorDialogComponent} from './error-dialog.component'
import {email} from 'ng2-validation/dist/email';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
  animations: [routerAnimation],
  providers: [AuthService]
})
export class SignUpPageComponent implements OnInit {
  form = {
    firstName: 'Kim',
    lastName: 'Berly',
    emailWithoutDomain: 'dt.raheel',
    email: 'dt.raheel@gmail.com',
    domain: 'gmail.com',
    company: 'Developtech',
    type: 'seller'
  }
  errors = {
    general: '',
    emailError: ''
  }
  // Add router animation
  @HostBinding('@routerAnimation') routerAnimation = true;

  constructor(private router: Router, private authService: AuthService, private api: ApiService, public dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.authService.validateAuthUrl(window.location.href)) {
      // const messageBox = this.dialog.open(ErrorDialogComponent, {
      //   data: {
      //     title: 'Please wait',
      //     message: 'Signing In',
      //     animation: true
      //   }
      // });
      var email = window.localStorage.getItem('email');
      var link = window.location.href;
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      this.authService.signInWithEmailLink(email, link)
        .then(response => {
          this.authService.getIdToken()
            .then(token=>{
              this.api.attachUid({idToken: token})
                .subscribe(response=>{
                  console.log(response);
                  this.router.navigate(['main/dashboard']);
                  // messageBox.close();
                });
            })
        }).catch(error => {
        console.error(error)
      })
    }
  }

  /**
   * Sign up method
   * @param login
   * @param password
   */
  signUpFormSubmit() {
    console.log('how you doin');
  }

  signUp(form) {
    form.email = `${form.emailWithoutDomain}@${form.domain}`
    this.errors.general = '';
    console.log(form);
    const signingUpDialog = this.dialog.open(SigningUpDialogComponent, {
      disableClose: true,
    });
    this.api.register(form)
      .subscribe(data => {
        console.log(data);
        if (data.data === 'alreadyExist') {
          signingUpDialog.close();
          const accountExistDialog = this.dialog.open(AccountExistDialogComponent);
        } else if (data.data === 'contactSupport') {
          signingUpDialog.close();
          const contactSupportDialog = this.dialog.open(ContactSupportDialogComponent);
        } else if (data.data === 'sendPassword') {
          signingUpDialog.close();
          const passwordExpireDialog = this.dialog.open(PasswordExpireDialogComponent);
        } else if (data.data === 'goSignIn') {
          signingUpDialog.close();
          const signInDialog = this.dialog.open(SignInDialogComponent, {
            data: {
              email: form.email,
              password: form.password
            }
          });
        } else if (data.data.error) {
          signingUpDialog.close();
          const errorDialog = this.dialog.open(ErrorDialogComponent, {
            data: {
              title: 'Error',
              message: data.data.message
            }
          });
        } else if (data.status === 'FAIL') {
          signingUpDialog.close();
          const errorDialog = this.dialog.open(ErrorDialogComponent, {
            data: {
              title: data.message,
              message: data.data
            }
          });
        } else {
          signingUpDialog.close();
          this.router.navigate(['main/dashboard']);
        }
      }, error => {
        error._body = JSON.parse(error._body);
        console.log(error._body.data);
        this.errors.general = error._body.data;
        console.log(error._body)
      })
  }

  emailKeyDown(event) {
    if (event.key === '@') return event.preventDefault();
    console.log(event.key)
  };

  authenticateUsingGmail = (form) => {
    form.email = `${form.emailWithoutDomain}@${form.domain}`
    this.authService.signInWithGoogle(this.form.email)
      .then(response => {
        console.log(response);
        this.authService.getIdToken()
          .then(token => {
            form.idToken = token;
            this.signUp(form);
          });
        // this.router.navigate(['main/dashboard'])
      }).catch((err) => {
      const errorDialog = this.dialog.open(ErrorDialogComponent, {
        data: {
          title: 'Provider Error',
          message: err
        }
      })
    });
  }


  authenticateUsingFacebook = (form) => {
    form.email = `${form.emailWithoutDomain}@${form.domain}`;
    this.authService.signInWithFacebook()
      .then(response => {
        console.log(response)
        this.authService.getIdToken()
          .then(token => {
            form.idToken = token;
            this.signUp(form);
          });
      }).catch((err) => {
      const errorDialog = this.dialog.open(ErrorDialogComponent, {
        data: {
          title: 'Provider Error',
          message: err
        }
      })
    });
  };
  authenticateUsingTwitter = (form) => {
    form.email = `${form.emailWithoutDomain}@${form.domain}`;
    this.authService.signInWithTwitter()
      .then(response => {
        console.log(response)
        this.authService.getIdToken()
          .then(token => {
            form.idToken = token;
            this.signUp(form);
          });
      }).catch((err) => {
      const errorDialog = this.dialog.open(ErrorDialogComponent, {
        data: {
          title: 'Provider Error',
          message: err
        }
      })
    });
  };
  passwordLessSignUp = form => {
    form.email = `${form.emailWithoutDomain}@${form.domain}`;
    const signingUpDialog = this.dialog.open(SigningUpDialogComponent, {
      disableClose: true,
    });
    this.api.passwordLessRegister(form)
      .subscribe(data => {
        signingUpDialog.close();
        if (data.status === 'FAIL') {
          const errorDialog = this.dialog.open(ErrorDialogComponent, {
            data: {
              title: data.message,
              message: data.data
            }
          });
        } else {
          this.authService.passwordLessSignUp(form.email)
            .then(response=>{})
          // this.router.navigate(['main/dashboard']);
        }
      })
    // this.authService.passwordLessSignUp(form.email)
    //   .then()
  }
}
