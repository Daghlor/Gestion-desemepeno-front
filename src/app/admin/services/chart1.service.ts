import { Injectable } from '@angular/core';
import { api } from 'src/app/config/axios.config';
import { LocalService } from 'src/app/config/local.service';

@Injectable({
  providedIn: 'root'
})
export class Chart1Service {
  token?: string;

  constructor(
    private Local: LocalService
  ) { }

   FindChart(strategicId: string) {
    this.token = this.Local.findDataLocal('token');
    return api.get(`/percentage/calculate/${strategicId}`, {
      headers: {Authorization: "Bearer" + this.token}
    })
      .then((res) => res.data)
      .catch((err) => {
      throw err.response
    })
   }

   FindChartByUniqueId(uniqueId: string) {
    this.token = this.Local.findDataLocal('token');
    return api.post(`/percentage/calculatePercentage/${uniqueId}`, {
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
      headers: { Authorization: "Bearer " + this.token }
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response
      })
  }
}

