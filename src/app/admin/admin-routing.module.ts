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
        path: "usuarios",
        component: Pages.UsersTableComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
