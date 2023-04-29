import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/admin/services/users.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { ConfirmModalComponent } from 'src/app/admin/components/confirm-modal/confirm-modal.component';
import { LocalService } from 'src/app/config/local.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
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
    columnDef: 'lastName',
    header: 'Apellidos',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.lastName}`,
  },{
    columnDef: 'identify',
    header: 'Identificación',
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
    columnDef: 'phone',
    header: 'Teléfono',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.phone}`,
  },{
    columnDef: 'address',
    header: 'Dirección',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.address}`,
  },{
    columnDef: 'city',
    header: 'Ciudad',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.city}`,
  },{
    columnDef: 'state',
    header: 'Estado',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.state}`,
  },{
    columnDef: 'icons',
    header: '',
    sort: true,
    type: 'icons',
    cell: (element: any) => `${element.icons}`,
  }];

  constructor(
    private userApi: UsersService,
    private router: Router,
    private snack: SnackbarService,
    private dialog: MatDialog,
    private Local: LocalService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  validatePermissions(code: string): Boolean {
    return this.Local.validatePermission(code) ? true : false;
  }

  getData(){
    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.orderColumn || 'name',
      direction: this.orderType || 'asc',
      search: {
        nit: "",
        companie_id: this.validatePermissions('get_all_data') ? '' : JSON.parse(this.Local.findDataLocal('info_company')).id,
        phone: "",
        email: "",
        address: "",
        city: "",
        state_id: 1
      }
    }

    this.userApi.FindAll(paginate).then((res:any)=>{
      for (let i = 0; i < res.data.users.length; i++) {
        res.data.users[i].icons = [];
        if(this.validatePermissions('delete_users')){
          res.data.users[i].icons.push('delete');
        }
        if(this.validatePermissions('update_users')){
          res.data.users[i].icons.push('edit');
        }
      }

      this.dataSource = new MatTableDataSource(res.data.users);
      this.length = res.data.total;

    })

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
    if(event.icon == 'edit'){
      this.router.navigate(['admin/usuarios/form/' + event.data.unique_id]);
    }
    else if(event.icon == 'delete'){
      const dialogRef = this.dialog.open(ConfirmModalComponent, {

        width: '250px',
        data: { message: '¿Estás seguro de que quieres eliminar este usuario?'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.userApi.Delete(event.data.unique_id).then((res:any)=>{
            this.snack.viewsnack('El usuario se elimino correctamente', 'Success');
            this.getData();
          })
        }
      });

    }
  }

}
