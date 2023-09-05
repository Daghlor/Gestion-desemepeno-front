import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart1Service } from 'src/app/admin/services/chart1.service';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-informe-chart6',
  templateUrl: './informe-chart6.component.html',
  styleUrls: ['./informe-chart6.component.scss']
})
export class InformeChart6Component implements OnInit {

 @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  public chart: Chart | undefined;



  constructor(
    private chartService: Chart1Service,
    private route: ActivatedRoute
  ) { }

  // ...

ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid) {
      this.chartService.FindChart6(uuid).subscribe((data) => {
        const chartConfig: ChartConfiguration = {
          type: 'bar',
          data: {
            labels: [data.strategic_title],
            datasets: [
              {
                label: 'Resultado Promedio',
                data: [data.average_result],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 100 // Establece el valor máximo en el eje Y a 100
              }
            }
          }
        };

        this.chart = new Chart(this.chartCanvas.nativeElement, chartConfig);
      }, (error) => {
        console.error(error);
      });
    }
  }
}


