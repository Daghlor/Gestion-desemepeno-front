import { MatDialog } from '@angular/material/dialog';
import { EmploymentsService } from '../../../services/employments.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { ConfirmModalComponent } from '../..';

// ESTE ES EL .TS DE LA TABLA DE CARGOS DONDE ESTA LA PARTE LOGICA
@Component({
  selector: 'app-cargos-table',
  templateUrl: './cargos-table.component.html',
  styleUrls: ['./cargos-table.component.scss']
})
export class CargosTableComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES Y EL MAQUETADO DE LA TABLA
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
    columnDef: 'description',
    header: 'Descripcion Cargos',
    width: '10%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.description}`,
  },{
    columnDef: 'businessName',
    header: 'Empresa',
    width: '10%',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.company_name}`,
  },{
    columnDef: 'icons',
    header:'',
    sort: true,
    type: 'icons',
    cell:(element:any) => `${element.icons}`
  }
];

  constructor(
    // SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
    private CargosApi: EmploymentsService,
    private router: Router,
    private snack: SnackbarService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  redirectForm(url: string){
    this.snack.redirect(url);
  }

  // FUNCION QUE OBTIENE TODOS LOS CARGOS REGISTRADOS Y LOS ORGANIZA EN LA TABLA
  getData(): void{
    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.orderColumn || 'description',
      direction: this.orderType || 'asc',
      search:{
        description: "",
        businessName: "",
      }
    }

    this.CargosApi.FindAll(paginate).then((res:any)=>{
      for(let i = 0; i < res.data.employments.length; i++){
        res.data.employments[i].icons = ['delete','edit']
      }

      this.dataSource = new MatTableDataSource(res.data.employments);
      this.length = res.data.total;
    })
  }

  changeSort(item:any){
    this.orderColumn = item.active;
    this.orderType = item.direction;
    this.getData();
  }

  changePaginator(info:any){
    this.actualPage = info.pageIndex + 1;
    this.pageSize = info.pageSize;
    this.getData();
  }

  iconsFunction(event:any){
    if(event.icon == 'edit'){
      this.router.navigate(['admin/cargos/edit/' + event.data.unique_id]);
    }
  }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta


