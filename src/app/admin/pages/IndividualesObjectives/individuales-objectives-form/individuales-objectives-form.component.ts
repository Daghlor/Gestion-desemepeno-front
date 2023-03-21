import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/services/auth.service';
import { IndividualService } from 'src/app/admin/services/individual.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';

@Component({
  selector: 'app-individuales-objectives-form',
  templateUrl: './individuales-objectives-form.component.html',
  styleUrls: ['./individuales-objectives-form.component.scss']
})
export class IndividualesObjectivesFormComponent implements OnInit {
  title?: string;
  weight: number = 0;
  strategic_id?: number;
  objetive?: string;
  
  listStrategics: any = [];
  points: number = 0;

  constructor(
    private authApi: AuthService,
    private router: Router,
    private snack: SnackbarService,
    private Local: LocalService,
    private individualAPI: IndividualService,
  ) { }

  ngOnInit(): void {
    this.points = JSON.parse(this.Local.findDataLocal('points'));
    this.findList();
  }

  findList(){
    this.authApi.FindData().then((res:any)=>{
      this.listStrategics = res.strategics;
    });
  }

  async saveData(){
    let totalPoint = JSON.parse(this.Local.findDataLocal('points')) - this.weight;

    if(!this.title){
      return this.snack.viewsnack('Hace Falta el Titulo', 'ERROR');
    }
    if(!this.strategic_id){
      return this.snack.viewsnack('Hace Falta el Objetivo Estratégico', 'ERROR');
    }
    if(!this.weight){
      return this.snack.viewsnack('Hace Falta el Puntaje', 'ERROR');
    }
    if(!this.objetive){
      return this.snack.viewsnack('Hace Falta el Objetivo', 'ERROR');
    }
    if(totalPoint < 0){
      return this.snack.viewsnack(`El Puntaje es Superior al Puntaje Disponible (${totalPoint})`, 'ERROR');
    }
   
    
    const data = {
      title: this.title,
      strategic_id: this.strategic_id,
      weight: this.weight,
      objetive: this.objetive
    }

    this.individualAPI.Create(data).then((res:any)=>{
      this.Local.createDataLocal('points', JSON.stringify(totalPoint));
      this.snack.viewsnack(res.data.msg, 'success');
      this.router.navigate(['admin/objetivos_individuales']);
    });
  }

}
