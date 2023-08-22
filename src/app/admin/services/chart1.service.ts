import { Injectable } from '@angular/core';
import { api } from 'src/app/config/axios.config';
import { LocalService } from 'src/app/config/local.service';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Chart1Service {
  token?: string;

  constructor(
    private Local: LocalService
  ) { }

  FindChart1(): Observable<any> { // Cambiado el tipo de retorno a Observable<any>
    this.token = this.Local.findDataLocal('token');
    return from( // Convertimos la Promesa a un Observable
      api.post(`/percentage/countIndividualsAlignedWithStrategics`, {
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
}

