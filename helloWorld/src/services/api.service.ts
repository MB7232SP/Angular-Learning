import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { LoadingController } from "ionic-angular";
@Injectable()
export class ApiService{
    apikey:string = 'RF6v9K0Cr8bwHHYWDu08GbHUhbbJa6XLymDQPQ1fIZ88URKESNg2oOjm';
    loader:any;
   constructor(
    public http:HttpClient,
    public loadingCtrl: LoadingController
   ){};
  getData(endpoint):Observable<any>{
   const headers = new HttpHeaders({
        'Authorization': this.apikey
      });
    return this.http.get(endpoint,{ headers: headers });
  }
  getImage(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }
  dismisLoading(){
    this.loader.dismiss();
  }

}