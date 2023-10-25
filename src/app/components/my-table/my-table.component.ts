import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

// ESTE ES EL TS DONDE ESTA LA PARTE LOGICA DE LA VISTA TABLA
@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit {
  // SE DEFINE VARIABLES DONDE SON EXPORTABLES A LOS COMPONENTES DE LAS VISTAS
  @Input("dataSource") dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>();
  @Input("Columns") columns: any;
  @Input("length") length!: number;
  @Input("pageSize") pageSize!: number;
  @Input("PageSizeOptions") pageSizeOptions: any;
  @Input("loading") loading: boolean = false;
  @Input("paginator") paginator!: boolean;
  @Output() changeSort = new EventEmitter();
  @Output() eventCheckbox = new EventEmitter();
  @Output() eventIcons = new EventEmitter();
  @Output() changePaginator = new EventEmitter();
  displayedColumns: any = [];

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((c:any) => c.columnDef);
  }

  validate(row: any){
    console.log(row);

  }
  sortData(value: any) {
    this.changeSort.emit(value);
  }

  eventCheck(item: any) {
    this.eventCheckbox.emit(item);
  }

  eventPaginator(event:any) {
    this.changePaginator.emit(event);
  }

  eventsIcons(item: any, row: any){
    let values = {icon: item, data: row}
    return this.eventIcons.emit(values);
  }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
