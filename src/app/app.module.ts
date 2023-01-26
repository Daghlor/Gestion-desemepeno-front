import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmsModalComponent } from './components/confirms-modal/confirms-modal.component';
import { libraries } from 'src/assets/library';
import { MyTableComponent } from "../assets/components/my-table/my-table/my-table.component";


@NgModule({
  declarations: [
    AppComponent,
    ConfirmsModalComponent,
    MyTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    libraries,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
