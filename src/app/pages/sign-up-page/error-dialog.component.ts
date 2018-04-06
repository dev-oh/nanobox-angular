import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-example',
  templateUrl: './error-dialog.component.html',
  providers: [AuthService]
})
export class ErrorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent> ,@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private router: Router, public dialog : MatDialog) {}

  ngOnInit() {
  }
}
