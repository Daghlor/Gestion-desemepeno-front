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
    this.getAll();
  }
  getAll(){
    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.filterColumn || 'name',
      direction: this.filterType || 'asc'
    }
    this.UsersAPI.getAllUsers(paginate).then((res:any)=>{
      for (let i =0; i< res.data.lenght; i ++){
        res.data[i].icons={
          edit: res.data[i].state_id == 1 ? true : false,
          delete: res.data[i].state_id == 1 ? true: false,
          historial: res.data[i].state_id == 2 ? true: false
        }
      }
      this.dataSource = new MatTableDataSource(res.data)
      this.length = res.total;
    })
  }

  changeSort(item:any){
    this.filterColumn = item.active;
    this.filterType = item.direction;
    this.getAll();
  }

  changePaginator(info:any){
    this.actualPage = info.pageIndex + 1;
    this.filterType = info.pageSize;
    this.getAll();
  }

  deleteItems(item:any){
    const dialogRef = this.dialogCtrl.open(ConfirmsModalComponent, {
      width: '25%',
      data: {
        title: 'Eliminar Usuario',
        message: `¿Seguro que desea eliminiar la cuenta del usuario ${item.name} ${item.lastName}?`,
        type: 1
      },
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result){this.deleteUser(item.unique_id);}
    });
  }
  deleteUser(iden:any){
    this.UsersAPI.deleteUser(iden).then((res:any)=>{
      this.snack.viewsnack('Se elimino el usuario correctamente', 'Success');
      this.getAll();
    })
  }
}
