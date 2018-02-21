import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { WorkSpacesPage } from '../work-spaces/work-spaces';
import { AuthorPage } from '../author/author';
import { Events } from 'ionic-angular';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
 
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
@IonicPage()
export class TabsPage {

  p1Root:any = HomePage;
  p2Root:any = WorkSpacesPage;
  p3Root:any = AuthorPage;
  currentTab:any = 0;
  oneTimeTask:boolean = true;
  


  constructor(public navCtrl: NavController, public events: Events) {
    if(this.oneTimeTask){
      this.events.publish('tab:selected', 0);
      this.oneTimeTask = false;
      console.log("firing up one time task");
    }
  }


  onTabSelect(ev: any) {
    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
    this.currentTab = ev.index;
    this.events.publish('tab:selected', ev.index);
  }

}
