import {Injectable} from '@angular/core';
import {Router} from '@angular/router'

import {AngularFireAuth} from 'angularfire2/auth'
import * as firebase from 'firebase';
import {Observable} from 'rxjs/observable'
import {client} from './api.service'

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      user => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    )
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this._firebaseAuth.auth.currentUser.getIdToken()
          .then(token=>{
            console.log(token)
          })
        // if (user.emailVerified) {
        //   console.log('Email is verified');
        // } else {
        //   console.log('Email is not verified');
        //   user.sendEmailVerification();
        // }
      }
    })
  }

  signInWithGoogle(email) {
    var provider = new firebase.auth.GoogleAuthProvider();
    if (email) {
      provider.setCustomParameters({'login_hint': email});
    }
    // return this._firebaseAuth.auth.signInWithPopup(
    //   new firebase.auth.GoogleAuthProvider()
    // )
    return this._firebaseAuth.auth.signInWithPopup(provider)

  }

  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this._firebaseAuth.auth.signInAndRetrieveDataWithCredential(credential);
    // return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
  }
  passwordLessSignUp(email){
    var actionCodeSettings = {
      url: client+'/sign-up',
      handleCodeInApp: true
    }
    console.log(email)
    return this._firebaseAuth.auth.sendSignInLinkToEmail(email,actionCodeSettings);
  };
  validateAuthUrl = (url)=>{
    if(this._firebaseAuth.auth.isSignInWithEmailLink(window.location.href)) return true;
    else return false;
  }
  signInWithEmailLink = (email,link)=>{
    return this._firebaseAuth.auth.signInWithEmailLink(email,link);
  }

  isLoggedIn() {
    if (this.userDetails) return true;
    return false
  }

  getIdToken = ()=>{
    return this._firebaseAuth.auth.currentUser.getIdToken();
  };
  logout() {
    this._firebaseAuth.auth.signOut()
      .then(res => {
        this.router.navigate(['/'])
      })
  }

}
