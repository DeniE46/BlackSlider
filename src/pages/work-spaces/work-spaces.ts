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
})
export class WorkSpacesPage {

  presentationIdObj:any;

  workspaces:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public workspacesProvider:WorkSpacesProvider) {
    this.loadProjects();
    
  }

  checkPosition(i){
		console.log('position is ' + i);
	}

  loadProjects(){
    this.workspacesProvider.load()
    .then(data => {
        this.workspaces = data;
      
    });
     // this.loadInitialObject(this.Initial_Slide_Index);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkSpacesPage');
  }

  openHomePage(){
    this.navCtrl.push(HomePage);
  }

}
