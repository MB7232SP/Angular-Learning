import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../services/api.service';
// import { ApiService } from '../../services/api.service';

/**
 * Generated class for the HomepagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html',
})
export class HomepagePage {
  searchParam:String ='';
  apiurl:string = 'https://api.pexels.com/v1/curated?page=1&per_page=40'
  Images:any[] = [];
  next:boolean = false;
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public apicall: ApiService,
     ) {
  }
  ionViewDidEnter() {
    this.apicall.presentLoading();
    this.apicall.getData(this.apiurl).subscribe(res=>{
      if(this.next){
        this.Images = [...this.Images,...res.photos];
        this.apiurl = res.next_page;
        this.next = false;
      }else{
        this.Images = res.photos;
        this.apiurl = res.next_page;
      }
      this.apicall.dismisLoading();
    })
  }
  SarchData(){
    console.log(this.searchParam)
    if(this.searchParam===''){
      this.apiurl = "https://api.pexels.com/v1/curated?page=1&per_page=40";  
    }else{
      this.apiurl = `https://api.pexels.com/v1/search?query=${this.searchParam}&page=1&per_page=40`;
    }
    this.ionViewDidEnter();
  }
  showMore(){
    this.next = true;
    this.ionViewDidEnter();
  }
  ionViewDidLeave(){
    this.Images = [];
    this.apiurl = 'https://api.pexels.com/v1/curated?page=1&per_page=40';
  }
}
