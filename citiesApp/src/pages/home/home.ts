import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ImgCacheService } from 'ng-imgcache';

import { TunisianCitiesDataProvider } from '../../providers/tunisian-cities/tunisian-cities';
import { AuthHandlerProvider } from '../../providers/auth-handler/auth-handler';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loader: any;
  cities: any;
  objectStorageAccess: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
    public tunisianCitiesDataProvider: TunisianCitiesDataProvider, public imgCache: ImgCacheService, private authHandler:AuthHandlerProvider) {
    console.log('--> HomePage constructor() called');
  }

  ionViewDidLoad() {
    console.log('--> HomePage ionViewDidLoad() called');
    this.loadData();
  }

  loadData() {
    this.loader = this.loadingCtrl.create({
      content: 'Loading data. Please wait ...',
    });
    this.loader.present().then(() => {
      this.tunisianCitiesDataProvider.load().then(data => {
        this.loader.dismiss();
        this.cities = data;
        console.log('--> data '+data);
      });
    });
  }
  

}
