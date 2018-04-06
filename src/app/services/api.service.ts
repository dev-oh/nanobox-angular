import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http'

// export const server = 'http://localhost:1337';
export const server = 'http://wineo-nodejs.nanoapp.io';
// export const client = 'http://localhost:4200'
export const client = 'http://wineoh-angular.nanoapp.io'

@Injectable()
export class ApiService {

  constructor(private http: Http) {
  }

  register = user => {
    return this.http.post(`${server}/auth/register`, user)
      .map((response: Response) => response.json());
  }
  passwordLessRegister = user => {
    return this.http.post(`${server}/auth/passwordLessRegister`, user)
      .map((response: Response) => response.json());
  }
  attachUid = data=>{
    console.log("calling Attach")
    console.log(data)
    return this.http.post(`${server}/auth/attachUid`, data)
      .map((response: Response) =>{
        console.log(response)
        return response.json()
      });
  }
}
