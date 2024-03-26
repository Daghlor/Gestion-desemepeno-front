import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { FeedbackActionsService } from 'src/app/admin/services/feedback-actions.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { ConfirmModalComponent } from '../..';
import { MatDialog } from '@angular/material/dialog';

// ESTA ES LA LOGICA DEL COMPONENTE ACCIONES DE RETROALIMENTACION
@Component({
  selector: 'app-feeback-actions',
  templateUrl: './feeback-actions.component.html',
  styleUrls: ['./feeback-actions.component.scss']
})
export class FeebackActionsComponent implements OnInit {

  @ViewChild('titleInput') titleInput: any;

  // SE DEFINE VARIABLES A UTILIZAR
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  title: string = '';
  validateTime: any;
  validateTime2: any;
  titleButton: string = 'Crear';
  showList: boolean = false;
  showForm: boolean = false;
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
    columnDef: 'titles',
    header: 'Descripción',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.title}`,
  },{
    columnDef: 'icons',
    header: '',
    sort: true, // No necesitas que se pueda ordenar por esta columna
    type: 'icons',
    cell: (element: any) => element.icons,
  },];

  // SE INYECTAN SERVICIOS NECESARIOS
  constructor(
    private FeebackAPI: FeedbackActionsService,
    private snack: SnackbarService,
    private Local: LocalService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.findData();
  }

  // SE BUSCA LA INFO DEL USUARIO POR LA DATA LOCAL ACTUAL
  findData() {
   let userInfo = JSON.parse(this.Local.findDataLocal('info_user'));
   const paginate = {
    paginate: this.pageSize,
    page: this.actualPage,
    column: this.orderColumn || 'title',
    direction: this.orderType || 'asc',
     search: {
      user_id: userInfo.id,
      titles: this.title,
    }
  };

   this.FeebackAPI.FindAll(paginate).then((res: any) => {
     for (let i = 0; i < res.data.titles.length; i++){
       res.data.titles[i].icons = ['delete']
     }

     this.dataSource = new MatTableDataSource(res.data.titles);
     this.length = res.data.total;
  })

}

  changeSort(item:any){
    this.orderColumn = item.active;
    this.orderType = item.direction;
    this.findData();
  }

  changePaginator(info:any) {
    this.actualPage = info.pageIndex + 1;
    this.pageSize = info.pageSize;
    this.findData();
  }

// LOGICA DE LOS ICONOS PARA CADA CASO
 iconsFunction(event: any) {
  if (event.icon === 'delete') {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que quieres eliminar esta acción de retroalimentación?' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.FeebackAPI.Delete(event.data.unique_id).then((res: any) => {
          this.snack.viewsnack('La accion se elimino correctamente', 'Succes');
          this.findData();
        })
      }
    });
  }
}

 async saveData() {
    if (!this.title) {
      return this.snack.viewsnack('Hace Falta la descripcion', 'ERROR');
    }

    const data = {
      title: this.title
    };


   this.FeebackAPI.Create(data).then((res: any) => {
     this.snack.viewsnack(res.data.msg, 'success');
     this.findData();
      this.title = ''; // Establece el valor en una cadena vacía
      this.titleInput.nativeElement.value = '';
   });     // Limpiar el campo de título después de guardar los datos
  }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
