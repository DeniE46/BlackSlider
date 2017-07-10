import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailsProvider } from'../../providers/details-service/details-service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the TilesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public detailsProvider:DetailsProvider, public http:Http) {
    this.loadDetails();
    this.site = "http://slidle.com";
  }

   loadDetails(){
    this.detailsProvider.load()
    .then(data => {
        this.tiles = data;
        //deleting first element because it is null
        this.tiles.splice(0,1);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TilesPage');
  }

}
