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
        path: "usuarios/form",
        component: Pages.UsersFormComponent,
      },
      {
        path: "usuarios/form/:uuid",
        component: Pages.UsersFormComponent,
      },
      {
        path: "objetivos_estrategicos/all",
        component: Pages.StrategicObjectivesAllComponent,
      },
      {
        path: "objetivos_estrategicos/form",
        component: Pages.StrategicObjectivesFormComponent,
      },
      {
        path: "objetivos_estrategicos/form/:uuid",
        component: Pages.StrategicObjectivesFormComponent,
      },
      {
        path: "objetivos_estrategicos",
        component: Pages.StrategicObjectivesListComponent,
      },

      {
        path: "objetivos_individuales/all",
        component: Pages.IndividualesObjectivesAllComponent,
      },
      {
        path: "objetivos_individuales/form",
        component: Pages.IndividualesObjectivesFormComponent,
      },
      {
        path: "objetivos_individuales/form/:uuid",
        component: Pages.IndividualesObjectivesFormComponent,
      },
      {
        path: "objetivos_individuales",
        component: Pages.IndividualesObjectivesListComponent,
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
