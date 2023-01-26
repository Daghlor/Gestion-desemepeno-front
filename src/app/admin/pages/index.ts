import { LayoutComponent } from "../components/layout/layout.component";
import { CrearPDDComponent } from "./crear-pdd/crear-pdd.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmpleadosComponent } from "./usuarios/empleados/empleados.component";
import { SnackbarComponent } from '../../components/snackbar/snackbar/snackbar.component';
import { CompaniesFormComponent } from "./companies/companies-form/companies-form.component";
import { CompaniesTableComponent } from "./companies/companies-table/companies-table.component";

export const AdminComponents: any[] = [
    LayoutComponent,
];

export const AdminPages: any[] = [
    CrearPDDComponent,
    DashboardComponent,
    EmpleadosComponent,
    SnackbarComponent,
    CompaniesFormComponent,
    CompaniesTableComponent,
];

export * from "../components/layout/layout.component";
export * from "./crear-pdd/crear-pdd.component";
export * from "./dashboard/dashboard.component";
export * from "./usuarios/empleados/empleados.component";
export * from "../../components/snackbar/snackbar/snackbar.component";
export * from "./companies/companies-form/companies-form.component";
export * from "./companies/companies-table/companies-table.component";