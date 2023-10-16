import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent implements OnInit {
  @Input() user:any = {};
  @Output() DeleteUser =  new EventEmitter<any>();
  @Output() EditUser =  new EventEmitter<any>();
  constructor() { }
  ngOnInit(): void {
  }
  Delete(){
    this.DeleteUser.emit(this.user)
  }
  Edit(){
    this.EditUser.emit(this.user);
  }

}
