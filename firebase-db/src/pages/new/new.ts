import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Alert} from 'ionic-angular/index';

/*
  Generated class for the New page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new',
  templateUrl: 'new.html'
})
export class NewPage {

  song = {title: null, agenda: null};

  constructor(private navCtrl:NavController, public navParams:NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPage');
  }
}
