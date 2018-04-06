import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './signing-up-dialog.component.html'
})
export class SigningUpDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SigningUpDialogComponent>) {}

  ngOnInit() {
  }

}
