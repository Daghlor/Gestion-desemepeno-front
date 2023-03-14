import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StrategicsService } from 'src/app/admin/services/strategics.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { AuthService } from 'src/app/admin/services/auth.service';

@Component({
  selector: 'app-strategic-objectives-form',
  templateUrl: './strategic-objectives-form.component.html',
  styleUrls: ['./strategic-objectives-form.component.scss']
})
export class StrategicObjectivesFormComponent implements OnInit {
  title?: string;
  company_id?: number;
  areas_id?: number;
  mission?: string;
  vision?: string;

  allAreas: any = [];
  listAreas: any = [];
  listCompany: any = [];

  constructor(
    private authApi: AuthService,
    private strategicAPI: StrategicsService,
    private router: Router,
    private snack: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.getAllList();
  }

  getAllList(){
    this.authApi.FindData().then((res:any)=>{
      this.allAreas = res.areas;
      this.listCompany = res.companies;
    })
  }

  changeCompany(){
    this.listAreas = [];
    this.areas_id = 0;
 
    for (let i = 0; i < this.allAreas.length; i++) {
      if(this.allAreas[i].company_id == this.company_id){
        this.listAreas.push(this.allAreas[i]);
      }
    }
  }

  async saveData(){
    if(!this.title){
      return this.snack.viewsnack('Hace Falta el Titulo', 'ERROR');
    }
    if(!this.company_id){
      return this.snack.viewsnack('Hace Falta la Empresa', 'ERROR');
    }
    if(!this.areas_id){
      return this.snack.viewsnack('Hace Falta la Área', 'ERROR');
    }
    if(!this.mission){
      return this.snack.viewsnack('Hace Falta la Misión', 'ERROR');
    }
    if(!this.vision){
      return this.snack.viewsnack('Hace Falta la Visión', 'ERROR');
    }
    
    const data = {
      title: this.title,
      mission: this.mission,
      vision: this.vision,
      company_id: this.company_id,
      areas_id: this.areas_id
    }

    this.strategicAPI.Create(data).then((res:any)=>{
      this.snack.viewsnack(res.data.msg, 'success');
      this.router.navigate(['admin/objetivos_estrategicos']);
    });
  }
}
