import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import * as fromContainers from "./pages/index";
import { MaterialModule } from 'src/assets/library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersTableComponent } from './pages/users/users-table/users-table.component';



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
    AdminRoutingModule
  ],
  exports: [
    ...fromContainers.AdminComponents,
  ]
})
export class AdminModule { }
