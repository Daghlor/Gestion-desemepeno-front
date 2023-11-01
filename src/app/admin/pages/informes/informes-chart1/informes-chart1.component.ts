import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart1Service } from 'src/app/admin/services/chart1.service';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';

// ESTA ES LA LOGICA DE LA GRAFICA 1
@Component({
  selector: 'app-informes-chart1',
  templateUrl: './informes-chart1.component.html',
  styleUrls: ['./informes-chart1.component.scss']
})
export class InformesChart1Component implements OnInit {

  // SE DEFINE VARIABLES
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: Chart<"pie"> | undefined;
  chartData: any = {
    labels: [],
    data: [],
  };

  company_name: string = '';

  // SE INYECTAN LOS SERVICIOS NECESARIOS
  constructor(
    private chartService: Chart1Service,
    private route: ActivatedRoute,
  ) { }

  // FUNCION QUE TRAE LA DATA PARA GRAFICAR
  ngOnInit(): void {
    // Obtenemos el UUID de la URL
    this.route.paramMap.subscribe((params) => {
      const uuid = params.get('uuid');

      // Comprobamos si uuid es null o tiene un valor
      if (uuid) {
        // Llamamos al servicio para obtener los datos
        this.chartService.FindChart1(uuid).subscribe(
          (data: any) => {
            // Procesamos los datos obtenidos de la API
            this.chartData.labels = data.data.map((item: any) => item.title_strategics);
            this.chartData.data = data.data.map((item: any) => item.count);
            this.company_name = data.company_name;

            console.log('Datos para el gráfico:', this.chartData);
            // Luego de obtener los datos, creamos la gráfica
            this.createChart();
          },
          (error: any) => {
            console.error('Error al obtener los datos de la API', error);
          }
        );
      } else {
        console.error('UUID es nulo o no válido');
      }
    });
  }

  // FUNCION QUE CREA EL GRAFICA CON LA DATA
  createChart() {
  const ctx = this.chartCanvas.nativeElement.getContext('2d');
  if (!ctx) {
    console.error('No se pudo obtener el contexto 2D del canvas.');
    return;
  }

  this.chart = new Chart(ctx, {
    type: 'pie', // Tipo de gráfico pie (pastel)
    data: {
      labels: this.chartData.labels,
      datasets: [
        {
          label: 'N# Objetivos Individuales alineados',
          data: this.chartData.data,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 0)',
            'rgba(255, 159, 64, 0)',
            'rgba(255, 206, 86, 0)',
            'rgba(54, 162, 235, 0)',
            'rgba(75, 192, 192, 0)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
          datalabels: { // Configura las etiquetas de datos
            anchor: 'end', // Posición de las etiquetas ('end' para colocarlas en el extremo de cada segmento)
            align: 'start', // Alineación de las etiquetas ('start' para alinearlas al inicio del segmento)
            formatter: (value, ctx) => {
              console.log('Valor de etiqueta de datos:', value);
              return value.toString();
            },
            font: {
              weight: 'bold'
            },
            padding: 6,
            borderColor: 'white',
            borderRadius: 25,
            borderWidth: 2,
            color: 'white',
            display: function (context) {
              return true;
            }
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  console.log('Gráfico creado:', this.chart);
}
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
