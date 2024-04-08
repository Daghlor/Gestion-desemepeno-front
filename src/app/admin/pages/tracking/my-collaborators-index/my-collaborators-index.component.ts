import { Component, OnInit } from '@angular/core';
import { TrackingService } from 'src/app/admin/services/tracking.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserHierarchyService } from '../../../services/user-hierarchy.service';

@Component({
  selector: 'app-my-collaborators-index',
  templateUrl: './my-collaborators-index.component.html',
  styleUrls: ['./my-collaborators-index.component.scss']
})
export class MyCollaboratorsIndexComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES Y MAQUETADO DE LA TABLA
  currentUser: any | null = null;
  loading: boolean = false;
  paginator: boolean = true;
  length: number = 0;
  orderColumn?: string;
  orderType?: string;
  actualPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 15, 20, 25, 50];
  dataSource: any = new MatTableDataSource();
  columns = [{
    columnDef: 'name',
    header: 'Nombres',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.name}`,
  },{
    columnDef: 'identify',
    header: 'Indentificación',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.identify}`,
  },{
    columnDef: 'email',
    header: 'Email',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.email}`,
  },{
    columnDef: 'icons',
    header: '',
    sort: true,
    type: 'icons',
    cell: (element: any) => `${element.icons}`,
  }];

  constructor(
    // SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
    private trackingAPI: TrackingService,
    private snack: SnackbarService,
    private Local: LocalService,
    private router: Router,
    private userHierarchy: UserHierarchyService,
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.getData();
  }

  loadCurrentUser() {
  // Recuperar los datos del usuario actualmente logeado desde el servicio LocalService
  const currentUserData = this.Local.findDataLocal('info_user');

  if (currentUserData) {
    // Si se encuentran datos, convertir la cadena JSON a un objeto JavaScript
    this.currentUser = JSON.parse(currentUserData);
    console.log('Datos del usuario actual:', this.currentUser); // Agregar console.log para verificar los datos del usuario
  } else {
    console.log('No se encontraron datos del usuario actual.');
  }
  }

  // FUNCION QUE OBTIENE EL SEGUIMIENTO DE UN USUARIO Y LO PONE EN LA TABLA
getData() {
  if (!this.currentUser || !this.currentUser.id) {
    console.error('No se pudo obtener el ID del usuario actual.');
    return;
  }

  const userId = this.currentUser.id;

  this.userHierarchy.finassignedUsers(userId).then((userHierarchies: any[]) => {
    // Mapear los datos recibidos para agregar los iconos y la información del usuario
    const usersWithIcons = userHierarchies.map((userHierarchy: any) => ({
      ...userHierarchy.user, // Agregar toda la información del usuario
      icons: ['add']
    }));

    this.dataSource = new MatTableDataSource(usersWithIcons);
    this.length = usersWithIcons.length;
  }).catch((error: any) => {
    console.error('Error al obtener seguimiento de usuarios:', error);
    // Manejar errores aquí
  });
}

  changeSort(item:any){
    this.orderColumn = item.active;
    this.orderType = item.direction;
    this.getData();
  }

  changePaginator(info:any) {
    this.actualPage = info.pageIndex + 1;
    this.pageSize = info.pageSize;
    this.getData();
  }

  redirectForm(url: string){
    this.snack.redirect(url);
  }

  iconsFunction(event: any){
    if(event.icon == 'add'){
      this.router.navigate(['admin/mis_colaboradores/form/' + event.data.unique_id]);
    }
  }
}
