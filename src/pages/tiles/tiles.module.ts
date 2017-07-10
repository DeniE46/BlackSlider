import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TilesPage } from './tiles';

@NgModule({
  declarations: [
    TilesPage,
  ],
  imports: [
    IonicPageModule.forChild(TilesPage),
  ],
  exports: [
    TilesPage
  ]
})
export class TilesPageModule {}
