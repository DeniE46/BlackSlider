import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { TilesPage } from '../tiles/tiles';
import { DetailsProvider } from'../../providers/details-service/details-service';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { AuthorPage } from '../author/author';
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
  
  @ViewChild('mySlider') slider: Slides;
  site:string; 
  isLandscape:any = true;
  currentPageName:String;

  slideName:any; 

  //details
  presentationId:any;
  presentationTitle:any;
  slides:any;
  childrenSlides:any;

  //tiles
  singleTileSlide:any;
  test:any;
  rows:any;
  workspaceId:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public detailsProvider:DetailsProvider, public http:Http, public platform:Platform, public events:Events) {
    this.currentPageName = "[detail.ts]";
    this.slides = [];
    this.childrenSlides = [];
    this.loadDetails();
    
    events.subscribe('tileID:set', (i) => {
    console.log(this.currentPageName + "got " + i + " as an index");
    this.test=i;
    this.goToSlide(i); 

    });
    
    this.site = "http://slidle.com";
     
    window.addEventListener('orientationchange', () => {
      //console.info('DEVICE ORIENTATION CHANGED!');
      
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
    console.log(this.currentPageName + "received from [home.ts]: " + this.navParams.get('id'));
    this.presentationId = this.navParams.get('id');
    this.presentationTitle = this.navParams.get('title');
    this.workspaceId = this.navParams.get('workspaceId');
    //loading data
    this.detailsProvider.load(this.presentationId)
    .then(data => {
        
        for(let i of data){
         if(i.type == "scene"){
            this.slides.push(i);
            this.childrenSlides = i.children;
            //if(i.children != null/empty)
            for(let j of this.childrenSlides){
              if(j.type == "scene"){
                this.slides.push(j);
              }
            }
          }
        }
        
        this.rows = Array.from(Array(Math.ceil(data.length / 2)).keys());
        // deleting first element because it is null
        //this.slides.splice(0,1);
        console.log("data in presentation:");
        console.log(this.slides);
        console.log("data in children:");
        console.log(this.childrenSlides);
    });

    
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  openTiles(){
     let data = {tiles:this.slides, rows:this.rows} 
	  this.navCtrl.push(TilesPage, data);
  }


 slideChanged(){
   let currentIndex = this.slider.getActiveIndex();
    console.log(this.currentPageName + "Current index is: " + currentIndex);
    this.slideName = this.slides[currentIndex];
    console.log(this.slideName);
 }
    
 return(){
   this.navCtrl.pop();
 }

 goToSlide(i) { 
    this.slider.slideTo(i, 500);  
  }

  openAuthor(){
    //let data = {workspaceId: this.workspaceId};
    this.navCtrl.push(AuthorPage);
  }

 ionViewWillLeave() {}
  
}


