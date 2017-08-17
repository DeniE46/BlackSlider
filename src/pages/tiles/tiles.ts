import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailsProvider } from'../../providers/details-service/details-service';
import { DetailPage } from '../detail/detail';
import { Events } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the TilesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation
 */
@IonicPage()
@Component({
  selector: 'page-tiles',
  templateUrl: 'tiles.html',
  providers: [DetailsProvider],
})
export class TilesPage {


public tiles:any;
public site:string;
detailPage: DetailPage;
tileId:any;
calledFromTiles:true;
rows:any;
indexPos:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public detailsProvider:DetailsProvider, public http:Http, public events:Events) {
    this.site = "http://slidle.com";
    this.getDetailsTiles();
  }

  getDetailsTiles(){
    this.rows = this.navParams.get('rows');
    console.log("in tiles.ts rows" + this.rows);
    this.tiles = this.navParams.get('tiles');
    console.log("in tiles.ts tiles" + this.tiles); 
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TilesPage');
  }

  openDetails(){
    let data = {tiles:this.tiles, id:this.tileId, caller:this.calledFromTiles}
    
  }

  calculatePos(i, j){
    console.log("col: " + i + "row:" + j);
    //this.indexPos = (j*3+i)+1;
    this.indexPos = j*3+i;
    console.log("position is:" + this.indexPos);
    this.events.publish('tileID:set', this.indexPos);
    this.navCtrl.pop();
  }

}
