import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './password-expire-dialog.component.html'
})
export class PasswordExpireDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PasswordExpireDialogComponent>) {}

  ngOnInit() {
  }

}
