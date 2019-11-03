

/// <reference path="../../../plugins/cordova-plugin-mfp/typings/worklight.d.ts" />

import { Injectable } from '@angular/core';
import { FileUploadOptions, FileTransferObject, FileTransfer } from '@ionic-native/file-transfer';

@Injectable()
export class TunisianCitiesDataProvider {
  data: any = null;
  objectStorageAccess: any = null;

  constructor() { //private transfer: FileTransfer
    console.log('--> TunisianCitiesDataProvider constructor() called');
  }

  load() {
    console.log('--> TunisianCitiesDataProvider loading data from adapter ...');
    return new Promise((resolve, reject) => {
      if (this.data) {
        return resolve(this.data);
      }
      this.data = [
        {
          "name": "Carthage",
          "picture": "Carthage.jpg",
          "description": "Close to the capital, a prestigious location and striking views: this is the introduction to the Coasts of Carthage, named after one of the most glorious ancient cities of the Mediterranean. Founded by the Phoenicians, destroyed then rebuilt by the Romans, Carthage is today a fashionable city."
        },
        {
          "name": "Mahdia",
          "picture": "Mahdia.jpg",
          "description": "Mahdia is small city which keeps its original traditions, where the women cover themselves with gold jewelry and the houses are decorated with embroidered hangings. Its monumental gateway calls back to its glorious past: it was the first capital of the great Fatimid dynasty, who would go on to reign in Egypt and Syria. Its medina stretches out along a narrow peninsula, surrounded by deep blue waters; its sumptuous beaches delight the tourists. A charming city with many faces."
        },
        {
          "name": "Tabarka",
          "picture": "Tabarka.jpg",
          "description": "Visitors choose Tabarka for its exceptional location, between the sea and the mountains. The beaches of golden sand are framed by rocky spurs and forests of pine and cork oak. The crystalline waters hide the precious red coral in its depths."
        },
        {
          "name": "Hammamet",
          "picture": "Hammamet.jpg",
          "description": "Hectic resort in summer, well known for its beaches and its party atmosphere, Hammamet is also a small city with an authentic charm. Turquoise waters, the scent of jasmine, white houses and stone walls gilded by the centuries…"
        },
    ];
    resolve(this.data);
      let dataRequest = new WLResourceRequest("/adapters/TunisianCities", WLResourceRequest.GET);
      dataRequest.send().then(
        (response) => {
          console.log('--> TunisianCitiesDataProvider loaded data from adapter\n', response);
          this.data = response.responseJSON;
          resolve(this.data);
        }, (failure) => {
          console.log('--> TunisianCitiesDataProvider failed to load data\n', JSON.stringify(failure));
          reject(failure);
        })
    });
  }

  getObjectStorageAccess() {
    return new Promise((resolve, reject) => {
      if (this.objectStorageAccess) {
        return resolve(this.objectStorageAccess);
      }
      let dataRequest = new WLResourceRequest("/adapters/TunisianCities/objectStorage", WLResourceRequest.GET);
      dataRequest.send().then(
        (response) => {
          this.objectStorageAccess = response.responseJSON;
          resolve(this.objectStorageAccess);
        }, (failure) => {
          console.log('--> TunisianCitiesDataProvider failed to get Object Storage AuthToken from adapter\n', JSON.stringify(failure));
          reject(failure);
        })
    });
  }
}
