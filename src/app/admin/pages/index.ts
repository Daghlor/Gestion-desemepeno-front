import { LayoutComponent } from "../components/layout/layout.component";
import { CrearPDDComponent } from "./crear-pdd/crear-pdd.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmpleadosComponent } from "./usuarios/empleados/empleados.component";

export const AdminComponents: any[] = [
    LayoutComponent,
];

export const AdminPages: any[] = [
    CrearPDDComponent,
    DashboardComponent,
    EmpleadosComponent
];

export * from "../components/layout/layout.component";
export * from "./crear-pdd/crear-pdd.component";
export * from "./dashboard/dashboard.component";
export * from "./usuarios/empleados/empleados.component";