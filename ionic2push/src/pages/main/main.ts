import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from 'ionic-native';

import { ItemsPage } from '../items/items';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  userName : string;

  constructor(private nav : NavController) {
    Facebook.login(['email']).then((response:FacebookLoginResponse) => {
      Facebook.getAccessToken().then((v) => {
        Facebook.api("/me?fields=id%2Cname&access_token="+v, ['public_profile'])
        .then((profile) => {
            this.userName = profile.name;
          });
      });
    });
  }

  public addItem() {
    alert('Yuppee an item to be added 3 !');
  }

  public items() {
    this.nav.push(ItemsPage);
  }
};
