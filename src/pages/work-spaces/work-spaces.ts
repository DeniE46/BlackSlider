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
  workspaces:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public workspacesProvider:WorkSpacesProvider) {
    this.workspaces = workspacesProvider.workspaces;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkSpacesPage');
  }

  openHomePage(){
    this.navCtrl.push(HomePage);
  }

}
