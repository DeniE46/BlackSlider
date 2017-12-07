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
  }

load(presentationId:any) { 
  console.log(this.currentPageName + "received from [detail.ts]: " + presentationId);

return new Promise(resolve => {
  this.http.get('http://slidle.com/content/getscenes/' + presentationId + "?flat=true")
    .map(res => res.json())
    .subscribe(data => {
      this.data = data;
      console.log(this.currentPageName + "sending:");
      console.log(data);
      resolve(this.data);
      this.data = [];
    }); 
   
});
}

}
