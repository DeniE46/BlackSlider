import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPageModule } from '../pages/detail/detail.module';
import { TilesPageModule } from '../pages/tiles/tiles.module';
import { WorkSpacesPageModule } from '../pages/work-spaces/work-spaces.module';
import { LogInPageModule } from '../pages/log-in/log-in.module';
import { DetailsProvider } from '../providers/details-service/details-service';
import { WorkSpacesProvider } from '../providers/work-spaces-service/work-spaces-service';
import { LogInServiceProvider } from '../providers/log-in-service/log-in-service';
import { AuthorPageModule } from'../pages/author/author.module';
import { WorkspaceIdProvider } from '../providers/workspace-id/workspace-id';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { PresentationIdProvider } from '../providers/presentation-id/presentation-id';
import { AuthorProvider } from '../providers/author/author';
import { FeaturedServiceProvider } from '../providers/featured-service/featured-service';
import { OrientationServiceProvider } from '../providers/orientation-service/orientation-service';

@NgModule({
  declarations: [
    MyApp, 
    HomePage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule, 
    AuthorPageModule,
    DetailPageModule,
    LogInPageModule,
    TilesPageModule,
    WorkSpacesPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [ 
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DetailsProvider,
    WorkSpacesProvider,
    LogInServiceProvider,
    WorkspaceIdProvider,
    PresentationIdProvider,
    AuthorProvider,
    FeaturedServiceProvider,
    OrientationServiceProvider,
  ]
})
export class AppModule {}
