import { IonicPage, NavController, NavParams, LoadingController, Searchbar } from 'ionic-angular';
import { WorkSpacesProvider } from '../../providers/work-spaces-service/work-spaces-service';
import { HomePage } from '../home/home';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { Component, trigger, state, style, transition, animate, keyframes, ViewChild, NgZone } from '@angular/core';

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
   providers: [WorkSpacesProvider],
   animations:[
    trigger('flyInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('150ms ease-in')),
      transition('out => in', animate('150ms ease-out'))
    ]),
    trigger('flyOutIn', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('150ms ease-in')),
      transition('out => in', animate('150ms ease-out'))
    ]),
   ]
})

export class WorkSpacesPage {

  searchTerm:string = '';
  searchControl:FormControl;
  searching:any = false;
  isSearchBarVisible:boolean; 
  @ViewChild('searchbarSpace')searchbar:Searchbar;
  
  workspaceId:any;
  workspacesArr:any;
  items:any;
  currentPageName:String;
  //animations
  flyInOutState: String = 'in';
  flyOutInState: String = 'out';

  loadingWindow:any;

 
  constructor(public navCtrl: NavController, public navParams: NavParams, public workspacesProvider:WorkSpacesProvider, public http:Http, public loadingCtrl: LoadingController, public zone:NgZone) {
    this.searchControl = new FormControl();
    
    //this.loadProjects();
    this.currentPageName = "[work-spaces.ts]";
    //this.presentLoadingDefault();
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

  presentLoadingDefault() {
    this.loadingWindow = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  this.loadingWindow.present();
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
    //this.loadingWindow.dismiss();
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

returnToHome(){
  this.navCtrl.pop();
}

ionViewWillLeave(){
  console.log("page will close");
  this.clearSearchBar();
  this.toggleFlyInOut();
  this.isSearchBarVisible = false;
}

}
