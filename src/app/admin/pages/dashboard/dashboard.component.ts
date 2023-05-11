import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  currentDate!: string;

  constructor(
  ) { }

  ngOnInit():void{
    this.currentDate = moment().format('DD/MM/YYYY');
  }


}
