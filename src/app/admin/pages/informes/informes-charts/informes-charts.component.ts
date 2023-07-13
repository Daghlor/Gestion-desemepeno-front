import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart1Service } from 'src/app/admin/services/chart1.service';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { StrategicsService } from 'src/app/admin/services/strategics.service';

interface ChartData {
  total_strategics: number;
  total_individuals: number;
  targeted_individuals: number;
  percentage: number;
}

@Component({
  selector: 'app-informes-charts',
  templateUrl: './informes-charts.component.html',
  styleUrls: ['./informes-charts.component.scss'],
})
export class InformesChartsComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  objetivoUniqueId?: string;
  chartData: ChartData | undefined;
  chart: Chart | undefined;
  totalObjetivos: number = 0;
  paginator: boolean = true;
  length: number = 0;
  orderColumn?: string;
  orderType?: string;
  actualPage: number = 1;
  pageSize: number = 10;

  constructor(
    private activatedRoute: ActivatedRoute,
    private chartService: Chart1Service,
    private strategicAPI: StrategicsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.objetivoUniqueId = params['unique_id'];
      this.obtenerDatosGrafica();
    });
  }

  ngAfterViewInit(): void {
    this.crearGrafico();
  }

  obtenerDatosGrafica() {
    if (this.objetivoUniqueId) {
      this.chartService
        .FindChartByUniqueId(this.objetivoUniqueId)
        .then((data) => {
          this.chartData = data;
          this.totalObjetivos = data.total_individuals;
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
    if (ctx && this.chartData) {
      const { total_individuals, targeted_individuals, percentage } =
        this.chartData;

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Porcentaje'],
          datasets: [
            {
              label: 'Porcentaje',
              data: [percentage],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Objetivos Individuales',
              data: [total_individuals],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label: 'Objetivos Alcanzados',
              data: [targeted_individuals],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const datasetIndex = context.datasetIndex;
                  const index = context.dataIndex;
                  const value = context.dataset.data[index];

                  if (datasetIndex === 0) {
                    if (Array.isArray(value)) {
                     return `${value[0].toFixed(0)}%`; // Redondear el primer elemento del array del porcentaje a 0 decimales
                    } else {
                     return `${value?.toFixed(0)}%`; // Redondear el valor del porcentaje a 0 decimales
                    }
                  } else {
                    if (typeof value === 'number') {
                      const totalObjetivos = this.totalObjetivos || 0;
                      const percentage = (
                        (value / totalObjetivos) *
                        100
                      ).toFixed(2);
                      return `${value} (${percentage}%)`;
                    } else {
                      return '';
                    }
                  }
                },
              },
            },
          },
        },
      });
    }
  }
}
