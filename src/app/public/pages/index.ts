import { RegisterComponent } from './register/register.component';
import { LoginComponent } from "./login/login.component";
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar/snackbar.component';

// ESTE ES EL ARCHVIO .TYPESCRIPT QUE IMPORTA E EXPORTA LAS PAGINAS PUBLICAS


export const PublicComponents: any[] = [
    ///SnackbarComponent
];

export const PublicPages: any[] = [
    LoginComponent,
    RegisterComponent,
];

export * from "./login/login.component";
export * from "./register/register.component";
export * from 'src/app/components/snackbar/snackbar/snackbar.component';
