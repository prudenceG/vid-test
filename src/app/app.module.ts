import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { SearchValueComponent } from './components/search-value/search-value.component';



@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    UserTableComponent,
    SearchValueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
