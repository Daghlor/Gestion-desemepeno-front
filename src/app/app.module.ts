import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { libraries } from 'src/assets/library';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular'; // import the FullCalendar module!





// ESTE ES EL MODULO DEL PROYECTO DONDE SE IMPORTAN MODULOS TALES COMO GRAFICAS, FORMS, SERVICIOS HTTP ETC

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgxPermissionsModule.forRoot(),
    libraries,
    FullCalendarModule, // import FullCalendarModule and plugins
  ],
  providers: [
     { provide: NgChartsConfiguration, useValue: { generateColors: false }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
