import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/admin/services/auth.service';
import { UsersService } from 'src/app/admin/services/users.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { IndividualService } from 'src/app/admin/services/individual.service';
import { ConfirmModalComponent } from '../..';
import { FeedbackActionsService } from 'src/app/admin/services/feedback-actions.service';
import { TrainingActionsService } from 'src/app/admin/services/training-actions.service';

// ESTE ES EL TS DONDE ES LA PARTE LOGICA DE LA VISTA FORMULARIOS DE USUARIO
@Component({
	selector: 'app-users-form',
	templateUrl: './users-form.component.html',
	styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
	// SE DEFINE VARIABLES LOCALES
	titleButton: string = 'Registrar';
	photo?: string;
	name?: string;
	lastName?: string;
	identify?: number;
	phone?: number;
	email?: string;
	password?: string;
	passwordVerify?: string;
	address?: string;
	city?: string;
	dateBirth?: any;
	employment_id?: number;
	company_id?: number;
	role_id?: number;
	rolesView: any = [];

	listRoles: any = [];
	listCompany: any = [];
	listEmployments: any = [];
	allEmployments: any = [];

	params: any;
	unique_id?: string;
	type?: string;
	changeLogo: boolean = false;

	typePasswordVerify: string = 'password';
	showPasswordVerify: boolean = false;
	iconPasswordVerify: string = 'visibility';
	typePassword: string = 'password';
	showPassword: boolean = false;
  iconPassword: string = 'visibility';

  individualsData: any[] = [];
  feedbackData: any[] = [];
  trainingData: any[] = [];

  orderColumn?: string;
  orderType?: string;
  actualPage: number = 1;
  pageSize: number = 10;

  initialTab: number = 1;
currentTab: number = 1;
optionsTabs: any = [{
  code: 1,
  name: 'Mi perfil',
  show: true,
  disabled: false,
},{
  code: 2,
  name: 'Mis planes',
  show: true,
  disabled: false,
    },]


	constructor(
		// SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
		private authApi: AuthService,
		private userApi: UsersService,
		private snack: SnackbarService,
		private activeRouter: ActivatedRoute,
		private router: Router,
    private Local: LocalService,
    private individualAPI: IndividualService,
    private FeebackAPI: FeedbackActionsService,
    private TrainingAPI: TrainingActionsService,

  ) { }


  async ngOnInit() {
    await this.getAllList();

    this.params = this.activeRouter.snapshot.params;
    this.unique_id = this.params.uuid;
    this.type = !this.params.type ? null : this.params.type;

    if (this.unique_id) {
      this.titleButton = 'Actualizar';
      await this.findData();
    }

    const userInfo = JSON.parse(this.Local.findDataLocal('info_user'));


    const requiredPermissions = ['list_my_objectives_strategics', 'list_my_objectives_individuals'];

    const hasRequiredPermissions = this.Local.validateArrayPermission(requiredPermissions);

    if (hasRequiredPermissions) {
    // El usuario tiene los permisos necesarios, puedes cargar los datos y habilitar las funcionalidades.

    // Cargar objetivos individuales del usuario actual sin paginación
    if (this.unique_id) {
      this.loadIndividualsData(this.unique_id);
      this.loadTrainingData(this.unique_id);
      this.loadFeedbackData(this.unique_id);
    }


    const paginate = {
      paginate: this.pageSize, // Deja la paginación si la necesitas en otros lugares de tu componente
      page: this.actualPage,
      column: this.orderColumn || 'title',
      direction: this.orderType || 'asc',
      search: {
        nameUser: this.name,
        user_id: null,
        company_id: null,
        state_id: 1,
        areas_id: null
      }
    };

  } else {
    // El usuario no tiene los permisos necesarios, puedes mostrar un mensaje de error o redirigirlo a otra página.
    console.log('El usuario no tiene los permisos necesarios para acceder a esta funcionalidad.');
    // Puedes redirigir al usuario a una página de acceso denegado o tomar otra acción apropiada.
  }
  }



  async loadIndividualsData(unique_id: string) {
  try {
    // Llama al servicio para obtener los objetivos individuales del usuario actual sin paginación
    const individualsDataResponse: any = await this.individualAPI.FindAllByUserId(unique_id);

    // individualsDataResponse debería contener todos los objetivos individuales del usuario
    this.individualsData = individualsDataResponse.data;
  } catch (error) {
    console.error('Error al cargar objetivos individuales:', error);
    // Manejo de errores
  }
  }

  async loadTrainingData(unique_id: string) {
  try {
    // Llama al servicio para obtener los objetivos individuales del usuario actual sin paginación
    const trainingDataResponse: any = await this.TrainingAPI.FindAllByUserId(unique_id);

    // individualsDataResponse debería contener todos los objetivos individuales del usuario
    this.trainingData = trainingDataResponse.data;
  } catch (error) {
    console.error('Error al cargar las acciones de formacion:', error);
    // Manejo de errores
  }
  }

  async loadFeedbackData(unique_id: string) {
  try {
    // Llama al servicio para obtener los objetivos individuales del usuario actual sin paginación
    const feedbackDataResponse: any = await this.FeebackAPI.FindAllByUserId(unique_id);

    // individualsDataResponse debería contener todos los objetivos individuales del usuario
    this.feedbackData = feedbackDataResponse.data;
  } catch (error) {
    console.error('Error al cargar las acciones de retroalimentacion:', error);
    // Manejo de errores
  }
}


	// FUNCION PARA CAMBIAR FOTO DE PERFIL
	async changePhoto(photo: any) {
		const file: File = photo.files[0];

		if (!file) {
			return this.snack.viewsnack('No ha seleccionado ninguna imagen', 'Error')
		}
		const reader = new FileReader();

		await reader.addEventListener('load', async (event: any) => {
			this.photo = event.target.result
			this.changeLogo = true;
		});

		await reader.readAsDataURL(file);
	}

	// FUNCION PARA ELIMINAR UN ROL DE UN USUARIO
	deleteRoles(index: number) {
		console.log(this.rolesView[index]);

		if (this.rolesView[index].sync) {
			this.rolesView[index].delete = true;
		} else {
			this.rolesView.splice(index, 1);
		}
	}

	// FUNCION PARA CAMBIAR EL TIPO DE CONTRASEÑA
	passVisible() {
		this.showPassword = !this.showPassword;
		if (this.showPassword) {
			this.typePassword = 'text';
			this.iconPassword = 'visibility_off';
		} else {
			this.typePassword = 'password';
			this.iconPassword = 'visibility';
		}
	}

	// FUNCION PARA OBETENER EL ROL, LA EMPRESA Y EL CARGO ASOCIADO AL USUARIO
	getAllList() {
		this.authApi.FindData().then((res: any) => {
			this.listRoles = res.roles;
			this.listCompany = res.companies;
			this.allEmployments = res.employments;
		})
	}

	// FUNCION PARA AGREGAR ROL A UN USUARIO CON VERIFICACION
	async addRoles() {
		let data: any = this.role_id;
		for (let i = 0; i < this.rolesView.length; i++) {
			if (this.rolesView[i].id == data.id) {
				this.role_id = 0;
				await this.snack.viewsnack('Ese rol ya esta asociado al usuario', 'error');
				return;
			}
		}

		data.sync = false;
		data.delete = false;
		this.rolesView.push(this.role_id);
		this.role_id = 0;
	}

	// FUNCION PARA CAMBIAR LA EMPRESA ASOCIADA DE UN USUARIO
	changeCompany() {
		this.listEmployments = [];
		this.employment_id = 0;

		for (let i = 0; i < this.allEmployments.length; i++) {
			if (this.allEmployments[i].company_id == this.company_id) {
				this.listEmployments.push(this.allEmployments[i]);
			}
		}
	}

	// FUNCION PARA ENCONTRAR UN SOLO USUARIO CON TODOS SUS DATOS
	findData() {
		this.userApi.FindOne(this.unique_id || '').then((res: any) => {
			this.listEmployments = [];
			this.company_id = res.data.company_id;

			for (let i = 0; i < this.allEmployments.length; i++) {
				if (this.allEmployments[i].company_id == this.company_id) {
					this.listEmployments.push(this.allEmployments[i]);
				}
			}

			this.photo = res.data.photo;
			this.changeLogo = false;
			this.name = res.data.name;
			this.lastName = res.data.lastName;
			this.identify = res.data.identify;
			this.phone = res.data.phone;
			this.email = res.data.email;
			this.address = res.data.address;
			this.city = res.data.city;
			this.dateBirth = new Date(moment(res.data.dateBirth, 'DD/MM/YYYY').format('MM/DD/YYYY'));
			this.employment_id = res.data.employment_id;

			for (let i = 0; i < res.data.roles.length; i++) {
				res.data.roles[i].sync = true;
				res.data.roles[i].delete = false;
				this.rolesView.push(res.data.roles[i]);
			}

		});
	}

	// FUNCION PARA CREAR O ACTUALIZAR UN USUARIO CON VERIFICACION EN LOS CAMPOS
	async saveData() {
		if (!this.name) {
			return this.snack.viewsnack('Hace Falta los Nombres', 'ERROR');
		}
		if (!this.lastName) {
			return this.snack.viewsnack('Hace Falta los Apellidos', 'ERROR');
		}
		if (!this.identify) {
			return this.snack.viewsnack('Hace Falta la Identificación', 'ERROR');
		}
		if (!this.dateBirth) {
			return this.snack.viewsnack('Hace Falta la Fecha de Nacimiento', 'ERROR');
		}
		if (!this.email) {
			return this.snack.viewsnack('Hace Falta el email', 'ERROR');
		}
		if (this.email) {
			let emailValidate;
			await this.snack.validateEmail(this.email).then((res: boolean) => {
				emailValidate = res;
			});

			if (!emailValidate) {
				return this.snack.viewsnack('El email de un usuario tiene un formato inválido', 'error');
			}
		}
		if (!this.phone) {
			return this.snack.viewsnack('Hace Falta el Teléfono', 'ERROR');
		}
		if (!this.address) {
			return this.snack.viewsnack('Hace Falta la Dirección', 'ERROR');
		}
		if (!this.company_id) {
			return this.snack.viewsnack('Hace Falta la Empresa', 'ERROR');
		}
		if (!this.employment_id) {
			return this.snack.viewsnack('Hace Falta el Cargo', 'ERROR');
		}
		if (this.rolesView.length == 0) {
			return this.snack.viewsnack('Hace Falta Asignarle Roles', 'ERROR');
		}


		if (!this.unique_id) {
			this.userApi.Create({
				photo: this.changeLogo ? this.photo : "",
				name: this.name,
				lastName: this.lastName,
				identify: this.identify,
				dateBirth: moment(this.dateBirth).format('DD/MM/YYYY'),
				phone: this.phone,
				email: this.email,
				address: this.address,
				city: this.city,
				roles: this.rolesView,
				employment_id: this.employment_id,
				company_id: this.company_id
			}).then((res: any) => {
				if (!res.res) {
					this.snack.viewsnack(res.data, 'error');
				} else {
					this.snack.viewsnack(res.data.msg, 'success');
					this.router.navigate(['admin/usuarios']);
				}
			})
		} else {
			this.userApi.Update(this.unique_id, {
				photo: this.changeLogo ? this.photo : "",
				name: this.name,
				lastName: this.lastName,
				identify: this.identify,
				dateBirth: moment(this.dateBirth).format('DD/MM/YYYY'),
				phone: this.phone,
				email: this.email,
				address: this.address,
				city: this.city,
				roles: this.rolesView,
				employment_id: this.employment_id,
				company_id: this.company_id,
				password: this.password
			}).then((res: any) => {
				if (!res.res) {
					this.snack.viewsnack(res.data, 'error');
				} else {
					this.snack.viewsnack(res.data, 'success');
					this.router.navigate(['admin/usuarios']);
				}
			})
		}
  }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
