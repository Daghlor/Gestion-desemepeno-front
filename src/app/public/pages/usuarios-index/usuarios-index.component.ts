import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmsModalComponent } from 'src/app/components/confirms-modal/confirms-modal.component';

@Component({
  selector: 'app-usuarios-index',
  templateUrl: './usuarios-index.component.html',
  styleUrls: ['./usuarios-index.component.scss']
})
export class UsuariosIndexComponent implements OnInit {
  pageSize: number = 10;
  dataSource = new MatTableDataSource();
  length: any;
  actualPage: any = 1;
  filterColumn!: string;
  filterType!: string;
  pageSizeOptions: number[] = [10, 15, 20, 25];
  columns = [{
      columnDef: 'name',
      header: 'Nombre',
      width: '12%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.name}`,
    },{
      columnDef: 'lastName',
      header: 'Apellido',
      width: '12%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.lastName}`,
    },{
      columnDef: 'unique_id',
      header: 'Identificación',
      width: '12%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.unique_id}`,
    },{
      columnDef: 'email',
      header: 'Email',
      width: '20%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.email}`,
    },{
      columnDef: 'phone',
      header: 'Telefono',
      width: '12%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.phone}`,
    },{
      columnDef: 'rol_descripcion',
      header: 'Rol',
      width: '12%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.rol_descripcion}`,
    },{
      columnDef: 'est_descripcion',
      header: 'Estado',
      width: '12%',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.est_descripcion}`,
    },{
      columnDef: 'icons',
      header: '',
      width: '15%',
      sort: false,
      type: 'icon',
      cell: (element: any) => `${element.icons}`,
    }
  ];
  constructor(
    private UsersAPI: UsersService,
    private snack: SnackbarService,
    private router: Router,
    private dialogCtrl: MatDialog
  ) { }

  ngOnInit(): void {

  }

}
