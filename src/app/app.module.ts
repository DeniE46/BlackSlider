import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { TilesPage } from '../pages/tiles/tiles';
import { WorkSpacesPage } from '../pages/work-spaces/work-spaces';
import { LogInPage } from '../pages/log-in/log-in';
import { DetailsProvider } from '../providers/details-service/details-service';
import { WorkSpacesProvider } from '../providers/work-spaces-service/work-spaces-service';
import { LogInServiceProvider } from '../providers/log-in-service/log-in-service';
import { AuthorPage } from'../pages/author/author';
import { WorkspaceIdProvider } from '../providers/workspace-id/workspace-id';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core'; 

@NgModule({
  declarations: [
    MyApp, 
    HomePage,
	DetailPage,
	TilesPage,
  WorkSpacesPage,
  LogInPage,
  AuthorPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule, 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	DetailPage,
	TilesPage,
  WorkSpacesPage,
  LogInPage,
  AuthorPage
  ],
  providers: [ 
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DetailsProvider,
    WorkSpacesProvider,
    LogInServiceProvider,
    WorkspaceIdProvider,
  ]
})
export class AppModule {}
