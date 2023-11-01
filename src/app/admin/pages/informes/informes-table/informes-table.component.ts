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
import { TrackingService } from 'src/app/admin/services/tracking.service';
import { CompaniesService } from 'src/app/admin/services/companies.service';

// ESTA ES LA LOGICA DEL COMPONENTE DE INFORMES
@Component({
  selector: 'app-informes-table',
  templateUrl: './informes-table.component.html',
  styleUrls: ['./informes-table.component.scss']
})
export class InformesTableComponent implements OnInit{
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  // SE DEFINE VARIABLES A USAR
  users: any[] = [];
  companies: any[] = [];
  objetivosEstrategicos: any[] = [];
   loading: boolean = false;
  paginator: boolean = true;
  length: number = 0;
  orderColumn?: string;
  orderType?: string;
  actualPage: number = 1;
  pageSize: number = 20;
  pageSizeOptions: number[] = [10, 15, 20, 25, 50];
  dataSource: any = new MatTableDataSource();
  columns = [{
    columnDef: 'name',
    header: 'Nombres',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.name}`,
  },{
    columnDef: 'identify',
    header: 'Indentificación',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.identify}`,
  },{
    columnDef: 'email',
    header: 'Email',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.email}`,
  },{
    columnDef: 'icons',
    header: '',
    sort: true,
    type: 'icons',
    cell: (element: any) => `${element.icons}`,
  }];

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
},{
  code: 5,
  name: 'Grafica 5',
  show: true,
  disabled: false,
},{
  code: 6,
  name: 'Grafica 6',
  show: true,
  disabled: false,
},]

  // SE INYECTAN LOS SERVICIOS NECESARIOS
  constructor(
    private strategicAPI: StrategicsService,
    private router: Router,
    private snack: SnackbarService,
    private Local: LocalService,
    private dialog: MatDialog,
    private chartService: Chart1Service,
    private activatedRoute: ActivatedRoute,
    private trackingAPI: TrackingService,
    private CompaniesApi: CompaniesService,

  ) { }

  ngOnInit(): void {

    this.chartService.FindChart2().subscribe((data) => {
    this.totalObjectives2 = data.total_objectives;
        this.totalUsers2 = data.total_users;

    this.initializeChart2();

  }, (error: any) => {
    console.error(error);
    });

    this.fetchChartData3();
    this.getData();
    this.cargarObjetivosEstrategicos();
    this.getCompanyData();
  }

  // FUNCION QUE CARGA LOS OBJETIVOS ESTRATEGICOS PARA LA GRAFICA 6
  cargarObjetivosEstrategicos() {
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

  this.strategicAPI.FindAllWithIndv(paginate).then((res: any) => {
    if (res.data && res.data.objetives) {
      this.objetivosEstrategicos = res.data.objetives.data; // Obtén la matriz de objetivos
      this.length = res.data.objetives.total;

      // Mapea y agrega las propiedades icon y url a cada objetivo
      this.objetivosEstrategicos.forEach((objetivo: any) => {
        objetivo.icon = 'edit'; // Agrega el icono (personalízalo aquí)
        objetivo.url = `/detalles-objetivo/${objetivo.unique_id}`; // URL con el unique_id
      });

      this.dataSource = this.objetivosEstrategicos;
    }
  });
}


 navigateToEdit(uniqueId: string) {
  this.router.navigate(['/admin/informes_Estrategicos', uniqueId]);
  }

  // FUNCION QUE TRAE LOS DATOS DE LA EMPRESA
 getCompanyData() {
  const paginate = {
    paginate: this.pageSize,
    page: this.actualPage,
    column: this.orderColumn || 'businessName',
    direction: this.orderType || 'asc',
    search: {
      nit: '',
      businessName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state_id: 1,
    },
  };

  this.CompaniesApi.FindAll(paginate)
    .then((res: any) => {
      if (res.data && res.data.companies) {
        // Asigna los datos a this.companies
        this.companies = res.data.companies;
        this.length = res.data.total;

        // Agrega el icono y la URL a cada empresa
        this.companies.forEach((empresa: any) => {
          empresa.icon = 'edit'; // Agrega el icono (puedes personalizarlo aquí)
          empresa.url = `/detalles-objetivo/${empresa.unique_id}`; // URL con el unique_id
        });

        // Asigna los datos a dataSource.data
        this.dataSource.data = this.companies;
      }
    })
    .catch((error: any) => {
      console.error(error);
    });
}

  // FUNCION QUE OBTIENE LOS DATOS DEL USUARIOS
  getData() {
  const paginate = {
    paginate: this.pageSize,
    page: this.actualPage,
    column: this.orderColumn || 'name',
    direction: this.orderType || 'asc',
    search: {
      nit: '',
      businessName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state_id: 1,
    },
  };

  this.trackingAPI.FindAllUser(paginate)
    .then((res: any) => {
      if (res.data && res.data.users) {
        // Asigna los datos a this.companies
        this.users = res.data.users;
        this.length = res.data.total;

        // Agrega el icono y la URL a cada empresa
        this.users.forEach((users: any) => {
          users.icon = 'edit'; // Agrega el icono (puedes personalizarlo aquí)
          users.url = `/detalles-objetivo/${users.unique_id}`; // URL con el unique_id
        });

        // Asigna los datos a dataSource.data
        this.dataSource.data = this.users;
      }
    })
    .catch((error: any) => {
      console.error(error);
    });
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
    if(event.icon == 'add'){
      this.router.navigate(['admin/informes_Grafica_5/' + event.data.unique_id]);
    }
  }

  validatePermissions(code: string): Boolean {
    return this.Local.validatePermission(code) ? true : false;
  }

  // FUNCION PARA LA ASIGNACION Y CAMBIO DE PESTAÑANAS
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
    else if (tab === 5) {
      this.initializeChart4();
    }
    else if (tab === 6) {

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

  // FUNCION QUE CREA EL GRAFICO 2 CON LOS DATOS
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

  // FUNCION QUE TRAE LAS DATOS PARA EL GRAFICO 3
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

  // FUNCION QUE CREA LA GRAFICA 3 CON LOS DATOS
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

  // FUNCION QUE OBTIENE LOS DATOS Y CREA EL GRAFICO 4
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

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
