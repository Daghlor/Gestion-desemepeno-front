import { LayoutComponent } from "../components/layout/layout.component";
import { CrearPDDComponent } from "./crear-pdd/crear-pdd.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SnackbarComponent } from '../../components/snackbar/snackbar/snackbar.component';
import { CompaniesFormComponent } from "./companies/companies-form/companies-form.component";
import { CompaniesTableComponent } from "./companies/companies-table/companies-table.component";
import { UsersFormComponent } from "./users/users-form/users-form.component";
import { UsersTableComponent } from "./users/users-table/users-table.component";
import { MyTabsComponent } from "src/app/components/my-tabs/my-tabs.component";
<<<<<<< HEAD
import { VerifyComponent } from "./users/verify/verify.component";
=======
import { MyTableComponent } from "src/app/components/my-table/my-table.component";
>>>>>>> 18e7733d555dffeda25f592b58e2fb37670cf55f

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
<<<<<<< HEAD
export * from "./users/verify/verify.component";
=======
export * from "src/app/components/my-table/my-table.component";
>>>>>>> 18e7733d555dffeda25f592b58e2fb37670cf55f
