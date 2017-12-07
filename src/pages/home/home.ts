import { Component, trigger, state, style, transition, animate, keyframes, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams  } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { WorkspaceIdProvider } from '../../providers/workspace-id/workspace-id';
import { PresentationIdProvider } from '../../providers/presentation-id/presentation-id';
import { WorkSpacesProvider } from '../../providers/work-spaces-service/work-spaces-service';
import { WorkSpacesPage } from '../work-spaces/work-spaces';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AuthorPage } from '../author/author';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations:[
    trigger('flyInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(150%, 0, 0)'
      })),
      transition('in => out', animate('100ms ease-in')),
      transition('out => in', animate('100ms ease-out'))
    ]),
    trigger('flyOutIn', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-150%, 0, 0)'
      })),
      transition('in => out', animate('100ms ease-in')),
      transition('out => in', animate('100ms ease-out'))
    ]),
   ],
providers: [ScreenOrientation]
})
export class HomePage { 
	searchTerm:string;
	searchControl:FormControl;
	searching:any = false; 
	isSearchBarVisible:boolean; 

	site:string;
	currentPageName:String;
 
	presentations: any;
	workspaceId:any; 
	slidesObj:any; 
	workspaces:any;
	items:any;
	workspaceName:String;

	shouldLoadAll;
	getFlat:String;
	//animations
	flyInOutState: String = 'in';
	flyOutInState: String = 'out';
	  
	isPortrait:any;
	

  constructor(public navCtrl: NavController, private platform: Platform, private http:Http, private navParams:NavParams, public events:Events, public workspaceIdProvider:WorkspaceIdProvider, public workspacesProvider:WorkSpacesProvider, public screenOrientation: ScreenOrientation, public presentationIdProvider:PresentationIdProvider) {
	this.getDeviceOrientation();	
	this.searchTerm = '';
		this.site = "http://slidle.com";
		this.currentPageName = "[home.ts]";
		this.searchControl = new FormControl();
		//this.loadWorkspaces();
		this.presentations = [];
		this.getFlat = "?flat=true";
	}
	
	getPosition(i){
		this.slidesObj = this.items[i];
		this.workspaceIdProvider.setWorkspaceId(this.slidesObj.projectID);
		//this.publishCurrentWorkspace(this.slidesObj.owner);
	}


	ionViewDidLoad(){ 
		this.onOrientationChanged();
		this.workspaceId = this.navParams.get('id');
		if(this.navParams.get('id') != null){
		this.workspaceIdProvider.setWorkspaceId(this.navParams.get('id'));
		}
	
		if(this.navParams.get('display') != null){
			this.shouldLoadAll = this.navParams.get('display');
		}
		else{
			this.shouldLoadAll = true;
		}
		this.workspaceName = this.navParams.get('workspaceName');
		//filtering
		this.setFilteredItems();
		this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
			this.searching = false;
			this.setFilteredItems();
		})
		
		//this.filterPresentations();
		if(this.shouldLoadAll){
			this.filterPresentations();
		}
		else{
			this.filterPerUserPresentations();
		}
			
	}

	setFilteredItems(){
		this.filterData(this.searchTerm);
	}

	onSearchInput(){
		this.searching = true;
	}

	openDetail(){
		//let data = {id:this.slidesObj.id, title:this.slidesObj.title, owner:this.slidesObj.owner, projectID:this.slidesObj.projectID};
		// this.events.publish('presentationID:set', this.slidesObj.id);
		// console.log("publishing id from Home:" + this.slidesObj.id);
		this.presentationIdProvider.setPresentationName(this.slidesObj.title);
		this.presentationIdProvider.setPresentationOwner(this.slidesObj.owner); 
		this.presentationIdProvider.setPresentationId(this.slidesObj.id);
	  	this.navCtrl.push(DetailPage);
    }
	  
	filterPresentations(){
		this.workspacesProvider.load()
    	.then(data => {
			this.workspaces = data;
			for (let i of this.workspaces) {
				if(i.name != null){
    				this.http.get('http://slidle.com/content/getpages/' + i.id + this.getFlat)
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
			this.http.get('http://slidle.com/content/getpages/' + this.workspaceId + this.getFlat)
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
		if(searchTerm != ''){
			this.items = this.items.filter((item) => {
				return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
			});
		}
	}

	publishCurrentWorkspace(currentWorkspace){
		//rule is: if the data will be passed to more than one page use event emitter instead of push by page.
		//doesn't apply when the newly-opened page needs the data to be passed by push()
	}

	searchBar(clearSearchbar:boolean){
		if(clearSearchbar){
			this.searchTerm='';
			
		}
    this.toggleFlyInOut();
    if(this.isSearchBarVisible){
      this.isSearchBarVisible = false;
    }
    else{
      this.isSearchBarVisible = true;
    }
  	}

	 toggleFlyInOut(){
    
       this.flyInOutState = 'out';
    
       setInterval(() => {
         this.flyInOutState = 'in';
       }, 100);
    
     }

	toggleFlyOutIn(){
    
       this.flyOutInState = 'in';
    
       setInterval(() => {
         this.flyOutInState = 'out';
       }, 100);
    
	 }
	
	 onOrientationChanged(){
    this.screenOrientation.onChange().subscribe(
      () => {   
          if((this.screenOrientation.type == "portrait-primary") || (this.screenOrientation.type == "portrait-secondary") || (this.screenOrientation.type == "portrait")){
            this.isPortrait = true;
          }
          if((this.screenOrientation.type == "landscape-primary") || (this.screenOrientation.type == "landscape-secondary") || (this.screenOrientation.type == "landscape")){
            this.isPortrait = false;
          }

      }
   );
  }

  getDeviceOrientation(){
         
          if((this.screenOrientation.type == "portrait-primary") || (this.screenOrientation.type == "portrait-secondary") || (this.screenOrientation.type == "portrait")){
            this.isPortrait = true;
          }
          if((this.screenOrientation.type == "landscape-primary") || (this.screenOrientation.type == "landscape-secondary") || (this.screenOrientation.type == "landscape")){
            this.isPortrait = false;
          }

   
	}
	
	openWorkSpacesPage(){
		this.navCtrl.push(WorkSpacesPage);
	}

	openAuthor(){
		this.presentationIdProvider.setPresentationName(this.slidesObj.title);
		this.presentationIdProvider.setPresentationOwner(this.slidesObj.owner);
		this.presentationIdProvider.setPresentationId(this.slidesObj.id);
		this.navCtrl.push(AuthorPage);
	}

  }
  
  
  



