import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';

@Component({
  selector: 'app-individuales-objectives-index',
  templateUrl: './individuales-objectives-index.component.html',
  styleUrls: ['./individuales-objectives-index.component.scss']
})
export class IndividualesObjectivesIndexComponent implements OnInit {

  constructor(
    private router: Router,
    private Local: LocalService,
    private snack: SnackbarService,
  ) { }

  ngOnInit(): void {
  }


  redirectForm(url: string){
    this.snack.redirect(url);
  }
}
