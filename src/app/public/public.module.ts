import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponents, PublicPages } from './pages';
import { MaterialModule } from 'src/assets/library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { UsuariosIndexComponent } from './pages/usuarios-index/usuarios-index.component';

@NgModule({
  declarations: [
    PublicComponents, 
    PublicPages, RegisterComponent, UsuariosIndexComponent,
   
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
