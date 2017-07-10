import { Component} from '@angular/core';
import { NavController, Platform  } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { SearchProvider } from '../../providers/search/search';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 
	searchTerm:string = '';
	searchControl:FormControl;
	presentations: any;
	searching:any = false; 
	


  constructor(public navCtrl: NavController, public searchProvider:SearchProvider, private platform: Platform) {
		this.searchControl = new FormControl();
	}
	
	checkPosition(i){
		console.log('position is ' + i);
	}


	ionViewDidLoad(){
		this.setFilteredItems();
		this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
			this.searching = false;
			this.setFilteredItems();
		})
	}

	setFilteredItems(){
		this.presentations = this.searchProvider.filterWorkSpaces(this.searchTerm);
	}

	onSearchInput(){
		this.searching = true;
	}

	openDetail(){
	  this.navCtrl.push(DetailPage);
  }
  }
  
  
  



