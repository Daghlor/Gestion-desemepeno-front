import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit {

  @Input("datasource")
  datasource!: MatTableDataSource<any>;
  @Input("columns") columns: any;
  @Input("length")
  length!: number;
  @Input("paginator")
  paginator!: string;
  @Input("search") search: boolean = false;
  @Input("isLoadingResults")
  isLoadingResults!: boolean;
  @Input("placeholder")
  placeholder!: string;
  @Input("label")
  label!: string;
  @Input("pagesizeoptions") pageSizeOptions: any;  
  @Input("filter") filter: boolean = true;
  @Input("url")
  url!: boolean;
  @Input("urlName")
  urlName!: string;
  @Input("pagesize")
  pageSize!: number;
  @Output() changePaginator = new EventEmitter();
  @Output() changeFilter = new EventEmitter();
  @Output() changeSort = new EventEmitter();
  @Output() deleteItems = new EventEmitter();
  @Output() visibilityReviewItems = new EventEmitter();
  @Output() editItems = new EventEmitter();
  @Output() addItems = new EventEmitter();
  @Output() historialItems = new EventEmitter();
  @Output() downloadItems = new EventEmitter();
  @Output() userItems = new EventEmitter();
  @Output() resultsItems = new EventEmitter();
  @Output() resultsokItems = new EventEmitter();
  @Output() viewItems = new EventEmitter();
  @Output() createMaintenanceItems = new EventEmitter();
  @Output() outputInternalItems = new EventEmitter();
  @Output() inputInternalItems = new EventEmitter();
  @Output() eventCheckbox = new EventEmitter();
  displayedColumns: any = [];

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  constructor() {}

  ngOnInit() {
    this.displayedColumns = this.columns.map((c: { columnDef: any; }) => c.columnDef);
  }

  pageEvent(event:any) {
    this.changePaginator.emit(event);
  }

  changeFilters(value:any) {
    this.changeFilter.emit(value);
  }

  sortData(value:any) {
    //console.log("value: ", value)
    this.changeSort.emit(value);
  }
  createMaintenanceItem(item:any){
    this.createMaintenanceItems.emit(item);
  }
  inputInternalItem( item:any ){
    this.inputInternalItems.emit ( item );
  }
  outputInternalItem( item:any ){
    this.outputInternalItems.emit ( item );
  }
  deleteItem(item:any) {
    this.deleteItems.emit(item);
  }
  visibilityReviewItem(item:any) {
    this.visibilityReviewItems.emit(item);
  }
  resultsItem(item:any) {
    this.resultsItems.emit(item);
  }
  resultsokItem(item:any) {
    this.resultsokItems.emit(item);
  }
  viewItem(item:any) {
    this.viewItems.emit(item);
  
  }
  editItem(item:any) {
    this.editItems.emit(item);
  }
  addItem(item:any) {
    this.addItems.emit(item);
  }
  historialItem(item:any) {
    this.historialItems.emit(item);
  }
  downloadItem(item:any) {
    this.downloadItems.emit(item);
  }
  userItem(item:any) {
    this.userItems.emit(item);
  }

  eventCheck(item:any) {
    this.eventCheckbox.emit(item);
  }
}
