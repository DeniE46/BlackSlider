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

presentations:any;

  constructor(public http: Http) {
    console.log('Hello SearchProvider Provider');

	this.presentations=[
		{id: 1, name:'Workfaces', image:'img/presentation/p1.png', author:'Rossen Zhivkov', slides:'11'},
		{id: 2, name:'Sharepoint strategy', image:'img/sharepoint.png', author:'Rossen Zhivkov', slides:'3'},
		{id: 5, name:'Montana', image:'img/montana.png', author:'Rossen Zhivkov', slides:'21'},
		{id: 3, name:'SlideSeeds', image:'img/slideseeds.png', author:'Danina Ilinska', slides:'9'},
		{id: 4, name:'HR Suite', image:'img/hrsuite.png', author:'Rossen Zhivkov', slides:'7'},
		{id: 5, name:'Ideaz.pro', image:'img/ideazpro.png', author:'Denislav Popov', slides:'10'},
		{id: 6, name:'Idea Incepting', image:'img/incepting.png', author:'Rossen Zhivkov', slides:'5'}
	];

  }

  filterWorkSpaces(searchTerm){
    return this.presentations.filter((presentation) => {
      return presentation.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
