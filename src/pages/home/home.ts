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
	items:any;

	shouldLoadAll;
	

  constructor(public navCtrl: NavController, private platform: Platform, private http:Http, private navParams:NavParams, public events:Events, public workspaceIdProvider:WorkspaceIdProvider, public workspacesProvider:WorkSpacesProvider) {
		this.searchTerm = '';
		this.site = "http://slidle.com";
		this.currentPageName = "[home.ts]";
		this.searchControl = new FormControl();
		//this.loadWorkspaces();
		this.presentations = [];
		//this.filterPerUserPresentations();
		
			

	}
	
	getPosition(i){
		console.log(this.currentPageName + "position is: " + i);
		this.slidesObj = this.items[i];
		console.log(this.currentPageName + "id passed to [details.ts]: " + this.slidesObj.id);
		this.publishCurrentWorkspace(this.slidesObj.owner);
		this.openDetail();
	}


	ionViewDidLoad(){ 
		this.workspaceId = this.navParams.get('id');
		this.workspaceIdProvider.setWorkspaceId(this.navParams.get('id'));
		this.shouldLoadAll = this.navParams.get('display');
		//filtering
		this.setFilteredItems();
		this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
			this.searching = false;
			this.setFilteredItems();
		})
		
		//
		if(this.shouldLoadAll){
			this.filterPresentations();
		}
		else{
			this.filterPerUserPresentations();
		}
		//
	}

	setFilteredItems(){
		this.filterData(this.searchTerm);
	}

	onSearchInput(){
		this.searching = true;
	}

	openDetail(){
		let data = {id:this.slidesObj.id, title:this.slidesObj.title, workspaceId:this.workspaceId};
		console.log("id passed to Detail page: " + this.workspaceId);
	  	this.navCtrl.push(DetailPage, data);
    }
	  
	filterPresentations(){
		this.workspacesProvider.load()
    	.then(data => {
			this.workspaces = data;
			for (let i of this.workspaces) {
				if(i.name != null){
    				this.http.get('http://slidle.com/content/getpages/' + i.id)
     				 .map(res => res.json())
     				 .subscribe(data => {	  
							for(let j of data){
								if(j.title != null){   
									this.presentations.push(j);
								}
							}
					 }); 
					
				}	
			}
			this.initializeItems();
		});
			
	}
	  
	//TODO: put the filter methods in service and call them depending on shouldshowall logic

	filterPerUserPresentations(){
			this.http.get('http://slidle.com/content/getpages/' + this.workspaceId)
     				 .map(res => res.json())
     				 .subscribe(data => {
						this.presentations = data;
						this.initializeItems();
					 }); 
	}

	initializeItems(){
		this.items = this.presentations;
	}

	filterData(searchTerm){
		this.initializeItems();
		if(searchTerm != ''){//protects against 'filter of undefined' error
			this.items = this.items.filter((item) => {
				return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
			});
		}
	}

	publishCurrentWorkspace(currentWorkspace){
		//rule is: if the data will be passed to more than one page use event emitter instead of push by page.
		//doesn't apply when the newly-opened page needs the data to be passed by push()
	}

  }
  
  
  



