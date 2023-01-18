import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { libraries } from 'src/assets/library';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    PublicModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    libraries
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
