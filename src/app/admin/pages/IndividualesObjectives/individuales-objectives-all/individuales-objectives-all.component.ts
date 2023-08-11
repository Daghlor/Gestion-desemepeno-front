import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IndividualService } from 'src/app/admin/services/individual.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { ConfirmModalComponent } from 'src/app/admin/components/confirm-modal/confirm-modal.component';

// ESTE ES EL .TS DONDE ESTA LA PARTE LOGICA DE LA VISTA TODOS LOS OBJETIVOS INDIVIDUALES
@Component({
  selector: 'app-individuales-objectives-all',
  templateUrl: './individuales-objectives-all.component.html',
  styleUrls: ['./individuales-objectives-all.component.scss']
})
export class IndividualesObjectivesAllComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES Y EL MAQUETADO DE LA TABLA
  name: string = '';
  unique_id?: string;
  selectedCompany: number | null = null;
  companies: any[] = [];
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
    columnDef: 'title_strategics',
    header: 'Objetivo Estratégico',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.title_strategics}`,
  },{
    columnDef: 'title',
    header: 'Objetivo Individual',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.title}`,
  },{
    columnDef: 'weight',
    header: 'Peso %',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.weight}`,
  },{
    columnDef: 'nameUser',
    header: 'Usuario',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.nameUser}`,
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
    // SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
    private individualAPI: IndividualService,
    private router: Router,
    private snack: SnackbarService,
    private Local: LocalService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.findData();
  }

  // FUNCION QUE BUSCA TODOS LOS OBJETIVOS INDIVIDUALES Y LOS PONE EN LA TABLA
  findData(){
    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.orderColumn || 'title',
      direction: this.orderType || 'asc',
      search: {
        nameUser: this.name,
        user_id: null,
        company_id: null,
        state_id: 1,
        areas_id: null
      }
    }

    this.individualAPI.FindAll(paginate).then((res:any)=>{
      for (let i = 0; i < res.data.objetives.length; i++){
        res.data.objetives[i].icons = ['delete', 'edit'];
      }
      this.dataSource = res.data.objetives;
      this.length = res.data.total;
    });
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
    if (event.icon == 'edit') {
      this.router.navigateByUrl('admin/usuarios/form/' + this.unique_id + '/perfil');
    }
    else if (event.icon == 'delete') {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '250px',
        data: { message: '¿Estás seguro de que quieres eliminar este objetivo?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.individualAPI.Delete(event.data.unique_id).then((res: any) => {
            this.snack.viewsnack('El objetivo se elimino correctamente', 'Success');
            this.findData();
          })
        }
      })
    }
  }

}
