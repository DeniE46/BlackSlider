import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkSpacesProvider } from '../../providers/work-spaces-service/work-spaces-service';
import { HomePage } from '../home/home';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';

/**
 * Generated class for the WorkSpacesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-work-spaces',
  templateUrl: 'work-spaces.html',
   providers: [WorkSpacesProvider]
})

export class WorkSpacesPage {

  searchTerm:string = '';
  searchControl:FormControl;
  searching:any = false;
  isSearchBarVisible:boolean; 
  
  workspaceId:any;
  workspacesArr:any;
  items:any;
  currentPageName:String;

 
  constructor(public navCtrl: NavController, public navParams: NavParams, public workspacesProvider:WorkSpacesProvider, public http:Http) {
    this.searchControl = new FormControl();
    
    //this.loadProjects();
    this.currentPageName = "[work-spaces.ts]";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkSpacesPage');
    this.loadProjects();
    this.setFilteredItems();
		this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
			this.searching = false;
			this.setFilteredItems();
    })
    this.isSearchBarVisible = false;
  }

  setFilteredItems(){
		this.filterData(this.searchTerm);
  }
  
  onSearchInput(){
		this.searching = true;  
	}

  getPosition(i){
    console.log(this.currentPageName + "position is: " + i);
    this.workspaceId = this.items[i];
    console.log(this.currentPageName + "id passed to [home.ts]: " + this.workspaceId.id);
    this.openHomePage(false);
	}

  loadProjects(){
    this.workspacesProvider.load() 
    .then(data=>{
      this.workspacesArr = data;
      this.initializeItems();
    });
  }

  initializeItems(){
    this.items = this.workspacesArr;
  }

  filterData(searchTerm){
    this.initializeItems();
    if(searchTerm != ''){
      console.log(searchTerm);
      this.items = this.items.filter((item) => {
        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    }
  }

  openHomePage(all){
    if(all){
      let data = { id:1, display:all, workspaceName:"All presentations"};
      this.navCtrl.push(HomePage, data);
    }
    else{
      let data = { id:this.workspaceId.id, display:all, workspaceName: this.workspaceId.name};
      this.navCtrl.push(HomePage, data);
    }
   
    
  }

  showSearchBar(){
    if(this.isSearchBarVisible){
      this.isSearchBarVisible = false;
    }
    else{
      this.isSearchBarVisible = true;
    }
  }



}
