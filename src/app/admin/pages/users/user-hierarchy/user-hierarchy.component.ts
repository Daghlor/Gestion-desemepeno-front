import { Component, OnInit } from '@angular/core';
import { UserHierarchyService } from '../../../services/user-hierarchy.service';
import { UsersService } from '../../../../services/users.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';

@Component({
  selector: 'app-user-hierarchy',
  templateUrl: './user-hierarchy.component.html',
  styleUrls: ['./user-hierarchy.component.scss']
})
export class UserHierarchyComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  currentUser: any | null = null;
  selectedUserIds: number[] = [];

   initialTab: number = 1;
currentTab: number = 1;
optionsTabs: any = [{
  code: 1,
  name: 'Seleccionar Jefe',
  show: true,
  disabled: false,
},{
  code: 2,
  name: 'Mis Colaboradores',
  show: true,
  disabled: false,
    }]


  constructor(
    private userService: UsersService,
    private userHierarchyService: UserHierarchyService,
    private local: LocalService,
    private snack: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.loadAllUsersWithoutHierarchy();
    this.loadCurrentUser();
  }

  loadCurrentUser() {
  // Recuperar los datos del usuario actualmente logeado desde el servicio LocalService
  const currentUserData = this.local.findDataLocal('info_user');

  if (currentUserData) {
    // Si se encuentran datos, convertir la cadena JSON a un objeto JavaScript
    this.currentUser = JSON.parse(currentUserData);
    console.log('Datos del usuario actual:', this.currentUser); // Agregar console.log para verificar los datos del usuario
  } else {
    console.log('No se encontraron datos del usuario actual.');
  }
}

 loadAllUsers() {
    this.userService.GetAllUsersWithoutHierarchy({})
      .then((res: any) => {
        console.log('Respuesta del servidor:', res);
        this.users = res.data;
      })
      .catch(error => {
        console.error('Error loading users:', error);
      });
  }

  validatePermissions(code: string): Boolean {
        return this.local.validatePermission(code) ? true : false;
    }

  loadAllUsersWithoutHierarchy() {
  this.userService.GetAllUsersWithoutHierarchy({})
    .then((res: any) => {
      console.log('Usuarios sin jerarquía:', res);
      this.users = res; // Asigna la lista de usuarios sin jerarquía
    })
    .catch(error => {
      console.error('Error al cargar los usuarios sin jerarquía:', error);
    });
}
//    loadAllUsers() {
//   this.userService.GetAllUsers({})
//     .then((res: any) => {
//       console.log('Respuesta del servidor:', res); // Imprime la respuesta en la consola
//       this.users = res.data;
//     })
//     .catch(error => {
//       console.error('Error loading users:', error);
//     });
// }


  onUserSelected(user: any) {
  const userId = user.id;
  const index = this.selectedUserIds.indexOf(userId);

  if (index === -1) {
    // Si el usuario no está seleccionado, lo agregamos a la lista
    this.selectedUserIds.push(userId);
    this.selectedUser = user; // Actualizamos el usuario seleccionado
  } else {
    // Si el usuario ya está seleccionado, lo eliminamos de la lista
    this.selectedUserIds.splice(index, 1);
    this.selectedUser = null; // Limpiamos el usuario seleccionado
  }
}


 onSaveHierarchy() {
    // Verifica que se haya seleccionado un usuario
    if (this.selectedUser) {
      // Crea el registro en la jerarquía de usuarios utilizando el servicio
      this.userHierarchyService.create({ user_id: this.selectedUser.id })
        .then((res: any) => {
          console.log('Registro de jerarquía creado:', res);
          // Limpia la selección después de crear el registro
          this.selectedUser = null;
          // Recargar la página para actualizar la lista de usuarios
          window.location.reload();
        })
        .catch(error => {
          console.error('Error creating hierarchy:', error);
        });
    } else {
      console.error('Debes seleccionar un usuario antes de guardar la jerarquía.');
    }
 }

onSaveSubHierarchy() {
  // Verifica que se haya seleccionado un usuario
  if (this.selectedUser && this.currentUser) {
    // Crea el registro en la jerarquía de usuarios utilizando el servicio
    console.log('Datos enviados para crear la jerarquía:', { user_id: this.selectedUser.id, parent_id: this.currentUser.id });
    this.userHierarchyService.create({ user_id: this.selectedUser.id, parent_id: this.currentUser.id })
      .then((res: any) => {
        console.log('Registro de jerarquía creado:', res);
        this.snack.viewsnack('Jerarquia creada con exito', 'success');
        // Limpia la selección después de crear el registro
        this.selectedUser = null;
        // Recargar la página para actualizar la lista de usuarios
        window.location.reload();
      })
      .catch(error => {
        console.error('Error creating hierarchy:', error);
      });
  } else {
    console.error('Debes seleccionar un usuario antes de guardar la jerarquía.');
  }
}


 isUserSelected(userId: number): boolean {
    return this.selectedUserIds.includes(userId);
  }

}
