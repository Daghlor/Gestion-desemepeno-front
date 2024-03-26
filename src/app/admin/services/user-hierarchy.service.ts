import { Injectable } from '@angular/core';
import { LocalService } from 'src/app/config/local.service';
import { api } from 'src/app/config/axios.config';

@Injectable({
  providedIn: 'root'
})
export class UserHierarchyService {
  token?: string;

  constructor(private Local: LocalService) { }

  create(body: any) {
    this.token = this.Local.findDataLocal('token');
    return api.post(`/user-hierarchies/create`, body, {
      headers: { Authorization: "Bearer " + this.token }
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response;
      });
  }

  getAll() {
    this.token = this.Local.findDataLocal('token');
    return api.post(`/user-hierarchies/getAll`, {}, {
      headers: { Authorization: "Bearer " + this.token }
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response;
      });
  }

  findOne(uuid: string) {
    this.token = this.Local.findDataLocal('token');
    return api.get(`/user-hierarchies/getOne/${uuid}`, {
      headers: { Authorization: "Bearer " + this.token }
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response;
      });
  }

  findAllByUserUniqueId(uuid: string) {
    this.token = this.Local.findDataLocal('token');
    return api.get(`/user-hierarchies/FindAllByUserUniqueId/${uuid}`, {
      headers: { Authorization: "Bearer " + this.token }
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response;
      });
  }

  delete(uuid: string) {
    this.token = this.Local.findDataLocal('token');
    return api.delete(`/user-hierarchies/delete/${uuid}`, {
      headers: { Authorization: "Bearer " + this.token }
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response;
      });
  }

  update(uuid: string, body: any) {
    this.token = this.Local.findDataLocal('token');
    return api.put(`/user-hierarchies/update/${uuid}`, body, {
      headers: { Authorization: "Bearer " + this.token }
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response;
      });
  }
}
