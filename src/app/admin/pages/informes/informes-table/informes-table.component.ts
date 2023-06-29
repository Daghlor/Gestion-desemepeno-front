import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { StrategicsService } from 'src/app/admin/services/strategics.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { LocalService } from 'src/app/config/local.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-informes-table',
  templateUrl: './informes-table.component.html',
  styleUrls: ['./informes-table.component.scss']
})
export class InformesTableComponent implements OnInit{
@ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  objetivos: any[] = [];
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
      columnDef: 'title',
      header: 'Objetivo Estratégico',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.title}`,
    },
    {
      columnDef: 'nameUser',
      header: 'Usuario',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.nameUser}`,
    },
    {
      columnDef: 'company',
      header: 'Empresa',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.company}`,
    },
    {
      columnDef: 'area',
      header: 'Área',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.area}`,
    },
    {
      columnDef: 'state',
      header: 'Estado',
      sort: true,
      type: 'text',
      cell: (element: any) => `${element.state}`,
    },
    {
      columnDef: 'icons',
      header: '',
      sort: true,
      type: 'icons',
      cell: (element: any) => `${element.icons}`,
    }
  ];

  porcentaje: number = 0;
  chart: any;

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

  findData() {
    this.loading = true;

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
    };

    this.strategicAPI.FindAll(paginate)
      .then((res: any) => {
        for (let i = 0; i < res.data.objetives.length; i++) {
          res.data.objetives[i].icons = ['edit'];
        }

        this.dataSource = res.data.objetives;
        this.length = res.data.total;
        this.loading = false;
      })
      .catch((error: any) => {
        console.error(error);
        this.loading = false;
      });
  }

   iconsFunction(event: any) {
  if (event.icon === 'edit') {
    const objetivoUniqueId = event.data.unique_id;
    this.router.navigate(['admin/informes/chart/' + objetivoUniqueId]);
  }
}

}
