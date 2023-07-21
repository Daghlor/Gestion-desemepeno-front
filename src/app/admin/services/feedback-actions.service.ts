import { Injectable } from '@angular/core';
import { api } from "src/app/config/axios.config";
import { LocalService } from 'src/app/config/local.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackActionsService {
  token?: string;
  constructor(
    private Local: LocalService
  ) { }

  Create(body: any) {
    this.token = this.Local.findDataLocal('token');
    return api.post(`/feedback/create`, body, {
      headers:{Authorization: "Bearer" + this.token}
    })
      .then((res) => res.data)
      .catch((err) => {
      throw err.response
    })
  }
}
