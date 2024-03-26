import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import * as fromContainers from "./pages/index";
import { MaterialModule } from 'src/assets/library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { CustomPaginator } from '../config/matPaginador';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';



// MODULO DONDE SE IMPORTAN LAS LIBRERIAS Y LAS RUTAS
@NgModule({
  declarations: [
    ...fromContainers.AdminComponents,
    ...fromContainers.AdminPages,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatTableModule,
    ScrollingModule,
    FullCalendarModule,
  ],
  exports: [
    ...fromContainers.AdminComponents,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],
})
export class AdminModule { }

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
