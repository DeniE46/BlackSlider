import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PresentationIdProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PresentationIdProvider {

  presentationID:any;
  presentationOwner:any;
  presentationName:any;

  constructor(public http: Http) {
    console.log('Hello PresentationIdProvider Provider');
    this.presentationID = '';
    this.presentationOwner = '';
    this.presentationName = '';
  }

  setPresentationId(id){
    this.presentationID = id;
  }

  getPresentationId(){
    return this.presentationID;
  }

  setPresentationOwner(owner){
    this.presentationOwner = owner;
  }

  getPresentationOwner(){
    return this.presentationOwner ;
  }

  setPresentationName(name){
    this.presentationName = name;
  }
  getPresentationName(){
    return this.presentationName;
  }
}
