import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { FeedbackActionsService } from 'src/app/admin/services/feedback-actions.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { ConfirmModalComponent } from '../..';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-feeback-actions',
  templateUrl: './feeback-actions.component.html',
  styleUrls: ['./feeback-actions.component.scss']
})
export class FeebackActionsComponent implements OnInit {

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
    header: 'Descripcion',
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

  constructor(
    private FeebackAPI: FeedbackActionsService,
    private snack: SnackbarService,
    private Local: LocalService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.findData();
  }

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
    })
     // Limpiar el campo de título después de guardar los datos
  }


}