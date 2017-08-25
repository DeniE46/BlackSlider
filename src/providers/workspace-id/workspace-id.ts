import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WorkspaceIdProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WorkspaceIdProvider {

  workspaceId:any;

  constructor(public http: Http) {
    console.log('Hello WorkspaceIdProvider Provider');
    this.workspaceId = "workspaceId";
  }

  setWorkspaceId(workspaceId){
    this.workspaceId = workspaceId;
  }

  getWorkspaceId(){
    return this.workspaceId;
  }
}
