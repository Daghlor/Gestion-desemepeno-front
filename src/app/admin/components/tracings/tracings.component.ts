import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-tracings',
  templateUrl: './tracings.component.html',
  styleUrls: ['./tracings.component.scss']
})
export class TracingsComponent implements OnInit {
  comment: string = '';
 
  constructor(
    public dialogRef: MatDialogRef<TracingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.comment = '';
  }

  closeModal(): void {
    this.comment = '';
    this.dialogRef.close();
  }

}
