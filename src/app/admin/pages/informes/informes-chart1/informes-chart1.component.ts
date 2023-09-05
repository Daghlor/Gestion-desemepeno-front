import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart1Service } from 'src/app/admin/services/chart1.service';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-informes-chart1',
  templateUrl: './informes-chart1.component.html',
  styleUrls: ['./informes-chart1.component.scss']
})
export class InformesChart1Component implements OnInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: Chart | undefined = undefined;
  chartData: any = {
    labels: [],
    data: [],
  };

 company_name: string = '';


  constructor(
    private chartService: Chart1Service,
    private route: ActivatedRoute
  ) { }

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


  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto 2D del canvas.');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'bar', // Tipo de gráfico (en este caso, de barras)
      data: {
        labels: this.chartData.labels, // Valores en el eje X
        datasets: [
          {
            label: 'Numero de objetivos individuales alineados a objetivos estrategicos', // Etiqueta del conjunto de datos
            data: this.chartData.data, // Valores en el eje Y
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo de las barras
            borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {


        },
      },
    });
  }
}
