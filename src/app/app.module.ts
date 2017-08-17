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
import { NotesPage } from '../pages/notes/notes';
import { WorkSpacesPage } from '../pages/work-spaces/work-spaces';
import { LogInPage } from '../pages/log-in/log-in';
import { DetailsProvider } from '../providers/details-service/details-service';
import { SearchProvider } from '../providers/search/search';
import { WorkSpacesProvider } from '../providers/work-spaces-service/work-spaces-service';
import { LogInServiceProvider } from '../providers/log-in-service/log-in-service';
import { Storage } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp, 
    HomePage,
	DetailPage,
	TilesPage,
	NotesPage,
  WorkSpacesPage,
  LogInPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	DetailPage,
	TilesPage,
	NotesPage,
  WorkSpacesPage,
  LogInPage
  ],
  providers: [ 
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DetailsProvider,
    SearchProvider,
    WorkSpacesProvider,
    LogInServiceProvider,
  ]
})
export class AppModule {}
