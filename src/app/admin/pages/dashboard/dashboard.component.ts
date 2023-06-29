import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { StrategicsService } from '../../services/strategics.service';
import { MatTableDataSource } from '@angular/material/table';

// ESTE ES EL .TS DEL DASHBOARD DONDE ESTA LA PARTE LOGICA
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  currentDate!: string;
  length: number = 0;
  dataSource: any = new MatTableDataSource();

  constructor(
    private strategicAPI: StrategicsService
  ) { }

  ngOnInit():void{
    this.currentDate = moment().format('DD/MM/YYYY');

  }



}
