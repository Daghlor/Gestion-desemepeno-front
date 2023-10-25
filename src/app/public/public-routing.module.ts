import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as Pages from "./pages";

// ESTAS SON LAS RUTAS PUBLICAS QUE EL USUARIO PUEDE VER QUE NO REQUIERE UN LOGEO
const routes: Routes = [
  {
    path: "",
    component: Pages.LoginComponent,
  },
  {
    path:"registrarse",
    component: Pages.RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
