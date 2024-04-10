import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingActionsService } from 'src/app/admin/services/training-actions.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { ConfirmModalComponent } from '../..';
import { LocalService } from 'src/app/config/local.service';
import { MatMenuModule } from '@angular/material/menu';


// ESTA ES LA LOGICA DEL COMPONENTE DE ACCIONES DE FORMACION
@Component({
  selector: 'app-training-actions',
  templateUrl: './training-actions.component.html',
  styleUrls: ['./training-actions.component.scss']
})
export class TrainingActionsComponent implements OnInit {

  // SE DEFINE VARIABLES A UTILIZAR
  @ViewChild('titleInput') titleInput: any;

  startDate: Date = new Date();
  endDate: Date = new Date();

  statedescription: string = '';
  title: string = '';
  loading: boolean = false;
  paginator: boolean = true;
  length: number = 0;
  orderColumn?: string;
  orderType?: string;
  actualPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 15, 20, 25, 50];
  dataSource: any = new MatTableDataSource();
  columns = [
  {
    columnDef: 'titles',
    header: 'Descripción',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.title}`,
  },
  {
    columnDef: 'startdate',
    header: 'Fecha de inicio',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.start_date}`,
  },
  {
    columnDef: 'enddate',
    header: 'Fecha de cierre',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.end_date}`,
    },
  {
    columnDef: 'statedescription',
    header: 'Estado',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.stateDescription}`,
  },
  {
    columnDef: 'icons',
    header: '',
    sort: true,
    type: 'icons',
    cell: (element: any) => element.icons,
  },
];


  // SE INYECTAN LOS SERVICIOS NECESARIOS
  constructor(
    private TrainingAPI: TrainingActionsService,
    private snack: SnackbarService,
    private dialog: MatDialog,
    private Local: LocalService,
  ) { }

  ngOnInit(): void {
    this.startDate = new Date();
    this.endDate = new Date();
    this.findData();
  }

  // FUNCION PARA BUSCAR LA DATAL LOCAL DEL USUARIO LOGEADO
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
        stateDescription: this.statedescription,
        start_date: this.formatDate(this.startDate), // Agregar la fecha de inicio
        end_date: this.formatDate(this.endDate),
      }
    };

    this.TrainingAPI.FindAll(paginate).then((res: any) => {
      for (let i = 0; i < res.data.trainings.length; i++){
        res.data.trainings[i].icons = ['delete']
      }

      this.dataSource = new MatTableDataSource(res.data.trainings);
      this.length = res.data.total;
    })
  }

  redirectForm(url: string){
    this.snack.redirect(url);
  }

  changeSort(item: any) {
    this.orderColumn = item.active;
    this.orderType = item.direction;
    this.findData();
  }

  changePaginator(info: any) {
    this.actualPage = info.pageIndex + 1;
    this.pageSize = info.pageSize;
    this.findData();
  }

  // FUNCION DE LOGICA DE LOS ICONOS PARA CADA USO
  iconsFunction(event: any) {
    if (event.icon === 'delete') {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '250px',
        data: { message: '¿Estás seguro de que quieres eliminar esta acción de formacion?' },
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.TrainingAPI.Delete(event.data.unique_id).then((res: any) => {
            this.snack.viewsnack('La accion de formacion se elimino correctamente', 'Succes');
            this.findData();
          })
        }
      });
    }
  }

  formatDate(date: Date): string {
    const isoString = date.toISOString(); // Obtener la fecha en formato ISO
    return isoString.substring(0, 10); // Obtener solo la parte de la fecha (YYYY-MM-DD)
}

  async saveData() {
    if (!this.title || !this.startDate || !this.endDate) {
      return this.snack.viewsnack('Falta la descripción o las fechas', 'ERROR');
    }

    const data = {
      title: this.title,
      start_date: this.formatDate(this.startDate), // Formatear la fecha de inicio
      end_date: this.formatDate(this.endDate), // Formatear la fecha de fin
    };

    this.TrainingAPI.Create(data).then((res: any) => {
      this.snack.viewsnack(res.data.msg, 'success');
      this.findData();
      this.title = '';
      this.titleInput.nativeElement.value = '';
    });
  }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
