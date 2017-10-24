import { Component} from '@angular/core';
import { NavController, Platform, NavParams  } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { WorkspaceIdProvider } from '../../providers/workspace-id/workspace-id';
import { WorkSpacesProvider } from '../../providers/work-spaces-service/work-spaces-service';


//example 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 
	searchTerm:string;
	searchControl:FormControl;
	searching:any = false; 
	site:string;
	currentPageName:String;
 
	presentations: any;
	workspaceId:any; 
	slidesObj:any; 
	workspaces:any;
	tempArray:any;
	

  constructor(public navCtrl: NavController, private platform: Platform, private http:Http, private navParams:NavParams, public events:Events, public workspaceIdProvider:WorkspaceIdProvider, public workspacesProvider:WorkSpacesProvider) {
		this.searchTerm = '';
		this.site = "http://slidle.com";
		this.currentPageName = "[home.ts]";
		this.searchControl = new FormControl();
		//this.loadWorkspaces();
		this.tempArray = [];
		this.presentations = [];

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
		this.workspaceIdProvider.setWorkspaceId(this.navParams.get('id'));
		this.setFilteredItems();
		this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
			this.searching = false;
			this.setFilteredItems();
		})
	}

	setFilteredItems(){
		this.filterPerUserPresentations(this.searchTerm);
	}

	onSearchInput(){
		this.searching = true;
	}

	openDetail(){
		let data = {id:this.slidesObj.id, title:this.slidesObj.title, workspaceId:this.workspaceId};
		console.log("id passed to Detail page: " + this.workspaceId);
	  	this.navCtrl.push(DetailPage, data);
    }
	  
	/*filterPresentations(searchTerm){
		this.workspacesProvider.load()
    	.then(data => {
			this.workspaces = data;
			for (let i of this.workspaces) {
				if(i.name != null){
    				this.http.get('http://slidle.com/content/getpages/' + i.id)
     				 .map(res => res.json())
     				 .subscribe(data => {
							this.tempArray = data;	  
							for(let j of this.tempArray){
								if(j.title != null){
									this.presentations.push(j);
								}
							}
							this.presentations = this.presentations.filter((presentation) => {
							 			return presentation.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
							});	
							console.log("testArray:");
							console.log(this.tempArray);
							console.log("presentations:");
							console.log(this.presentations);
							this.tempArray = [];
					 }); 
				}	
					else {console.log("it was null")}

			}
		
    	});
  	}*/

	filterPerUserPresentations(searchTerm){
			this.http.get('http://slidle.com/content/getpages/' + this.workspaceId)
     				 .map(res => res.json())
     				 .subscribe(data => {
							this.tempArray = data;	  
							for(let j of this.tempArray){
								if(j.title != null){
									this.presentations.push(j);
								}
							}
							this.presentations = this.presentations.filter((presentation) => {
							 			return presentation.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
							});	
							console.log("testArray:");
							console.log(this.tempArray);
							console.log("presentations:");
							console.log(this.presentations);
							this.tempArray = [];
					 }); 
	}

  

  }
  
  
  



