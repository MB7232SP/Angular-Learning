import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { formdata, initValue } from '../profile.interface';
import { LocalStorage } from '../services/localstorage.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  @Input() editProfile:any;
  myform:FormGroup;
  subimtted: boolean = false;
  imgname:string = '';
  @Output() UserUpdated =  new EventEmitter<any>();
  @Output() closeModal =  new EventEmitter<any>();
  constructor(public frombuilder:FormBuilder, private localStorage: LocalStorage) {
       this.myform = this.frombuilder.group({
        name:new FormControl('',[Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('',[Validators.required, Validators.minLength(8)]),
        mobile: new FormControl('',[Validators.required, Validators.minLength(10)]),
        rangeInput: new FormControl(1),
        fav_game: new FormControl('',[Validators.required]),
        gender: new FormControl('',[Validators.required]),
        textArea: new FormControl('',[Validators.required]),
        color: new FormControl('#000000',Validators.pattern(/^#[0-9A-Fa-f]{6}$/)),
        fileInput: new FormControl(''),
        condition: new FormControl(true,[Validators.required]),
        background: new FormControl('#FFFFFF',Validators.pattern(/^#[0-9A-Fa-f]{6}$/))
       })
       console.log(this.editProfile);
   }
   onFileSelected(event: any) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      this.localStorage.postData(formData,'upload').subscribe(res=>{
        console.log(res);
        this.imgname = res.imageUrl;
      })
  }

  ngOnInit(): void {
    let resetObj = {...this.editProfile};
    delete resetObj.fileInput;
    console.log(resetObj);
    this.myform.reset(resetObj);
  }
  ngAfterViewInit(){
  }
  onSubmit(){
    this.subimtted = true;
    if(this.myform.valid && this.myform.value.condition){
      this.subimtted =  false;
      const updateddata = {
        ...this.editProfile,
        ...this.myform.value
      }
      if(this.imgname!=""){
        this.editProfile.fileInput = this.imgname
      }else{
        updateddata.fileInput = this.editProfile.fileInput
      }

      this.localStorage.updateData(updateddata).subscribe((res)=>{
        alert('data updated successfully');
        this.UserUpdated.emit();
      })
    }else{
      alert('Please check all fileds first');
    }
  }
  CloseEditModal(){
    this.closeModal.emit();
  }
}

