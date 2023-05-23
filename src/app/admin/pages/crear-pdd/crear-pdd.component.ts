import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-crear-pdd',
  templateUrl: './crear-pdd.component.html',
  styleUrls: ['./crear-pdd.component.scss']
})
export class CrearPDDComponent implements OnInit {
  public chartType: string = 'bar';
  public chartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public chartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public chartOptions: any = {
    responsive: true
  };

  constructor() { }

  ngOnInit(): void {
  }

}
