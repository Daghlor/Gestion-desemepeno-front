import { RegisterComponent } from './register/register.component';
import { LoginComponent } from "./login/login.component";


export const PublicComponents: any[] = [];

export const PublicPages: any[] = [
    LoginComponent,
    RegisterComponent,
];

export * from "./login/login.component";
export * from "./register/register.component";
