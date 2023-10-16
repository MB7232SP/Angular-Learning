
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root' // Register the service at the root level
  })
export class LocalStorage{
    endpont: string = "http://localhost:3000";
    constructor(public http: HttpClient){
    }
    postData(data:any,route:string): Observable<any>{
         return this.http.post(`${this.endpont}/${route}`,data);
    }
    deleteData(id:string): Observable<any>{
      return this.http.delete(`${this.endpont}/delete/${id}`);
    }
    getData():  Observable<any>{
        return this.http.get(`${this.endpont}/alldata`);
    }
    updateData(data:any):  Observable<any>{
      return this.http.patch(`${this.endpont}/update`,data);
  }
}