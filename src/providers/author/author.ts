import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthorProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthorProvider {
  currentPageName:any;
  data:any;
  getFlat:String;

  constructor(public http: Http) {
    console.log('Hello AuthorProvider Provider');
    this.currentPageName = "AuthorProvider.ts";
    this.getFlat = "?flat=true";
    
  }

  load(workspaceId:any) { 
    console.log(this.currentPageName + "received from [detail.ts]: " + workspaceId);
  
  return new Promise(resolve => {
    this.http.get('http://slidle.com/content/getpages/' + workspaceId + this.getFlat)
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        console.log(this.currentPageName + " sending:");
        console.log(data);
        resolve(this.data);
        this.data = [];
      }); 
     
  });
  }

}
