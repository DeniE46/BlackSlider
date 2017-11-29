import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { TilesPage } from '../tiles/tiles';
import { DetailsProvider } from'../../providers/details-service/details-service';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { AuthorPage } from '../author/author';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
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
  providers: [DetailsProvider, ScreenOrientation]
})

export class DetailPage {
  
  @ViewChild('mySlider') slider: Slides;
  
  site:string; 
  isPortrait:any;
  currentPageName:String;

  slideName:any; 

  //details
  presentationId:any;
  presentationTitle:any;
  presentationOwner:any;
  slides:any;
  slidesLength:any;
  childrenSlides:any;
  //styling
  optionBarIsVisible:boolean;
  paddingTop:string;
  //tiles
  singleTileSlide:any; 
  test:any;
  rows:any;
  workspaceId:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public detailsProvider:DetailsProvider, public http:Http, public platform:Platform, public events:Events, public screenOrientation: ScreenOrientation) {
    this.getDeviceOrientation();
    this.currentPageName = "[detail.ts]";
    this.slides = [];
    this.childrenSlides = [];
    this.loadDetails();
    
    
    events.subscribe('tileID:set', (i) => {
    console.log(this.currentPageName + "got " + i + " as an index");
    this.test=i;
    this.goToSlide(i); 
    });
    
    
    console.log(this.screenOrientation.type);
    this.site = "http://slidle.com"; 
    
  }


  loadDetails(){
    //TODO: these should be moved to IonViewDidLoad()
    this.presentationId = this.navParams.get('id');
    this.presentationTitle = this.navParams.get('title');
    this.workspaceId = this.navParams.get('workspaceId');
    this.presentationOwner = this.navParams.get('owner');
    console.log("owner is:" + this.presentationOwner); 
    console.log(this.currentPageName + "received from [home.ts]: " + this.presentationId);
    //-//

    //loading data
    this.detailsProvider.load(this.presentationId) 
    .then(data => {
      this.slides = data;
        this.rows = Array.from(Array(Math.ceil(data.length / 2)).keys());
    this.slidesLength = this.slides.length;    
    });
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    this.onOrientationChanged();
  }


  onOrientationChanged(){
    this.screenOrientation.onChange().subscribe(
      () => {
          console.log("Orientation Changed");
          
          if((this.screenOrientation.type == "portrait-primary") || (this.screenOrientation.type == "portrait-secondary") || (this.screenOrientation.type == "portrait")){
            this.isPortrait = true;
            console.log("listener value: " + this.screenOrientation.type);
            console.log("listener value: " + this.isPortrait);
          }
          if((this.screenOrientation.type == "landscape-primary") || (this.screenOrientation.type == "landscape-secondary") || (this.screenOrientation.type == "landscape")){
            this.isPortrait = false;
            console.log("listener value: " + this.screenOrientation.type);
            console.log("listener value: " + this.isPortrait);
        
          }

      }
   );
  }

  getDeviceOrientation(){
    console.log("getDeviceOrientation() called");
         
          if((this.screenOrientation.type == "portrait-primary") || (this.screenOrientation.type == "portrait-secondary") || (this.screenOrientation.type == "portrait")){
            this.isPortrait = true;
            console.log("got value: " + this.screenOrientation.type);
            console.log("got value: " + this.isPortrait);
          }
          if((this.screenOrientation.type == "landscape-primary") || (this.screenOrientation.type == "landscape-secondary") || (this.screenOrientation.type == "landscape")){
            this.isPortrait = false;
            console.log("got value: " + this.screenOrientation.type);
            console.log("got value: " + this.isPortrait);
          }

   
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

  showOptions(){
    
    if(this.optionBarIsVisible){
        this.optionBarIsVisible = false;
    }
    else{
        this.optionBarIsVisible = true;
    }
    console.log("called showOptions()");
    console.log("value is: " + this.optionBarIsVisible);
  }
  
}


