import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the SearchProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SearchProvider {

private presentations:any;
private data:any;

  constructor(public http: Http) {
    console.log('Hello SearchProvider Provider');
/*
    this.presentations=[
		{id: 1, title:'Workfaces', thumbnail:'img/presentation/p1.png', author:'Rossen Zhivkov', slides:'11'},
		{id: 2, title:'Sharepoint strategy', thumbnail:'img/sharepoint.png', author:'Rossen Zhivkov', slides:'3'},
		{id: 5, title:'Montana', thumbnail:'img/montana.png', author:'Rossen Zhivkov', slides:'21'},
		{id: 3, title:'SlideSeeds', thumbnail:'img/slideseeds.png', author:'Danina Ilinska', slides:'9'},
		{id: 4, title:'HR Suite', thumbnail:'img/hrsuite.png', author:'Rossen Zhivkov', slides:'7'},
		{id: 5, title:'Ideaz.pro', thumbnail:'img/ideazpro.png', author:'Denislav Popov', slides:'10'},
		{id: 6, title:'Idea Incepting', thumbnail:'img/incepting.png', author:'Rossen Zhivkov', slides:'5'}
  
  ];

*/



    
  }




  

}
