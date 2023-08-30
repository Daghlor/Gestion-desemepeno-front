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
import { MyTrackingsComponent } from './pages/tracking/my-trackings/my-trackings.component';



// MODULO DONDE SE IMPORTAN LAS LIBRERIAS Y LAS RUTAS
@NgModule({
  declarations: [
    ...fromContainers.AdminComponents,
    ...fromContainers.AdminPages,
    MyTrackingsComponent,
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
