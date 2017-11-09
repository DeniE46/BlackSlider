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
  
  workspaceId:any;
  workspaces:any;
  currentPageName:String;

 
  constructor(public navCtrl: NavController, public navParams: NavParams, public workspacesProvider:WorkSpacesProvider, public http:Http) {
    this.searchControl = new FormControl();
    
    //this.loadProjects();
    this.currentPageName = "[work-spaces.ts]";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkSpacesPage');
    this.setFilteredItems();
		this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
			this.searching = false;
			this.setFilteredItems();
		})
  }

  setFilteredItems(){
		this.loadProjects(this.searchTerm);
  }
  
  onSearchInput(){
		this.searching = true; 
	}

  

  getPosition(i){
    console.log(this.currentPageName + "position is: " + i);
    this.workspaceId = this.workspaces[i];
    console.log(this.currentPageName + "id passed to [home.ts]: " + this.workspaceId.id);
    this.openHomePage(false);
	}

  loadProjects(searchTerm){
    this.workspacesProvider.load()
    .then(data=>{
      this.workspaces = data;
      this.workspaces = this.workspaces.filter((workspace) => {
          return workspace.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    });
  }

  openHomePage(all){
    if(all){
      let data = { id:1, display:all};
      this.navCtrl.push(HomePage, data);
    }
    else{
      let data = { id:this.workspaceId.id, display:all};
      this.navCtrl.push(HomePage, data);
    }
    //console.log(this.workspaceId.id);
    
  }



}
