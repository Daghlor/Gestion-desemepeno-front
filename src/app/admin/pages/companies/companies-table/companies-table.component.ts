import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/admin/services/companies.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/admin/components/confirm-modal/confirm-modal.component';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { identity } from 'rxjs';

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.scss']
})
export class CompaniesTableComponent implements OnInit {
  loading: boolean = false;
  paginator: boolean = true;
  uuid: any
  length: number = 0;
  orderColumn?: string;
  orderType?: string;
  actualPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 15, 20, 25, 50];
  dataSource: any = new MatTableDataSource();
  columns = [{
    columnDef: 'nit',
    header: 'NIT',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.nit}`,
  },{
    columnDef: 'businessName',
    header: 'Razón Social/Nombre',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.businessName}`,
  },{
    columnDef: 'email',
    header: 'Email',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.email}`,
  },{
    columnDef: 'phone',
    header: 'Teléfono',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.phone}`,
  },{
    columnDef: 'address',
    header: 'Dirección',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.address}`,
  },{
    columnDef: 'city',
    header: 'Ciudad',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.city}`,
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
    private CompaniesApi: CompaniesService,
    private router: Router,
    private dialog: MatDialog,
    private snack: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.getData();
    //this.dataSource = new MatTableDataSource([ {icons: ['delete', 'edit']} ])
  }

  getData(){
    const paginate = {
      paginate: this.pageSize,
      page: this.actualPage,
      column: this.orderColumn || 'businessName',
      direction: this.orderType || 'asc',
      search: {
        nit: "",
        businessName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state_id: 1
      }
    }

    this.CompaniesApi.FindAll(paginate).then((res:any) => {
      for (let i = 0; i < res.data.companies.length; i++) {
        res.data.companies[i].icons = ['delete', 'edit']
      }

      this.dataSource = new MatTableDataSource(res.data.companies);
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

  redirectForm(url: string){
    this.snack.redirect(url);
  }


  iconsFunction(event: any){
    if(event.icon == 'edit'){
      this.router.navigate(['admin/empresas/edit/' + event.data.unique_id]);
    }
    else if(event.icon == 'delete'){
      const dialogRef = this.dialog.open(ConfirmModalComponent, {

        width: '250px',
        data: { message: '¿Estás seguro de que quieres eliminar esta empresa?'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.CompaniesApi.Delete(event.data.unique_id).then((res:any)=>{
            this.snack.viewsnack('La empresa se elimino correctamente', 'Success');
            this.getData();
          })
        }
      });
    }
  }



}
