import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// MODULO DE RUTAS DE ANGULAR, POR DEFECTO ES ESTE PERO EL PROYECTO SE MANEJA POR PERMISOS DE VISTAS ASI QUE APUNTAN A DOS MODULOS 1 PUBLICO Y OTRO DE ADMIN

const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },

  {
    path: "",
    loadChildren:  () => import('./public/public.module').then(m => m.PublicModule),
  },
  {
    path: "admin",
    loadChildren:  () => import('./admin/admin.module').then(m => m.AdminModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
