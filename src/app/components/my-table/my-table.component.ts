import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';



@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit {
  @Input("dataSource") dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>();
  @Input("Columns") columns: any;
  @Input("loading") loading: boolean = false;
  @Output() changeSort = new EventEmitter();
  @Output() eventCheckbox = new EventEmitter();
  @Output() icons = new EventEmitter();
  displayedColumns: any = [];

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((c:any) => c.columnDef);
    //console.log(this.displayedColumns);
    
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

  eventIcons(row: any){
    
    return this.icons.emit(row); 
  }



}
