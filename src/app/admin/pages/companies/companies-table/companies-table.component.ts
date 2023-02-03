import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.scss']
})
export class CompaniesTableComponent implements OnInit {
  loading: boolean = false;
  dataSource: any = new MatTableDataSource();
  columns = [{
    columnDef: 'icons',
    header: 'Nombre',
    width: '12%',
    sort: true,
    type: 'icons',
    cell: (element: any) => `${element.icons}`,
  }];
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([ {icons: ['delete', 'edit']} ])
  }

  iconsFunction(event: any){

    if(event == 'edit'){
      console.log(event);
    }

  }



}
