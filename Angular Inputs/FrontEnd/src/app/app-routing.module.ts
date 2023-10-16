import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewfromComponent } from './newfrom/newfrom.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { AllformsComponent } from './allforms/allforms.component';

const routes: Routes = [
{ path: '', component: NewfromComponent },
{ path: 'allforms', component: AllformsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
