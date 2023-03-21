import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StrategicsService } from 'src/app/admin/services/strategics.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/admin/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-strategic-objectives-all',
  templateUrl: './strategic-objectives-all.component.html',
  styleUrls: ['./strategic-objectives-all.component.scss']
})
export class StrategicObjectivesAllComponent implements OnInit {
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
    columnDef: 'title',
    header: 'Titulo',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.title}`,
  },{
    columnDef: 'nameUser',
    header: 'Usuario',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.nameUser}`,
  },{
    columnDef: 'company',
    header: 'Empresa',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.company}`,
  },{
    columnDef: 'area',
    header: 'Área',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.area}`,
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
    private strategicAPI: StrategicsService,
    private router: Router,
    private snack: SnackbarService,
    private Local: LocalService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.findData();
  }

  findData(){
    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.orderColumn || 'title',
      direction: this.orderType || 'asc',
      search: {
        user_id: null,
        company_id: null,
        state_id: 1,
        areas_id: null 
      }
    }

    this.strategicAPI.FindAll(paginate).then((res:any)=>{
      for (let i = 0; i < res.data.objetives.length; i++) {
        res.data.objetives[i].icons = ['delete'];
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

  iconsFunction(event: any){

    if(event.icon == 'delete'){
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '250px',
        data: { message: '¿Estás seguro de que quieres elimina este objetivo?' }
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.strategicAPI.Delete(event.data.unique_id).then((res:any)=>{
            this.snack.viewsnack('El objetivo se elimino correctamente', 'Success');
            this.findData();
          })
        }
      });
    }
  }

}
