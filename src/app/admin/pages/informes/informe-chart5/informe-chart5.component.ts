import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { Chart1Service } from 'src/app/admin/services/chart1.service';
import { TrackingService } from 'src/app/admin/services/tracking.service';
import { ActivatedRoute } from '@angular/router';

// ESTA ES LA LOGICA DEL COMPONENTE DE LA GRAFICA 5
@Component({
  selector: 'app-informe-chart5',
  templateUrl: './informe-chart5.component.html',
  styleUrls: ['./informe-chart5.component.scss']
})
export class InformeChart5Component implements OnInit {

  // SE DEFINE VARIABLES A UTILIZAR PARA LA DATA
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  objetivos: any[] = [];

  // SE INYECTAN SERVICIOS NECESARIOS
  constructor(
    private trackingAPI: TrackingService,
    private chartService: Chart1Service,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadDataAndGenerateChart();
  }

  // FUNCION DE CARGUE DE LA GRAFICA APENAS INICIA EL COMPONENTE
loadDataAndGenerateChart() {
  const uuid = this.route.snapshot.paramMap.get('uuid');

  if (uuid !== null) {
    // Llama a tu servicio para obtener los datos de los objetivos individuales
    this.chartService.FindChart5(uuid).subscribe((data) => {
      this.objetivos = data.data;

      // Llama a la función para crear y mostrar la gráfica
      this.generateChart();
    });
  } else {
    // Maneja el caso en el que uuid es nulo, por ejemplo, mostrando un mensaje de error o redirigiendo a otra página.
  }
}


// FUNCION DE OBTENCION DE LOS DATOS Y CREACION DE LA GRAFICA
 generateChart() {
    const labels = this.objetivos.map((objetivo) => objetivo.title);
    const totalPointsAssigned = this.objetivos.map((objetivo) => objetivo.totalPointsAssigned);

    const ctx = this.chartCanvas?.nativeElement.getContext('2d'); // Usamos la operación de opción segura "?"

    if (ctx) {
      new Chart(ctx, {
        type: 'polarArea', // Tipo de gráfico (puedes cambiarlo según tus necesidades)
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Porcentaje de completado',
              data: totalPointsAssigned,
              backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(255, 159, 64, 0.5)', // Color de fondo para la primera parte // Color de fondo para la segunda parte
              'rgba(255, 206, 86, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)', // Color de fondo para la tercera parte
              // Puedes agregar más colores de fondo si tienes más partes
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 159, 64, 1)', // Color del borde para la primera parte // Color del borde para la segunda parte
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)', // Color del borde para la tercera parte
              // Puedes agregar más colores de borde si tienes más partes
            ],
            borderWidth: 1,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    }
  }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
