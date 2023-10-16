import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../services/localstorage.service';
import { formdata, initValue } from '../profile.interface';

@Component({
  selector: 'app-allforms',
  templateUrl: './allforms.component.html',
  styleUrls: ['./allforms.component.scss']
})
export class AllformsComponent implements OnInit {
   edit:boolean = false;
   editProfile: any = new initValue();
   allprofils:any[] = [];
  constructor(private localStorage: LocalStorage) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.localStorage.getData().subscribe((res)=>{
      this.allprofils = res.data;
  })
  }
  SetEditModal(val:boolean){
    this.edit = val
  }
  DeleteUser(data:any){
     this.localStorage.deleteData(data._id).subscribe(res=>{
        alert('Profile deleted sucessfully');
        this.ngAfterViewInit();
     })
  }
  EditUser(data:any){
    this.editProfile = data;
    console.log(data);
   this.SetEditModal(true);
  }
  UserUpdated(){
      this.SetEditModal(false);
      this.ngAfterViewInit();
  }

}
