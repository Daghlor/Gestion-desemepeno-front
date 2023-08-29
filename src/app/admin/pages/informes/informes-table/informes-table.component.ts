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

  chart3: any;
  closedCount: number = 0;
  approvedCount: number = 0;

  chart4: any;

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
},{
  code: 4,
  name: 'Grafica 4',
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

    this.fetchChartData3();

  }

  changeTab(tab: number): void {
    this.activeTab = tab;

    // Luego, inicializa la gráfica correspondiente según la pestaña activa
    if (tab === 1) {
      this.initializeChart1();
    } else if (tab === 2) {
      this.initializeChart2();
    }
    else if (tab === 3) {
      this.initializeChart3();
    }
    else if (tab === 4) {
      this.initializeChart4();
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
          plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const labelIndex = context.dataIndex; // Índice de la barra actual
              if (labelIndex === 0) {
                return 'Objetivos individuales alineados: ' + context.parsed.y;
              } else if (labelIndex === 1) {
                return 'Objetivos individuales alineados: ' + context.parsed.y;
              } else {
                return 'Otro Label: ' + context.parsed.y; // Cambia 'Otro Label' según tus necesidades
              }
            }
          }
        }
      }
        }
      });
  }

  initializeChart2(): void {
  // Configura el gráfico
  this.chart2 = new Chart('canvas2', {
    type: 'bar',
    data: {
      labels: ['Total Planes iniciados', 'Total de Usuarios'],
      datasets: [{
        label: 'Total Planes iniciados vs Total de usuarios',
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
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const labelIndex = context.dataIndex; // Índice de la barra actual
              if (labelIndex === 0) {
                return 'Total Planes: ' + context.parsed.y;
              } else if (labelIndex === 1) {
                return 'Total de Usuarios: ' + context.parsed.y;
              } else {
                return 'Otro Label: ' + context.parsed.y; // Cambia 'Otro Label' según tus necesidades
              }
            }
          }
        }
      }
    }
  });
}

  fetchChartData3(): void {
    this.chartService.FindChart3().subscribe((data: any) => {
      // Asume que el servicio devuelve los datos en la forma { closed_count: number, approved_count: number }
      this.closedCount = data.closed_count;
      this.approvedCount = data.approved_count;

      // Inicializa la tercera gráfica después de obtener los datos
      this.initializeChart3();
    }, (error: any) => {
      console.error(error);
    });
  }

  initializeChart3(): void {
    // Configura el gráfico 3 aquí similar a como lo hiciste para las gráficas anteriores
    // Utiliza this.closedCount y this.approvedCount para los datos
    // Asegúrate de tener un elemento canvas en tu HTML para esta gráfica (por ejemplo, <canvas id="canvas3"></canvas>)
    this.chart3 = new Chart('canvas3', {
      type: 'bar',
      data: {
        labels: ['Aprobados', 'Cerrados'],
        datasets: [{
          label: 'Planes Aprobados vs Cerrados ',
          data: [this.approvedCount, this.closedCount],
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
        },plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const labelIndex = context.dataIndex; // Índice de la barra actual
              if (labelIndex === 0) {
                return 'Planes Aprobados: ' + context.parsed.y;
              } else if (labelIndex === 1) {
                return 'Planes Cerrados: ' + context.parsed.y;
              } else {
                return 'Otro Label: ' + context.parsed.y; // Cambia 'Otro Label' según tus necesidades
              }
            }
          }
        }
      }
      }
    });
  }

  initializeChart4(): void {
  // Configura el gráfico
  if (this.chart4) {
    this.chart4.destroy();
  }

  this.chartService.FindChart4().subscribe((data) => {
    const pendingCount = data.pending_count;
    const approvedCount = data.approved_count;
    const totalUsers = data.total_users;

    this.chart4 = new Chart('canvas4', {
      type: 'bar',
      data: {
        labels: ['Planes Pendientes de Aprobación', 'Planes Aprobados', 'Total de Usuarios'],
        datasets: [{
          label: 'Planes Pendientes de aprobacion vs Planes Aprobados vs Total Usuarios',
          data: [pendingCount, approvedCount, totalUsers],
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)'],
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
        },plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const labelIndex = context.dataIndex; // Índice de la barra actual
              if (labelIndex === 0) {
                return 'Planes Pendientes de Aprobación: ' + context.parsed.y;
              } else if (labelIndex === 1) {
                return 'Planes Aprobados: ' + context.parsed.y;
              } else if (labelIndex === 2) {
                return 'Total de usuarios: ' + context.parsed.y;
              }else {
                return 'Otro Label: ' + context.parsed.y; // Cambia 'Otro Label' según tus necesidades
              }
            }
          }
        }
      }
      }
    });
  }, (error: any) => {
    console.error(error);
  });
}





}
