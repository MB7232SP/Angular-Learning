import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategariesPage } from './categaries';

@NgModule({
  declarations: [
    CategariesPage,
  ],
  imports: [
    IonicPageModule.forChild(CategariesPage),
  ],
})
export class CategariesPageModule {}
