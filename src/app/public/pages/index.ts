import { RegisterComponent } from './register/register.component';
import { LoginComponent } from "./login/login.component";
import { VerifyComponent } from './verify/verify.component';


export const PublicComponents: any[] = [];

export const PublicPages: any[] = [
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
];

export * from "./login/login.component";
export * from "./register/register.component";
export * from "./verify/verify.component";
