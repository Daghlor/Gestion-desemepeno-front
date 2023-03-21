import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import * as fromContainers from "./pages/index";
import { MaterialModule } from 'src/assets/library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { VerifyComponent } from './pages/users/verify/verify.component';

import {MatTableModule} from '@angular/material/table';
import { CustomPaginator } from '../config/matPaginador';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { StrategicObjectivesListComponent } from './pages/StrategicObjectives/strategic-objectives-list/strategic-objectives-list.component';
import { StrategicObjectivesFormComponent } from './pages/StrategicObjectives/strategic-objectives-form/strategic-objectives-form.component';
import { StrategicObjectivesAllComponent } from './pages/StrategicObjectives/strategic-objectives-all/strategic-objectives-all.component';
import { IndividualesObjectivesListComponent } from './pages/IndividualesObjectives/individuales-objectives-list/individuales-objectives-list.component';
import { IndividualesObjectivesAllComponent } from './pages/IndividualesObjectives/individuales-objectives-all/individuales-objectives-all.component';
import { IndividualesObjectivesFormComponent } from './pages/IndividualesObjectives/individuales-objectives-form/individuales-objectives-form.component';

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
    MatTableModule
  ],
  exports: [
    ...fromContainers.AdminComponents,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],
})
export class AdminModule { }
