import { EmploymentsService } from '../../../services/employments.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/config/snackbar.service';

@Component({
  selector: 'app-cargos-table',
  templateUrl: './cargos-table.component.html',
  styleUrls: ['./cargos-table.component.scss']
})
export class CargosTableComponent implements OnInit {
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
  }]

  constructor(
    private CargosApi: EmploymentsService,
    private router: Router,
    private snack: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  redirectForm(url: string){
    this.snack.redirect(url);
  }

  getData(){
    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.orderColumn || 'description',
      direction: this.orderType || 'asc',
      search: {
        description: "",
      }
    }

    this.CargosApi.FindAll(paginate).then((res:any) => {
      for (let i = 0; i < res.data.employments.length; i++){
        res.data.employments[i].icons = ['delete','edit']
      }

      this.dataSource= new MatTableDataSource(res.data.employments);
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
      this.router.navigate(['admin/cargos/edit' + event.data.unique_id]);
    }
  }


}
