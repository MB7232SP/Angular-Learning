import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { NewfromComponent } from './newfrom/newfrom.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { AllformsComponent } from './allforms/allforms.component';
import { NavbaarComponent } from './navbaar/navbaar.component';
import { HttpClientModule } from '@angular/common/http';
import { EditFormComponent } from './edit-form/edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NewfromComponent,
    FormDetailsComponent,
    AllformsComponent,
    NavbaarComponent,
    EditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
