import { CargosTableComponent } from './pages/companies/cargos-table/cargos-table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as Pages from "./pages";

const routes: Routes = [
  {
    path: "",
    component: Pages.LayoutComponent,
    children: [
      {
        path: "",
        component: Pages.DashboardComponent,
      },
      {
        path: "empresas",
        component: Pages.CompaniesTableComponent,
      },
      {
        path: "empresas/form",
        component: Pages.CompaniesFormComponent,
      },
      {
        path: "empresas/edit/:uuid",
        component: Pages.CompaniesFormComponent,
      },
      {
        path: "areas",
        component: Pages.AreasTableComponent,
      },
      {
        path: "areas/form",
        component: Pages.AreasFormComponent,
      },
      {
        path: "areas/edit/:uuid",
        component: Pages.AreasFormComponent,
      },
      {
        path: "cargos",
        component: Pages.CargosTableComponent,
      },
      {
        path: "cargos/form",
        component: Pages.CargosFormComponent,
      },
      {
        path: "cargos/form/:uuid",
        component: Pages.CargosFormComponent,
      },
      {
        path: "usuarios",
        component: Pages.UsersTableComponent,
      },
      {
        path: "verificacion",
        component: Pages.VerifyComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
