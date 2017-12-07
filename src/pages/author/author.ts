import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { WorkspaceIdProvider } from '../../providers/workspace-id/workspace-id';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { PresentationIdProvider } from '../../providers/presentation-id/presentation-id';
import { DetailPage } from '../detail/detail';
import { AuthorProvider } from '../../providers/author/author';
import { Component, trigger, state, style, transition, animate, keyframes, ViewChild } from '@angular/core';

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
})
export class AuthorPage {
  currentPageName:any;
  workspaceId:any;

  searchTerm:string = '';
	searchControl:FormControl;
  searching:any = false; 
  isSearchBarVisible:boolean;
  
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

  //animations
	flyInOutState: String = 'in';
	flyOutInState: String = 'out';

  constructor(public navCtrl: NavController, public navParams: NavParams, public events:Events, public workspaceIdProvider:WorkspaceIdProvider, public http:Http, public presentationIdProvider:PresentationIdProvider, public authorProvider:AuthorProvider) {
    this.site = "http://slidle.com";
    this.currentPageName = "[Author.ts]";
    this.searchControl = new FormControl();
    this.getFlat = "?flat=true";
    //this.workspaceId = this.navParams.get('workspaceId');
    //console.log(this.currentPageName + "received from [detail.ts]" + this.workspaceId);
     //console.log(this.currentPageName + ": " + this.workspaceIdProvider.getWorkspaceId());
     this.workspaceId = this.workspaceIdProvider.getWorkspaceId();
  }

  ionViewDidLoad() {
   this.setFilteredItems();
		this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
			this.searching = false;
			this.setFilteredItems();
		})
    this.loadPresentations();    
  }

  setFilteredItems(){
		this.filterData(this.searchTerm);
	}

	onSearchInput(){
		this.searching = true; 
	}

  loadPresentations(){
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
      this.initializeItems();
    })
  }


  initializeItems(){
    this.items = this.userPresentations; 
    console.log("in initializeItems(): ");
    console.log(this.items);
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
    //this.navCtrl.push(DetailPage);
    this.navCtrl.push(DetailPage);
  }

  //animations
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

}
