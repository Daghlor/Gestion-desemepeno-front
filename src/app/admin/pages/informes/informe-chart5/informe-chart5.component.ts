import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { Chart1Service } from 'src/app/admin/services/chart1.service';
import { TrackingService } from 'src/app/admin/services/tracking.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-informe-chart5',
  templateUrl: './informe-chart5.component.html',
  styleUrls: ['./informe-chart5.component.scss']
})
export class InformeChart5Component implements OnInit {

  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  objetivos: any[] = [];

  constructor(
    private trackingAPI: TrackingService,
    private chartService: Chart1Service,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadDataAndGenerateChart();
  }

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



 generateChart() {
    const labels = this.objetivos.map((objetivo) => objetivo.title);
    const totalPointsAssigned = this.objetivos.map((objetivo) => objetivo.totalPointsAssigned);

    const ctx = this.chartCanvas?.nativeElement.getContext('2d'); // Usamos la operación de opción segura "?"

    if (ctx) {
      new Chart(ctx, {
        type: 'bar', // Tipo de gráfico (puedes cambiarlo según tus necesidades)
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Porcentaje de completado',
              data: totalPointsAssigned,
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo de las barras
              borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
  }

}
