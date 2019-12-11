import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MainFormComponent } from './main-form/main-form.component';
import { M2bRestAutocompleteComponent } from './m2b-rest-autocomplete/m2b-rest-autocomplete.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, MainFormComponent, M2bRestAutocompleteComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
