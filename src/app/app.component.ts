import { Component, OnInit } from '@angular/core';
import { SnackbarService } from './config/snackbar.service';
import { Router } from '@angular/router';
import { LocalService } from './config/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
  ){}

  ngOnInit() {

  }


  title = 'gestion-desempeno-front';
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
