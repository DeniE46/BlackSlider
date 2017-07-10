import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {

  public test : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.test = "TEST";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
  }

  

}
