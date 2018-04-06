import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-example',
  templateUrl: './sign-in-dialog.component.html',
  providers: [AuthService]
})
export class SignInDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignInDialogComponent> ,@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private router: Router, public dialog : MatDialog) {}

  ngOnInit() {
  }
  signInWithEmail() {
    this.authService.signInRegular(this.data.email, this.data.password)
      .then(response => {
        console.log(response);
        this.dialogRef.close();
        this.router.navigate(['main/dashboard'])
      }).catch((err) => console.log('error: ' + err));
  }
  gotoLogin(){
    this.dialogRef.close();
    this.router.navigate(['/'])
  }

}
