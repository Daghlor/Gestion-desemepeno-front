import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { StrategicsService } from 'src/app/admin/services/strategics.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { LocalService } from 'src/app/config/local.service';
import { MatDialog } from '@angular/material/dialog';
import { Chart1Service } from 'src/app/admin/services/chart1.service';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-informes-table',
  templateUrl: './informes-table.component.html',
  styleUrls: ['./informes-table.component.scss']
})
export class InformesTableComponent implements OnInit{
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart1: any;
  data1: any; // Aquí almacenaremos los datos del gráfico
  labels1: string[] = []; // Aquí almacenaremos los títulos de los objetivos estratégicos
  counts1: number[] = [];

  chart2: any;
  data2: any;
 totalObjectives2: number = 0;
  totalUsers2: number = 0;

  activeTab: number = 1;
  initialTab: number = 1;
currentTab: number = 1;
optionsTabs: any = [{
  code: 1,
  name: 'Grafica 1',
  show: true,
  disabled: false,
},{
  code: 2,
  name: 'Grafica 2',
  show: true,
  disabled: false,
    },{
  code: 3,
  name: 'Grafica 3',
  show: true,
  disabled: false,
},]


  constructor(
    private strategicAPI: StrategicsService,
    private router: Router,
    private snack: SnackbarService,
    private Local: LocalService,
    private dialog: MatDialog,
    private chartService: Chart1Service,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.chartService.FindChart1().subscribe((data) => {
      // Procesa los datos recibidos y actualiza los arrays labels y counts
      this.data1 = data.data;
      this.labels1 = this.data1.map((item: any) => item.title_strategics);
      this.counts1 = this.data1.map((item: any) => item.count);

      // Inicializa el gráfico después de obtener los datos
      this.initializeChart1();
    }, (error: any) => {
      console.error(error);
    });

    this.chartService.FindChart2().subscribe((data) => {
    this.totalObjectives2 = data.total_objectives;
        this.totalUsers2 = data.total_users;

    this.initializeChart2();

  }, (error: any) => {
    console.error(error);
  });

  }

  changeTab(tab: number): void {
    this.activeTab = tab;

    // Luego, inicializa la gráfica correspondiente según la pestaña activa
    if (tab === 1) {
      this.initializeChart1();
    } else if (tab === 2) {
      this.initializeChart2();
    }
  }


  initializeChart1(): void {
      // Configura el gráfico
    if (this.chart1) {
    this.chart1.destroy();
  }
      this.chart1 = new Chart('canvas', {
        type: 'bar', // Puedes usar 'bar' para un gráfico de barras
        data: {
          labels: this.labels1,
          datasets: [{
            label: 'Número de Objetivos Individuales alineados a Objetivos Estrategicos',
            data: this.counts1,
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)'], // Define los colores aquí
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)'], // Color del borde de las barras
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                callback: function (value) {
                 if (typeof value === 'number') {
                     return value.toFixed(0); // Redondea el valor a 0 decimales si es un número
                  }
                  return value;
                }
              }
              // Configura otras opciones de la escala si es necesario
            }
          },
          // Configura otras opciones del gráfico si es necesario
        }
      });
  }

  initializeChart2(): void {
    // Configura el gráfico
    this.chart2 = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels: ['Total Objetivos Individuales', 'Total de usuarios'],
        datasets: [{
          label: 'Total planes iniciados vs Total de usuarios',
          data: [this.totalObjectives2, this.totalUsers2],
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              callback: function (value) {
                if (typeof value === 'number') {
                  return value.toFixed(0);
                }
                return value;
              }
            }
          }
        }
      }
    });
  }




}
