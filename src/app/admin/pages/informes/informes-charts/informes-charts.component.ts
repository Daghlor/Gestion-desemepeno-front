import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart1Service } from 'src/app/admin/services/chart1.service';
import { Chart,  ChartConfiguration, ChartEvent, ChartType  } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { StrategicsService } from 'src/app/admin/services/strategics.service';

@Component({
  selector: 'app-informes-charts',
  templateUrl: './informes-charts.component.html',
  styleUrls: ['./informes-charts.component.scss']
})
export class InformesChartsComponent implements OnInit,AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  objetivoUniqueId?: string;
  porcentaje?: any [];
  chart: Chart | undefined;
  totalindividuals: number = 0;
  paginator: boolean = true;
  length: number = 0;
  orderColumn?: string;
  orderType?: string;
  actualPage: number = 1;
  pageSize: number = 10;



  constructor(
    private activatedRoute: ActivatedRoute,
    private chartService: Chart1Service,
    private strategicAPI: StrategicsService,
  ) { }

  ngOnInit(): void {
  this.activatedRoute.params.subscribe(params => {
    this.objetivoUniqueId = params['unique_id'];
    this.obtenerDatosGrafica();
  });
}


  ngAfterViewInit(): void {
    this.crearGrafico();
  }


obtenerDatosGrafica() {
  if (this.objetivoUniqueId) {
    this.chartService.FindChartByUniqueId(this.objetivoUniqueId)
      .then((data) => {
        this.porcentaje = data.percentage;
        console.log(data);
        this.crearGrafico();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
  crearGrafico() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Porcentaje','Porcentaje2'],
          datasets: [{
            label: 'Porcentaje',
            data:[40,100],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
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
