import { CargosTableComponent } from './companies/cargos-table/cargos-table.component';
import { CargosFormComponent } from './companies/cargos-form/cargos-form.component';
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
import { AreasTableComponent } from "./companies/areas-table/areas-table.component";
import { AreasFormComponent } from "./companies/areas-form/areas-form.component";

export const AdminComponents: any[] = [
    LayoutComponent,
    MyTabsComponent,
    MyTableComponent
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
];

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
export * from "./companies/areas-form/areas-form.component";
export * from "./companies/areas-table/areas-table.component";
export * from "src/app/admin/pages/companies/cargos-form/cargos-form.component";
export * from "src/app/admin/pages/companies/cargos-table/cargos-table.component"
