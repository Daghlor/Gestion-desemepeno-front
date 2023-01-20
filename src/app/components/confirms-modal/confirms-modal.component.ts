import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirms-modal',
  templateUrl: './confirms-modal.component.html',
  styleUrls: ['./confirms-modal.component.scss']
})
export class ConfirmsModalComponent implements OnInit {
  type: any;
  info: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(){
    console.log(this.data);
  }
  confirms(res:any){
    this.dialogRef.close(res);
  }
}