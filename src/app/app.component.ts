import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { LogInPage } from '../pages/log-in/log-in';
import { WorkSpacesPage } from '../pages/work-spaces/work-spaces';
import { LoadingController } from 'ionic-angular';
import { WorkspaceIdProvider } from '../providers/workspace-id/workspace-id';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from '../providers/auth/auth'; 

@Component({
  templateUrl: 'app.html',
  providers: [WorkspaceIdProvider]
})
export class MyApp {
  rootPage:any;
  loader:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public logIn:AuthProvider, public loadingCtrl:LoadingController, public zone:NgZone) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.presentLoading();
      this.checkUser();
     
     
    });

  }

  checkUser(){
     this.logIn.logIn().then((isLoggedIn)=>{
      if(isLoggedIn){
       this.rootPage = TabsPage;
      }
      else{
       this.rootPage = LogInPage;
      }
      this.zone.run(()=>{
				setTimeout(() => {
					
					this.loader.dismiss();
				}, 1000);
			})
      });
  }

   presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Authenticating...",
      duration: 2000
    });
    this.loader.present();
  }
}

