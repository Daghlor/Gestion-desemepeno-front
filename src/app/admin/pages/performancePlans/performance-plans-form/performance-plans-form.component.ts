import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackbarService } from 'src/app/config/snackbar.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { TracingsComponent } from "src/app/admin/components/tracings/tracings.component";
import * as moment from 'moment';
import { PerfomancePlansService } from 'src/app/admin/services/perfomance-plans.service';
import { AuthService } from 'src/app/admin/services/auth.service';

@Component({
  selector: 'app-performance-plans-form',
  templateUrl: './performance-plans-form.component.html',
  styleUrls: ['./performance-plans-form.component.scss']
})
export class PerformancePlansFormComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES
  name?: string;
  term?: number;
  company_id?: string;

  listTerms: any = [3, 6, 12];
  listCompany: any = [];


  params: any;
  unique_id?: string;
  listObjetives: any = [];
  userData: any;

  constructor(
    // SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
    private perfomancePlansAPI: PerfomancePlansService,
    private authApi: AuthService,
    private snack: SnackbarService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.params = this.activeRouter.snapshot.params;
    this.unique_id = this.params.uuid;
    this.findData();
  }

  findData(){
    this.authApi.FindData().then((res:any)=>{
      this.listCompany = res.companies
    })
  }

  async saveData(){
    this.perfomancePlansAPI.Create({
      name: this.name,
      term: this.term,
      dateInit: moment().format('YYYY-MM-DD'),
      dateEnd: moment().add(this.term, 'months').format('YYYY-MM-DD'),
      company_id: this.company_id
    }).then((res:any)=>{
      console.log(res);
      
    })
  }




}
