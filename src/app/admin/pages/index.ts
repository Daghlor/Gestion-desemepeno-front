import { CargosTableComponent } from './cargos/cargos-table/cargos-table.component';
import { CargosFormComponent } from './cargos/cargos-form/cargos-form.component';
import { LayoutComponent } from "../components/layout/layout.component";
import { CrearPDDComponent } from "./crear-pdd/crear-pdd.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SnackbarComponent } from '../../components/snackbar/snackbar/snackbar.component';
import { CompaniesFormComponent } from "./companies/companies-form/companies-form.component";
import { CompaniesTableComponent } from "./companies/companies-table/companies-table.component";
import { UsersFormComponent } from "./users/users-form/users-form.component";
import { UsersTableComponent } from "./users/users-table/users-table.component";
import { MyTabsComponent } from "src/app/components/my-tabs/my-tabs.component";
import { VerifyComponent } from "./users/verify/verify.component";
import { MyTableComponent } from "src/app/components/my-table/my-table.component";
import { AreasTableComponent } from "./areas/areas-table/areas-table.component";
import { AreasFormComponent } from "./areas/areas-form/areas-form.component";
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { StrategicObjectivesListComponent } from './StrategicObjectives/strategic-objectives-list/strategic-objectives-list.component';
import { StrategicObjectivesFormComponent } from './StrategicObjectives/strategic-objectives-form/strategic-objectives-form.component';
import { StrategicObjectivesAllComponent } from './StrategicObjectives/strategic-objectives-all/strategic-objectives-all.component';
import { IndividualesObjectivesListComponent } from './IndividualesObjectives/individuales-objectives-list/individuales-objectives-list.component';
import { IndividualesObjectivesAllComponent } from './IndividualesObjectives/individuales-objectives-all/individuales-objectives-all.component';
import { IndividualesObjectivesFormComponent } from './IndividualesObjectives/individuales-objectives-form/individuales-objectives-form.component';
import { TrackingTableComponent } from './tracking/tracking-table/tracking-table.component';
import { TrackingFormComponent } from './tracking/tracking-form/tracking-form.component';
import { TracingsComponent } from '../components/tracings/tracings.component';
import { InformesTableComponent } from './informes/informes-table/informes-table.component';
import { InformesChartsComponent } from './informes/informes-charts/informes-charts.component';
import { PerformancePlansListComponent } from './performancePlans/performance-plans-list/performance-plans-list.component';
import { PerformancePlansFormComponent } from './performancePlans/performance-plans-form/performance-plans-form.component';

// AQUI SE IMPORTAN LOS COMPONENTES DE TODOS LAS VISTAS DEL SISTEMA Y SE EXPORTAN
export const AdminComponents: any[] = [
    LayoutComponent,
    MyTabsComponent,
    MyTableComponent,
    ConfirmModalComponent,
    TracingsComponent,
];

export const AdminPages: any[] = [
    CrearPDDComponent,
    DashboardComponent,
    SnackbarComponent,
    CompaniesFormComponent,
    CompaniesTableComponent,
    UsersFormComponent,
    UsersTableComponent,
    VerifyComponent,
    AreasTableComponent,
    AreasFormComponent,
    CargosFormComponent,
    CargosTableComponent,
    VerifyComponent,
    StrategicObjectivesListComponent,
    StrategicObjectivesFormComponent,
    StrategicObjectivesAllComponent,
    IndividualesObjectivesListComponent,
    IndividualesObjectivesAllComponent,
    IndividualesObjectivesFormComponent,
    TrackingTableComponent,
    TrackingFormComponent,
    InformesTableComponent,
    InformesChartsComponent,
    PerformancePlansListComponent,
    PerformancePlansFormComponent,
];

export * from './performancePlans/performance-plans-list/performance-plans-list.component';
export * from './performancePlans/performance-plans-form/performance-plans-form.component';
export * from '../components/tracings/tracings.component';
export * from "../components/layout/layout.component";
export * from "./crear-pdd/crear-pdd.component";
export * from "./dashboard/dashboard.component";
export * from "../../components/snackbar/snackbar/snackbar.component";
export * from "./companies/companies-form/companies-form.component";
export * from "./companies/companies-table/companies-table.component";
export * from "./users/users-form/users-form.component";
export * from "./users/users-table/users-table.component";
export * from "src/app/components/my-tabs/my-tabs.component";
export * from "./users/verify/verify.component";
export * from "src/app/components/my-table/my-table.component";
export * from "./areas/areas-form/areas-form.component";
export * from "./areas/areas-table/areas-table.component";
export * from "./cargos/cargos-form/cargos-form.component";
export * from "./cargos/cargos-table/cargos-table.component"
export * from '../components/confirm-modal/confirm-modal.component';
export * from './StrategicObjectives/strategic-objectives-list/strategic-objectives-list.component';
export * from './StrategicObjectives/strategic-objectives-form/strategic-objectives-form.component';
export * from './StrategicObjectives/strategic-objectives-all/strategic-objectives-all.component';
export * from './IndividualesObjectives/individuales-objectives-list/individuales-objectives-list.component';
export * from './IndividualesObjectives/individuales-objectives-all/individuales-objectives-all.component';
export * from './IndividualesObjectives/individuales-objectives-form/individuales-objectives-form.component';
export * from './tracking/tracking-table/tracking-table.component';
export * from './tracking/tracking-form/tracking-form.component';
export * from './informes/informes-table/informes-table.component';
export * from './informes/informes-charts/informes-charts.component';

