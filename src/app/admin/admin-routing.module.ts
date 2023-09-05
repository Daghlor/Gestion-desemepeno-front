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
        path: "usuarios/form/:uuid/:type",
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
        path: "mis_seguimientos/:uuid",
        component: Pages.MyTrackingsComponent,
      },
      {
        path: "informes",
        component: Pages.InformesTableComponent,
      },
      {
        path: "informes_Grafica_5/:uuid",
        component: Pages.InformeChart5Component,
      },
      {
        path: "informes_Estrategicos/:uuid",
        component: Pages.InformeChart6Component,
      },
      {
        path: "informes_Grafica_1/:uuid",
        component: Pages.InformesChart1Component,
      },
      {
        path: "informes_Grafica_2/:uuid",
        component: Pages.InformesChart2Component,
      },
      {
        path: "informes_Grafica_3/:uuid",
        component: Pages.InformesChart3Component,
      },
      {
        path: "informes_Grafica_4/:uuid",
        component: Pages.InformesChart4Component,
      },
      {
        path: "objetivos_individuales/feeback_actions",
        component: Pages.FeebackActionsComponent,
      },
      {
        path: "objetivos_individuales/training_actions",
        component: Pages.TrainingActionsComponent,
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
