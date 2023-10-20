import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { formdata, initValue } from '../profile.interface';
import { LocalStorage } from '../services/localstorage.service';
@Component({
  selector: 'app-newfrom',
  templateUrl: './newfrom.component.html',
  styleUrls: ['./newfrom.component.scss']
})
export class NewfromComponent implements OnInit {
  saveForm:formdata = new initValue();
  myform:FormGroup;
  subimtted: boolean = false;
  imgname:string = '';
  selectedFile:any;
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
        fileInput: new FormControl('',[Validators.required]),
        condition: new FormControl('',[Validators.required]),
        background: new FormControl('#FFFFFF',Validators.pattern(/^#[0-9A-Fa-f]{6}$/))
       })
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
  }
  onSubmit(){
    this.subimtted = true;
    if(this.myform.valid){
      console.log(this.myform.value);
      this.subimtted =  false;
      this.saveForm = {
        ...this.saveForm,
        ...this.myform.value,
        fileInput:this.imgname
      }
      this.localStorage.postData(this.saveForm,'adddata').subscribe(res=>{
         console.log(res);
         alert('Details saved successfuly');
         this.myform.reset(new initValue());
      })
    }else{
      alert('Please check all fileds first');
    }
  }
  fileseleceted(event:any){
    console.log('file selected');
    this.selectedFile = event.target.files[0];
  }
  uploadcsv(){
    const formData = new FormData();
    formData.append('csvFile', this.selectedFile, this.selectedFile.name);

    this.localStorage.updateCSVDATA(formData).subscribe((res)=>{
      console.log(res);
    })
  }
}
