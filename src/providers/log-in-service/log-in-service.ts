import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LogInServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LogInServiceProvider {

  constructor(public http: Http) {
    console.log('Hello LogInServiceProvider Provider');
  }

    logIn(){
        return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            }, 3000);
        });

    }

}
