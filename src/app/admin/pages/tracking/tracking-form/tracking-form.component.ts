import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackingService } from 'src/app/admin/services/tracking.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
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

  constructor(
    private trackingAPI: TrackingService,
    private snack: SnackbarService,
    private activeRouter: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.params = this.activeRouter.snapshot.params;
    this.unique_id = this.params.uuid;
    this.findData();
  }

  findData(){
    this.trackingAPI.FindOne(this.unique_id || '').then((res:any)=>{
      for (let i = 0; i < res.data.length; i++) {
        for (let o = 0; o < res.data[i].tracing.length; o++) {
          res.data[i].tracing[o].created_at = moment(res.data[i].tracing[o].created_at).format('YYYY/MM/DD HH:mm:ss');
        }
      }
        
      this.listObjetives = res.data;
      
    });
  }

}
