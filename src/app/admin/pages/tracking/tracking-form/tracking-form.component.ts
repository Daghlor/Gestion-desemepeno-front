import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackingService } from 'src/app/admin/services/tracking.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { TracingsComponent } from "src/app/admin/components/tracings/tracings.component";
import * as moment from 'moment';

@Component({
  selector: 'app-tracking-form',
  templateUrl: './tracking-form.component.html',
  styleUrls: ['./tracking-form.component.scss']
})
export class TrackingFormComponent implements OnInit {
  params: any;
  unique_id?: string;
  listObjetives: any = [];
  userData: any;

  constructor(
    private trackingAPI: TrackingService,
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
    this.listObjetives = [];
    this.trackingAPI.FindOne(this.unique_id || '').then((res:any)=>{
      for (let i = 0; i < res.data.length; i++) {
        for (let o = 0; o < res.data[i].tracing.length; o++) {
          res.data[i].tracing[o].created_at = moment(res.data[i].tracing[o].created_at).format('YYYY/MM/DD HH:mm:ss');
        }
      }

      this.userData = res.user;
      this.listObjetives = res.data;
    });
  }

  openModalTracing(item: any){
    const dialogRef = this.dialog.open(TracingsComponent, {
      width: '600px',
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        this.snack.viewsnack('Hace falta el comentario', 'error');
        return;
      }else{
        const body = {
          individual_id: item.id,
          comment: result
        }
        this.trackingAPI.Create(body).then((res)=>{
          this.snack.viewsnack(res.data.msg, 'success');
          this.findData();
        });
      }
    });
  }
}
