import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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

  constructor(
    private router: Router,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  
    this.nameUser = 'David Santiago Tuta Diaz';
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.title = !this.router.url.split('/')[2] ? '¡Bienvenido!' : this.router.url.split('/')[2]; 
  
    }, 500);
  } 

  routers(url: string){
    this.router.navigateByUrl('/admin'+url);
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
