import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as Pages from "./pages";
import { AuthenticateGuard } from './components/guards/authenticate.guard';
import { AuthenticateVerifyGuard } from './components/guards/authenticate-verify.guard';
import { UserObjetivesComponent } from './pages/users/user-objetives/user-objetives.component';

// ESTAS SONS LAS RUTAS DE ADMIN O GENERALES DE TODO EL PROYECTO, QUE YA CON SE MANEJAN CON PERMISOS POR SU ROL ESPECIFICO
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
        path: "cargos/edit/:uuid",
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
<<<<<<< HEAD
        path: "usuarios/objetives/:uuid",
        component: Pages.UserObjetivesComponent,
=======
        path: "usuarios/form/:uuid/:type",
        component: Pages.UsersFormComponent,
>>>>>>> 7bc3cd423ae2f038cbcff279266ef65c1f572b24
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
        path: "performance_plans",
        component: Pages.PerformancePlansListComponent,
      },
      {
        path: "performance_plans/form",
        component: Pages.PerformancePlansFormComponent,
      },
      {
        path: "seguimiento",
        component: Pages.TrackingTableComponent,
      },
      {
        path: "seguimiento/form/:uuid",
        component: Pages.TrackingFormComponent,
      },
      {
        path: "informes",
        component: Pages.InformesTableComponent,
      },
      {
        path: "informes/chart/:unique_id",
        component: Pages.InformesChartsComponent,
      },
      {
        path: "verificacion",
        component: Pages.VerifyComponent,
        canActivate: [AuthenticateVerifyGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
