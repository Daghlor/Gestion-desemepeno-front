import { Component, OnInit } from '@angular/core';
import { TrackingService } from 'src/app/admin/services/tracking.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

// ESTE ES EL .TS DONDE ESTA LA PARTE LOGICA DE LA VISTA TABLA DE SEGUIMIENTOS
@Component({
  selector: 'app-tracking-table',
  templateUrl: './tracking-table.component.html',
  styleUrls: ['./tracking-table.component.scss']
})
export class TrackingTableComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES Y MAQUETADO DE LA TABLA
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
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  // FUNCION QUE OBTIENE EL SEGUIMIENTO DE UN USUARIO Y LO PONE EN LA TABLA
  getData(){
    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.orderColumn || 'name',
      direction: this.orderType || 'asc',
      search: {
        nit: "",
        businessName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state_id: 1
      }
    }

    this.trackingAPI.FindAllUser(paginate).then((res:any)=>{
      for (let i = 0; i < res.data.users.length; i++) {
        res.data.users[i].icons = ['add']
      }

      this.dataSource = new MatTableDataSource(res.data.users);
      this.length = res.data.total;
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
      this.router.navigate(['admin/seguimiento/form/' + event.data.unique_id]);
    }
  }

}
