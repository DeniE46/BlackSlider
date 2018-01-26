import { Component, ViewChild, trigger, state, style, transition, animate, keyframes } from '@angular/core';
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
import { PresentationIdProvider } from '../../providers/presentation-id/presentation-id';
import { Subscription } from 'rxjs';

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
  providers: [DetailsProvider, ScreenOrientation],
  animations:[
    trigger('flyInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(150%, 0, 0)'
      })),
      transition('in => out', animate('100ms ease-in')),
      transition('out => in', animate('100ms ease-out'))
    ]),
    trigger('flyOutIn', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-150%, 0, 0)'
      })),
      transition('in => out', animate('100ms ease-in')),
      transition('out => in', animate('100ms ease-out'))
    ]),
   ],
})

export class DetailPage {
  private onResumeSubscription: Subscription;
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
  projectID:any;

  //animations
	flyInOutState: String = 'in';
	flyOutInState: String = 'out';

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public detailsProvider:DetailsProvider, public http:Http, public platform:Platform, public events:Events, public screenOrientation: ScreenOrientation, public presentationIdProvider:PresentationIdProvider) {
    this.getDeviceOrientation();
    this.currentPageName = "[detail.ts]";
    this.slides = [];
    this.childrenSlides = [];
    events.subscribe('tileID:set', (i) => {
      this.test=i;
      this.goToSlide(i); 
      }); 
    this.site = "http://slidle.com";    

  }

  ionViewWillEnter(){
    this.resetView();
    this.loadDetails();
  }

 

  loadDetails(){
 
    this.presentationTitle = this.presentationIdProvider.getPresentationName();
    console.log(this.currentPageName + this.presentationTitle);
    this.presentationId = this.presentationIdProvider.getPresentationId();
    this.presentationOwner = this.presentationIdProvider.getPresentationOwner(); 
    //loading data
    this.detailsProvider.load(this.presentationId) 
    .then(data => {
      console.log(this.currentPageName + "receiving:");
      console.log(data);
      this.slides = data;
      this.rows = Array.from(Array(Math.ceil(this.slides.length / 2)).keys());
      this.slidesLength = this.slides.length;
    });
    
  } 

  ionViewDidLoad() {
    this.onOrientationChanged();
    this.loadDetails();
  }



  onOrientationChanged(){
    this.screenOrientation.onChange().subscribe(
      () => {
          if((this.screenOrientation.type == "portrait-primary") || (this.screenOrientation.type == "portrait-secondary") || (this.screenOrientation.type == "portrait")){
            this.isPortrait = true;
          }
          if((this.screenOrientation.type == "landscape-primary") || (this.screenOrientation.type == "landscape-secondary") || (this.screenOrientation.type == "landscape")){
            this.isPortrait = false;
          }

      }
   );
  }

  getDeviceOrientation(){       
          if((this.screenOrientation.type == "portrait-primary") || (this.screenOrientation.type == "portrait-secondary") || (this.screenOrientation.type == "portrait")){
            this.isPortrait = true;
          }
          if((this.screenOrientation.type == "landscape-primary") || (this.screenOrientation.type == "landscape-secondary") || (this.screenOrientation.type == "landscape")){
            this.isPortrait = false;
          }

   
  }

  openTiles(){
     let data = {tiles:this.slides, rows:this.rows} 
	  this.navCtrl.push(TilesPage, data);
  }


 slideChanged(){
   let currentIndex = this.slider.getActiveIndex();
    this.slideName = this.slides[currentIndex];
 }
    
 return(){
   this.navCtrl.pop();
 }



 goToSlide(i) { 
    this.slider.slideTo(i, 500);  
  }

  openAuthor(){
    this.navCtrl.push(AuthorPage);
  }

  //not used for now
  showOptions(){
    if(!this.optionBarIsVisible){
        this.optionBarIsVisible = true;
        console.log("barr is: " + this.optionBarIsVisible);
    }
    else{
        this.optionBarIsVisible = false;
        console.log("bar is: " + this.optionBarIsVisible);
    }
    
  } 

  resetView(){
    this.presentationId = '';
    this.slides=[];
    this.slider.update();
  }


  //animations
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

  
  ionViewWillLeave(){
		this.optionBarIsVisible = false;
	}
  
}


