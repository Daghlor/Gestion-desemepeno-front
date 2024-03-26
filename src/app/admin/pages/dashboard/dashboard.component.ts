import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { StrategicsService } from '../../services/strategics.service';
import { MatTableDataSource } from '@angular/material/table';
import { IndividualService } from '../../services/individual.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';


// ESTE ES EL .TS DEL DASHBOARD DONDE ESTA LA PARTE LOGICA
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  calendarPlugins = [dayGridPlugin, interactionPlugin];
  calendarEvents: any[] = [
    { title: 'Event Now', start: new Date() }
  ];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

  currentDate!: string;
  totalObjetivosIndv?: number;
  totalObjetivosEstra?: number;
  paginator: boolean = true;
  length: number = 0;
  orderColumn?: string;
  orderType?: string;
  actualPage: number = 1;
  pageSize: number = 10;
   dataSource: any = new MatTableDataSource();

  constructor(
    private IndividualService: IndividualService,
    private StrategicsService: StrategicsService
  ) { }

  ngOnInit():void{
    this.currentDate = moment().format('DD/MM/YYYY');
    this.getTotalObjetivosInd();
    this.getTotalObjetivosEstra();
    this.calendarEvents = [
    { title: 'Event Now', start: new Date() }
    // Agrega más eventos aquí si es necesario
  ];
  }



  getTotalObjetivosInd() {
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

    this.IndividualService.FindAll(paginate).then((response) => {
      this.totalObjetivosIndv = response.data.total;
    }).catch((error) => {
      console.error(error);
    });
  }

  getTotalObjetivosEstra() {
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

    this.StrategicsService.FindAll(paginate).then((response) => {
      this.totalObjetivosEstra = response.data.total;
    }).catch((error) => {
      console.error(error);
    });
  }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
