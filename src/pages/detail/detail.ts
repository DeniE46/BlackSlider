import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { TilesPage } from '../tiles/tiles';
import { NotesPage } from '../notes/notes';
import { DetailsProvider } from'../../providers/details-service/details-service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
  providers: [DetailsProvider]
})
export class DetailPage {

  public slides:any;
  public site:string;
  public isLandscape:any = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public detailsProvider:DetailsProvider, public http:Http, public platform:Platform) {
    this.loadDetails();
    this.site = "http://slidle.com";
 

window.addEventListener('orientationchange', () => {
      console.info('DEVICE ORIENTATION CHANGED!');
      
      switch (window.orientation) {
        case -90:
          //landscape for when the device is tilted clockwise
        case 90:
              console.log("Landscape orientation");
              this.isLandscape = false;
              break;
        case 0:
             console.log("Portrait orientation");
              this.isLandscape = true;
             break;
      }      
    });


  }

  loadDetails(){
    this.detailsProvider.load()
    .then(data => {
        this.slides = data;
        //deleting first element because it is null
        this.slides.splice(0,1);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

   openTiles(){
	  this.navCtrl.push(TilesPage);
  }

//passing argument to display the popover near the button that called it
	openNotes(myEvent){
		 let popover = this.popoverCtrl.create(NotesPage);
    popover.present({ev:myEvent});
   
	}

 
  
}


