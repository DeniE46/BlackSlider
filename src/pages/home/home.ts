import { Component, trigger, state, style, transition, animate, keyframes, ViewChild, Injectable, NgZone } from '@angular/core';
import { NavController, Platform, NavParams, LoadingController, Loading, Searchbar, Events, AlertController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Http } from '@angular/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { WorkspaceIdProvider } from '../../providers/workspace-id/workspace-id';
import { PresentationIdProvider } from '../../providers/presentation-id/presentation-id';
import { WorkSpacesProvider } from '../../providers/work-spaces-service/work-spaces-service';
import { FeaturedServiceProvider } from '../../providers/featured-service/featured-service';

import { DetailPage } from '../detail/detail';
import { WorkSpacesPage } from '../work-spaces/work-spaces';
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
	@ViewChild('searchbarHome') searchbar:Searchbar;

	site:string;
	currentPageName:String;
	presentations: any;
	workspaceId:any; 
	slidesObj:any; 
	workspaces:any;
	items:any;
	workspaceName:String;

	shouldLoadAll;
	getFlat:String = "?flat=true";
	//animations
	flyInOutState: String = 'in';
	flyOutInState: String = 'out';
	  
	isPortrait:any;

	loadingWindow:any;
	loading:Loading;

	showPlaceholder:boolean;
	listIsLatest:boolean;

  constructor(
		public navCtrl: NavController, 
		private platform: Platform, 
		private http:Http, 
		private navParams:NavParams, 
		public events:Events, 
		public workspaceIdProvider:WorkspaceIdProvider, 
		public workspacesProvider:WorkSpacesProvider, 
		public screenOrientation: ScreenOrientation, 
		public presentationIdProvider:PresentationIdProvider, 
		public featuredService:FeaturedServiceProvider, 
		public loadingCtrl: LoadingController, 
		public zone: NgZone, 
		private alertCtrl: AlertController) {
	this.getDeviceOrientation();	
	this.searchTerm = '';
	this.site = "http://slidle.com";
	this.currentPageName = "[home.ts]";
	this.searchControl = new FormControl();
	this.presentations = [];
	this.presentLoadingDefault();
	}
	
	getPosition(i){
		this.slidesObj = this.items[i];
		this.workspaceIdProvider.setWorkspaceId(this.slidesObj.projectID);
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
		if(this.shouldLoadAll){
			this.loadFeaturedPresentations();
		}
		else{
			this.filterPerUserPresentations();
		}
	}

	presentLoadingDefault() {
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.loading.present();
	}

	setFilteredItems(){
		this.filterData(this.searchTerm);
	}

	onSearchInput(){
		this.searching = true;
	}

	openDetail(){
		this.presentationIdProvider.setPresentationName(this.slidesObj.title);
		this.presentationIdProvider.setPresentationOwner(this.slidesObj.owner); 
		this.presentationIdProvider.setPresentationId(this.slidesObj.id);
		this.navCtrl.push(DetailPage);
  }
	  
	// filterPresentations(){
	// 	this.workspacesProvider.load()
  //   	.then(data => {
	// 		this.workspaces = data;
	// 		for (let i of this.workspaces) {
	// 			if(i.name != null){
  //   				this.http.get('http://slidle.com/content/getpages/' + i.id + this.getFlat)
  //    				 .map(res => res.json())
  //    				 .subscribe(data => {	  
	// 						for(let j of data){
	// 							if(j.title != null){   
	// 								this.presentations.push(j);
	// 							}
	// 						}
	// 				 }); 
					
	// 			}	
	// 		}
	// 		this.initializeItems();
	// 	});
	// }

	loadFeaturedPresentations(){
	
		this.featuredService.load()
		.then(data =>{
			this.presentations = data;
			this.initializeItems();
			this.zone.run(()=>{
				setTimeout(() => {
					this.loading.dismiss();
				}, 1000);
			})
			this.listIsLatest = true;
			})
	}
	  
	//TODO: put getpages in separate service
	filterPerUserPresentations(){
			this.http.get('http://slidle.com/content/getpages/' + this.workspaceId + this.getFlat)
     				 .map(res => res.json())
     				 .subscribe(data => {
						this.presentations = data;
						console.log("presentations in this space:");
						console.log(this.presentations);
						if(this.presentations.length == 0){
							this.showPlaceholder = true;
						}
						else{
							this.showPlaceholder = false;
						}
						this.initializeItems(); 
						this.zone.run(()=>{
							setTimeout(() => {
								this.loading.dismiss();
							}, 1000);
						})
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
	}

	showSearchBar(){
    this.toggleFlyInOut();
    if(this.isSearchBarVisible){
			this.isSearchBarVisible = false;
			console.log("called 2");
			this.clearSearchBar();
    }
    else{
			this.isSearchBarVisible = true;
			console.log("called 3");
			setTimeout(() => {
        this.searchbar.setFocus();
   		});
    	}
		}
		
		clearSearchBar(){
			this.zone.run(() => {
				this.searchTerm='';
			 });
			 this.setFilteredItems();
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

	//empty listView to repopulate the page
	recyclePresentations(){
		if(!this.listIsLatest){
		this.showPlaceholder = false;
		this.loadFeaturedPresentations();
		this.presentLoadingDefault();
		this.listIsLatest = true;
		}
	}

	ionViewWillLeave(){
		console.log("page will close");
		this.clearSearchBar();
		this.toggleFlyInOut();
    this.isSearchBarVisible = false;
	}

	//TODO: hide exit button on ios
	appExit() {
		let alert = this.alertCtrl.create({
			title: 'Confirm exit',
			message: 'Would you like to exit the app?',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					handler: () => {
					}
				},
				{
					text: 'Yes',
					handler: () => {
						this.platform.exitApp();
					}
				}
			]
		});
		alert.present();
	}

  }
  
  
  



