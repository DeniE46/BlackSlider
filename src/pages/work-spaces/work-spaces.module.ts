import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkSpacesPage } from './work-spaces';

@NgModule({
  declarations: [
    WorkSpacesPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkSpacesPage),
  ],
  exports: [
    WorkSpacesPage
  ]
})
export class WorkSpacesPageModule {}
