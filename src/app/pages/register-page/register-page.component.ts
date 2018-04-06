import {Component, OnInit} from '@angular/core';
import {ApiService} from './../../services/api.service'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  newUser = {
    firstName: '',
    lastName: '',
    email: '',
    mobilePhone: '',
    website: '',
    leadSourceSpecificC: 'Webform Contact Us',
    contactType: '',
    recordTypeId: '01228000000SbEwAAK',
    status: 'Interest',
    description: '',
    password: '',
  }

  constructor(private api: ApiService) {
  }

  ngOnInit() {
  }

  register = form => {
    console.log(form);
    this.api.register(form)
      .subscribe(data => {
        console.log(data);
      })
  }
}
