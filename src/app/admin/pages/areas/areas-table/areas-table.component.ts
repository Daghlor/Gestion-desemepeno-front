import { AreasService } from '../../../services/areas.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/admin/components/confirm-modal/confirm-modal.component';

// ESTE ES EL .TS DE TABLAS DE AREAS DONDE ESTA LA PARTE LOGICA
@Component({
  selector: 'app-areas-table',
  templateUrl: './areas-table.component.html',
  styleUrls: ['./areas-table.component.scss']
})
export class AreasTableComponent implements OnInit {
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
    columnDef: 'description',
    header: 'Descripción Áreas',
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
    cell: (element: any) => `${element.company}`,
  },{
    columnDef: 'icons',
    header: '',
    sort: true,
    type: 'icons',
    cell: (element: any) => `${element.icons}`,
  }];

  constructor(
    // SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
    private AreasApi: AreasService,
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

  // FUNCION PARA OBTENER LAS AREAS Y ORGANIZALES EN LA TABLA
  getData(){
    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.orderColumn || 'description',
      direction: this.orderType || 'asc',
      search: {
        description: "",
        businessName: "",
      }
    }

    this.AreasApi.FindAll(paginate).then((res:any) => {
      for (let i = 0; i < res.data.areas.length; i++) {
        res.data.areas[i].icons = ['delete', 'edit']
      }

      this.dataSource = new MatTableDataSource(res.data.areas);
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

  iconsFunction(event: any){
    if(event.icon == 'edit'){
      this.router.navigate(['admin/areas/edit/' + event.data.unique_id]);
    }
    else if(event.icon == 'delete'){
      const dialogRef = this.dialog.open(ConfirmModalComponent, {

        width: '250px',
        data: { message: '¿Estás seguro de que quieres eliminar esta área?'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.AreasApi.Delete(event.data.unique_id).then((res:any)=>{
            this.snack.viewsnack('El área se elimino correctamente', 'Success');
            this.getData();
          })
        }
      });
    }
  }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
