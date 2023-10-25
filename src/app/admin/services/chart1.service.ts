import { Injectable } from '@angular/core';
import { api } from 'src/app/config/axios.config';
import { LocalService } from 'src/app/config/local.service';
import { Observable, from } from 'rxjs';

// SERVICIO QUE CREA LAS 6 GRAFICAS MANDANDO SOLICITUDES AL BACK
@Injectable({
  providedIn: 'root'
})
export class Chart1Service {
  token?: string;

  constructor(
    private Local: LocalService
  ) { }

  // METODO GET PARA OBTENER LOS DATOS DE LA GRAFICA 1
  FindChart1(uuid: string): Observable<any> {
    this.token = this.Local.findDataLocal('token');
    return from(
    api.get(`/percentage/countIndividualsAlignedWithStrategics/${uuid}`, {
      headers: { Authorization: "Bearer " + this.token }
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  );
  }

  // METODO POST PARA OBTENER LOS DATOS DE LA GRAFICA 2
  FindChart2(): Observable<any> {
    this.token = this.Local.findDataLocal('token');
    return from( // Convertimos la Promesa a un Observable
      api.post(`/percentage/getTotal`, {
        "paginate": 10,
        "page": 1,
        "column": "mission",
        "direction": "desc",
        "search": {
          "description": "",
          "company_id": ""
        }
      },
        {
          headers: { Authorization: "Bearer " + this.token } // Añadido espacio después de "Bearer"
        })
        .then((res) => res.data)
        .catch((err) => {
          throw err.response
        })
    );
  }

  // METODO POST PARA OBTENER LOS DATOS DE LA GRAFICA 3
  FindChart3(): Observable<any> {
    this.token = this.Local.findDataLocal('token');
    return from( // Convertimos la Promesa a un Observable
      api.post(`/percentage/countClosedVsApprovedIndividuals`, {
        "paginate": 10,
        "page": 1,
        "column": "mission",
        "direction": "desc",
        "search": {
          "description": "",
          "company_id": ""
        }
      },
        {
          headers: { Authorization: "Bearer " + this.token } // Añadido espacio después de "Bearer"
        })
        .then((res) => res.data)
        .catch((err) => {
          throw err.response
        })
    );
  }

  // METODO POST PARA OBTENER LOS DATOS DE LA GRAFICA 4
  FindChart4(): Observable<any> {
    this.token = this.Local.findDataLocal('token');
    return from( // Convertimos la Promesa a un Observable
      api.post(`/percentage/countPendingVsApprovedVsUsers`, {
        "paginate": 10,
        "page": 1,
        "column": "mission",
        "direction": "desc",
        "search": {
          "description": "",
          "company_id": ""
        }
      },
        {
          headers: { Authorization: "Bearer " + this.token } // Añadido espacio después de "Bearer"
        })
        .then((res) => res.data)
        .catch((err) => {
          throw err.response
        })
    );
  }

  // METODO GET PARA OBTENER LOS DATOS DE LA GRAFICA 5
  FindChart5(uuid: string): Observable<any> {
    this.token = this.Local.findDataLocal('token');
    return from(
    api.get(`/percentage/FindOne/${uuid}`, {
      headers: { Authorization: "Bearer " + this.token }
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  );
  }

  // METODO GET PARA OBTENER LOS DATOS DE LA GRAFICA 6
  FindChart6(uuid: string): Observable<any> {
    this.token = this.Local.findDataLocal('token');
    return from(
    api.get(`/percentage/calculateResultsForStrategicObjective/${uuid}`, {
      headers: { Authorization: "Bearer " + this.token }
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response
    })
  );
  }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta

