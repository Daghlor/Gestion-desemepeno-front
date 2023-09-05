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
import { InformesChart1Component } from './pages/informes/informes-chart1/informes-chart1.component';
import { InformesChart2Component } from './pages/informes/informes-chart2/informes-chart2.component';
import { InformesChart3Component } from './pages/informes/informes-chart3/informes-chart3.component';
import { InformesChart4Component } from './pages/informes/informes-chart4/informes-chart4.component';



// MODULO DONDE SE IMPORTAN LAS LIBRERIAS Y LAS RUTAS
@NgModule({
  declarations: [
    ...fromContainers.AdminComponents,
    ...fromContainers.AdminPages,
    InformesChart1Component,
    InformesChart2Component,
    InformesChart3Component,
    InformesChart4Component,
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
  ],
  exports: [
    ...fromContainers.AdminComponents,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],
})
export class AdminModule { }
