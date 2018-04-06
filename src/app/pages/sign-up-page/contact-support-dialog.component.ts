import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './contact-support-dialog.component.html'
})
export class ContactSupportDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ContactSupportDialogComponent>) {}

  ngOnInit() {
  }

}
