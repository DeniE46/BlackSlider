import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { LogInPage } from '../pages/log-in/log-in';
import { WorkSpacesPage } from '../pages/work-spaces/work-spaces';
import { LogInServiceProvider } from '../providers/log-in-service/log-in-service';
import { LoadingController } from 'ionic-angular';
import { WorkspaceIdProvider } from '../providers/workspace-id/workspace-id';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html',
  providers: [WorkspaceIdProvider]
})
export class MyApp {
  rootPage:any = TabsPage;
  loader:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public logIn:LogInServiceProvider, public loadingCtrl:LoadingController) {
    //this.presentLoading();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //this.checkUser();
     
     
    });
  }

  checkUser(){
     this.logIn.logIn().then((isLoggedIn)=>{
      if(isLoggedIn){
       this.rootPage = HomePage;
      }
      else{
       this.rootPage = LogInPage;
      }
      this.loader.dismiss();
      });
  }

   presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Authenticating...",
    });
    this.loader.present();
  }
}

