import { Component, OnInit } from '@angular/core';
import { SnackbarService } from './config/snackbar.service';
import { Router } from '@angular/router';
import { LocalService } from './config/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private snack: SnackbarService,
    private local : LocalService,
  ){}

  ngOnInit() {
    this.tokens()
  }

  tokens(){
    let number = JSON.parse(this.local.findDataLocal('timeout')) || 0;

    setInterval(()=>{
      if(localStorage.getItem('token')){
        let expired = JSON.parse(this.local.findDataLocal('expired'));
        let totalMax = expired*60;
        number++
        localStorage.setItem('timeout', JSON.stringify(number))
        if(JSON.parse(this.local.findDataLocal('timeout'))>=totalMax){
          localStorage.clear();
          this.snack.viewsnack('Su sesion finalizo','Error')
          this.router.navigateByUrl('/login')
        }
      }
    },1000)
  }
  title = 'gestion-desempeno-front';
}
