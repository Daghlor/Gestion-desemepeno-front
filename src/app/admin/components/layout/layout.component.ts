import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  title?: string;
  validateTitle?: any = [];
  nameUser?: any = '';
  option?: number;
  photo?: string;
  closeTimeOptions: any;

  constructor(
    private router: Router,
    private Local: LocalService,
    private snack: SnackbarService,
  ) {}

  ngOnInit(): void {
    let userInfo = JSON.parse(this.Local.findDataLocal('info_user'));
    this.nameUser = userInfo.name +' '+ userInfo.lastName;
    this.photo = !userInfo.photo ? 'assets/img/usuarioPNG.png' : userInfo.photo;
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.title = !this.router.url.split('/')[2] ? '¡Bienvenido!' : this.router.url.split('/')[2];
      this.validateTitle = this.title.split('_');
    }, 500);
  } 

  routers(url: string){
    this.option = 0;
    this.router.navigateByUrl('/admin'+url);
  }

  redirectForm(url: string){
    this.snack.redirect(url);
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
