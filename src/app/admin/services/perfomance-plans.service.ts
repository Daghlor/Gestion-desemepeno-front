import { Injectable } from '@angular/core';
import { api } from "src/app/config/axios.config";
import { LocalService } from 'src/app/config/local.service';

@Injectable({
	providedIn: 'root'
})
export class PerfomancePlansService {
	token?: string;

	constructor(
		private Local: LocalService
	) { }

	// METODO POST PARA CREAR UN USUARIO
	Create(body: any) {
		this.token = this.Local.findDataLocal('token');
		return api.post(`/plans/create`, body, {
			headers: { Authorization: "Bearer " + this.token }
		})
			.then((res) => res.data)
			.catch((err) => {
				throw err.response
			})
	}

	// METODO POST PARA BUSCAR O TRAER TODOS LOS PLANES
	FindAll(body: any) {
		this.token = this.Local.findDataLocal('token');
		return api.post(`/plans/getAll`, body, {
			headers: { Authorization: "Bearer " + this.token }
		})
			.then((res) => res.data)
			.catch((err) => {
				throw err.response
			})
	}
}
