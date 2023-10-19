import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategariesPage } from '../categaries/categaries';
import { HomepagePage } from '../homepage/homepage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hompage: any;
  cate: any
  constructor(public navCtrl: NavController) {
    this.hompage = HomepagePage;
    this.cate = CategariesPage;
  }
}
