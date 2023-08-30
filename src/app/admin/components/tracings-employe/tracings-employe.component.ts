import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tracings-employe',
  templateUrl: './tracings-employe.component.html',
  styleUrls: ['./tracings-employe.component.scss']
})
export class TracingsEmployeComponent implements OnInit {

  comment_employee: { comment: string, weight: number } = { comment: '', weight: 0 };
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<TracingsEmployeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.comment_employee = { comment: '', weight: 0 };
    this.errorMessage = '';
  }

  closeModal(): void {
   this.dialogRef.close({
    comment: this.comment_employee.comment,
    weight: this.comment_employee.weight
  });
  }

}
