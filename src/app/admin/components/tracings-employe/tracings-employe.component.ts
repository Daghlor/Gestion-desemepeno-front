import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrackingService } from '../../services/tracking.service';

@Component({
  selector: 'app-tracings-employe',
  templateUrl: './tracings-employe.component.html',
  styleUrls: ['./tracings-employe.component.scss']
})
export class TracingsEmployeComponent implements OnInit {

  comment_employee: string = '';
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<TracingsEmployeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private trackingAPI:TrackingService
  ) { }

  ngOnInit(): void {
    this.comment_employee = '';
    this.errorMessage = '';
  }

   closeModal(): void {
    this.comment_employee = '';
    this.dialogRef.close();
   }


}
