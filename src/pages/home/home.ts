import { Component} from '@angular/core';
import { NavController, Platform, NavParams  } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { SearchProvider } from '../../providers/search/search';
import { Http } from '@angular/http';

//example 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 
	searchTerm:string = '';
	searchControl:FormControl;
	searching:any = false; 
	site:string;
	currentPageName:String;

	presentations: any;
	workspaceId:any; 
	slidesObj:any;

  constructor(public navCtrl: NavController, public searchProvider:SearchProvider, private platform: Platform, private http:Http, private navParams:NavParams) {
		this.site = "http://slidle.com";
		this.currentPageName = "[home.ts]";
		this.searchControl = new FormControl();
	}
	
	getPosition(i){
		console.log(this.currentPageName + "position is: " + i);
		this.slidesObj = this.presentations[i];
		console.log(this.currentPageName + "id passed to [details.ts]: " + this.slidesObj.id);
		this.openDetail();
	}


	ionViewDidLoad(){ 
		console.log(this.currentPageName + "received from [work-spaces.ts]: " + this.navParams.get('id'));
		this.workspaceId = this.navParams.get('id');
		this.setFilteredItems();
		this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
			this.searching = false;
			this.setFilteredItems();
		})
	}

	setFilteredItems(){
		this.filterWorkSpaces(this.searchTerm);
	}

	onSearchInput(){
		this.searching = true;
	}

	openDetail(){
		let data = {id:this.slidesObj.id, title:this.slidesObj.title};
		console.log(this.slidesObj.id);
	  	this.navCtrl.push(DetailPage, data);
    }


	filterWorkSpaces(searchTerm){
    this.http.get('http://slidle.com/content/getpages/' + this.workspaceId)
      .map(res => res.json())
      .subscribe(data => {
        this.presentations = data;
        console.log(this.currentPageName + "received presentations: " + this.presentations);
   		this.presentations = this.presentations.filter((presentation) => {
      return presentation.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

 }); 

  }


  

  }
  
  
  



