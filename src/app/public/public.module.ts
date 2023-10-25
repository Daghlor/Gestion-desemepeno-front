import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponents, PublicPages } from './pages';
import { libraries } from 'src/assets/library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import * as fromContainers from "./pages/index";

// AQUI SE IMPORTAN LIBRERIAS Y LAS RUTAS PUBLICAS
@NgModule({
    declarations: [
       ...fromContainers.PublicPages,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        PublicRoutingModule,
        libraries,
  ],
  exports: [
      ...fromContainers.PublicPages
    ]
})
export class PublicModule { }

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
