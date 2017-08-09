import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkSpacesProvider } from '../../providers/work-spaces-service/work-spaces-service';
import { HomePage } from '../home/home';

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

  workspaceId:any;
  workspaces:any;
  currentPageName:String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public workspacesProvider:WorkSpacesProvider) {
    this.loadProjects();
    this.currentPageName = "[work-spaces.ts]";
  }

  getPosition(i){
    console.log(this.currentPageName + "position is: " + i);
    this.workspaceId = this.workspaces[i];
    console.log(this.currentPageName + "id passed to [home.ts]: " + this.workspaceId.id);
    this.openHomePage();
	}

  loadProjects(){
    this.workspacesProvider.load()
    .then(data => {
        this.workspaces = data;
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkSpacesPage');
  }

  openHomePage(){
    let data = { id:this.workspaceId.id };
    console.log(this.workspaceId.id);
    this.navCtrl.push(HomePage, data);
  }

}
