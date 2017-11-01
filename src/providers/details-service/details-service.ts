import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DetailsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DetailsProvider {

  data:any;
  currentPageName:String;

  constructor(public http: Http) {
    this.currentPageName = "[details-service.ts]";
    console.log('Hello DetailsProvider Provider');
  }

  load(presentationId:any) {
    console.log(this.currentPageName + "received from [detail.ts]: " + presentationId);
  if (this.data) {
    return Promise.resolve(this.data);
  }
  return new Promise(resolve => {
    this.http.get('http://slidle.com/content/getareas/' + presentationId)
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
        console.log(this.currentPageName + "received from URL");
        console.log(this.data);
      });
     
  });
}

}
