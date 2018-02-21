import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { WorkspaceIdProvider } from '../../providers/workspace-id/workspace-id';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { PresentationIdProvider } from '../../providers/presentation-id/presentation-id';
import { DetailPage } from '../detail/detail';
import { AuthorProvider } from '../../providers/author/author';
import { Component, trigger, state, style, transition, animate, keyframes, ViewChild, NgZone } from '@angular/core';
import { HomePage } from '../home/home';
import { SuperTabsController, SuperTabs } from 'ionic2-super-tabs';
import { TabsPage } from '../tabs/tabs';
import { LogInPage } from '../log-in/log-in';
  

/**
 * Generated class for the AuthorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-author',
  templateUrl: 'author.html',
  animations:[
    trigger('flyInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('100ms ease-in')),
      transition('out => in', animate('100ms ease-out'))
    ]),
    trigger('flyOutIn', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('100ms ease-in')),
      transition('out => in', animate('100ms ease-out'))
    ]),
   ],
})

export class AuthorPage {
  currentPageName:any;
  workspaceId:any;

  searchTerm:string = '';
	searchControl:FormControl;
  searching:any = false; 
  isSearchBarVisible:boolean;
  @ViewChild('searchbarAuthor')searchbar:Searchbar;
  @ViewChild('SuperTabs')superTabs: SuperTabs; 


  site:any;
  userPresentations:any;
  presentationsCount:any;
  presentationOwner:any;
  singlePresentationgObj:any;
  getFlat:String;
  rows:any;
  items:any;
  singleObj:any;
  indexPos:any;
  showPlaceholder:any;
  tabsPage:TabsPage;
  isUserConfig:boolean;
  loginTest:boolean;

  //animations
	flyInOutState: String = 'in';
	flyOutInState: String = 'out';

  constructor(public navCtrl: NavController, public navParams: NavParams, public events:Events, private workspaceIdProvider:WorkspaceIdProvider, public http:Http, public presentationIdProvider:PresentationIdProvider, public authorProvider:AuthorProvider, public zone:NgZone, public superTabsCtrl:SuperTabsController) {
    this.site = "http://slidle.com";
    //this.initializeReusables();
    this.currentPageName = "[Author.ts]";
    this.searchControl = new FormControl();
    this.getFlat = "?flat=true";
    this.workspaceId = this.workspaceIdProvider.getWorkspaceId();
    //this.isUserConfig = false;
    
    this.events.subscribe('tab:selected', (tab) => {
      if(tab == 2){
        
        this.isUserConfig = true;
        console.log('in constructor, you');
        this.presentationOwner = "you";
      }
      else{
        this.isUserConfig = false;
         
        console.log('in constructor, not you');
      }
    }); 
    
    if(this.isUserConfig){
      console.log('in lifecycle, you');
        //this.presentationOwner = "you";
    }
    else{
      console.log('in lifecycle, not you');
      this.loadPresentations();
    }
  }

  


  initializeReusables(){
    this.presentationsCount = 0;
    this.presentationOwner = "You";
    this.userPresentations = [];
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    

    
    
  }

  ionViewDidLoad() {
   this.setFilteredItems();
		this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
			this.searching = false;
			this.setFilteredItems();
    })
  }

  setFilteredItems(){
		this.filterData(this.searchTerm);
	}

	onSearchInput(){
		this.searching = true; 
	}

  loadPresentations(){
    console.log('called, start loading');
    this.authorProvider.load(this.workspaceId)
    .then(data =>{
      this.userPresentations = data;
      //
      this.rows = Array.from(Array(Math.ceil(this.userPresentations.length / 2)).keys());
      //this.userPresentations = data;
      this.presentationsCount = this.userPresentations.length;
      
      this.singlePresentationgObj = this.userPresentations[0];
      this.presentationOwner = this.presentationIdProvider.getPresentationOwner();
      //
      if(this.userPresentations.length == 0){
        this.showPlaceholder = true;
      }
      else{
        this.showPlaceholder = false;
      }

      

      this.initializeItems();
    })
  }


  initializeItems(){
    this.items = this.userPresentations; 
  }

  filterData(searchTerm){
		this.initializeItems();
		if(searchTerm != ''){//protects against 'filter of undefined' error
			this.items = this.items.filter((item) => {
				return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
			});
		}
	}

  getPosition(i, j){
    this.indexPos = j*2+i;
    this.singleObj = this.items[this.indexPos];
    // this.events.publish('presentationID:set', this.singleObj.id);
    console.log("publishing ID: " + this.singleObj.id);
    this.presentationIdProvider.setPresentationId(this.singleObj.id);
    this.return();

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
        if(this.searchbar != null){
        this.searchbar.setFocus();
        }
   		});
    	}
		}
		
		clearSearchBar(){
			this.zone.run(() => {
				this.searchTerm='';
			 });
			 this.setFilteredItems();
		}

    //animations
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
   
   return(){
     if(!this.isUserConfig){
      this.navCtrl.pop();
     }
   }

   ionViewWillLeave(){
    console.log("page will close");
    this.clearSearchBar();
    this.toggleFlyInOut();
    this.isSearchBarVisible = false;
    this.superTabsCtrl.showToolbar(true);
    //this.initializeReusables();
    this.userPresentations = [];
    this.items = [];
  }

}
