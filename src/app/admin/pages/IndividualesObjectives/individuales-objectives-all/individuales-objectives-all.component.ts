import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IndividualService } from 'src/app/admin/services/individual.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';

@Component({
  selector: 'app-individuales-objectives-all',
  templateUrl: './individuales-objectives-all.component.html',
  styleUrls: ['./individuales-objectives-all.component.scss']
})
export class IndividualesObjectivesAllComponent implements OnInit {
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
    columnDef: 'title_strategics',
    header: 'Objetivo Estratégico',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.title_strategics}`,
  },{
    columnDef: 'weight',
    header: 'Puntaje',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.weight}`,
  },{
    columnDef: 'state',
    header: 'Estado',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.state}`,
  }];
  constructor(
    private individualAPI: IndividualService,
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

    this.individualAPI.FindAll(paginate).then((res:any)=>{
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



}
