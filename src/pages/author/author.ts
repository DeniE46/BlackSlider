import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { WorkspaceIdProvider } from '../../providers/workspace-id/workspace-id';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';

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
})
export class AuthorPage {
  currentPageName:any;
  workspaceId:any;

  searchTerm:string = '';
	searchControl:FormControl;
  searching:any = false; 
  
  site:any;
  userPresentations:any;
  presentationsCount:any;
  userName:any;
  singlePresentationgObj:any;

  rows:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events:Events, public workspaceIdProvider:WorkspaceIdProvider, public http:Http) {
    this.site = "http://slidle.com";
    this.currentPageName = "[Author.ts]";
    this.searchControl = new FormControl();

    //this.workspaceId = this.navParams.get('workspaceId');
    //console.log(this.currentPageName + "received from [detail.ts]" + this.workspaceId);
     //console.log(this.currentPageName + ": " + this.workspaceIdProvider.getWorkspaceId());
     this.workspaceId = this.workspaceIdProvider.getWorkspaceId();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthorPage');
    
   this.setFilteredItems();
		this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
			this.searching = false;
			this.setFilteredItems();
		})

    
  }

  setFilteredItems(){
		this.filterPresentations(this.searchTerm);
	}

	onSearchInput(){
		this.searching = true; 
	}

  filterPresentations(searchTerm){
    this.http.get('http://slidle.com/content/getpages/' + this.workspaceId)
      .map(res => res.json())
      .subscribe(data => {
        this.rows = Array.from(Array(Math.ceil(data.length / 2)).keys());
        this.userPresentations = data;
        this.presentationsCount = this.userPresentations.length;
        this.userName = "test";
        this.singlePresentationgObj = this.userPresentations[0];
        this.userName = this.singlePresentationgObj.owner;
        console.log(this.currentPageName + "received presentations: " + this.userPresentations);
   		this.userPresentations = this.userPresentations.filter((presentation) => {
      return presentation.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

 }); 

  }

}
