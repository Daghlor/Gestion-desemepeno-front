import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  title?: string;
  nameUser?: string;
  option?: number;
  closeTimeOptions: any;

  constructor() { }

  ngOnInit(): void {
    this.title = '¡Bienvenido!';
    this.nameUser = 'David Santiago Tuta Diaz'
  }

  routers(n: number, url: string){

  }

  openOptions(n: number){
    if(n === this.option){
      this.option = 0;
    }else{
      this.option = n;
    }

    clearTimeout(this.closeTimeOptions); 
    this.closeTimeOptions = setTimeout(() => {
      this.option = 0;
    }, 5000);
  
  }

}
