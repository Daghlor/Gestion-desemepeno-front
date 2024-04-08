import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IndividualService } from 'src/app/admin/services/individual.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { ConfirmModalComponent } from 'src/app/admin/components/confirm-modal/confirm-modal.component';
import { ChangeStateDialogComponentComponent } from '../..';


// ESTE ES EL .TS DONDE ESTA LA PARTE LOGICA DE LA VISTA TODOS LOS OBJETIVOS INDIVIDUALES
@Component({
  selector: 'app-individuales-objectives-all',
  templateUrl: './individuales-objectives-all.component.html',
  styleUrls: ['./individuales-objectives-all.component.scss']
})
export class IndividualesObjectivesAllComponent implements OnInit {
  // SE DEFINE VARIABLES LOCALES Y EL MAQUETADO DE LA TABLA
  states: { id: number, description: string }[] = [];
  currentUser: any | null = null;
  name: string = '';
  state: string = '';
  selectedState: string | null = null;  // O el tipo de dato adecuado para el ID del estado
  unique_id?: string;
  selectedCompany: number | null = null;
  companies: any[] = [];
  loading: boolean = false;
  paginator: boolean = true;
  length: number = 0;
  orderColumn?: string;
  orderType?: string;
  actualPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 15, 20, 25, 50];
  dataSource: any = new MatTableDataSource();
  columns = [{
    columnDef: 'title_strategics',
    header: 'Objetivo Estratégico',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.title_strategics}`,
  },{
    columnDef: 'title',
    header: 'Objetivo Individual',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.title}`,
  },{
    columnDef: 'weight',
    header: 'Peso %',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.weight}`,
  },{
    columnDef: 'nameUser',
    header: 'Usuario',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.nameUser}`,
  },{
    columnDef: 'state',
    header: 'Estado',
    sort: true,
    type: 'text',
    cell: (element: any) => `${element.state}`,
    },{
    columnDef: 'icons',
    header: '',
    sort: true,
    type: 'icons',
    cell: (element: any) => `${element.icons}`,
  }];

  constructor(
    // SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
    private individualAPI: IndividualService,
    private router: Router,
    private snack: SnackbarService,
    private Local: LocalService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.getAllStates();
    this.findData();

  }

  loadCurrentUser() {
  // Recuperar los datos del usuario actualmente logeado desde el servicio LocalService
  const currentUserData = this.Local.findDataLocal('info_user');

  if (currentUserData) {
    // Si se encuentran datos, convertir la cadena JSON a un objeto JavaScript
    this.currentUser = JSON.parse(currentUserData);
    console.log('Datos del usuario actual:', this.currentUser); // Agregar console.log para verificar los datos del usuario
  } else {
    console.log('No se encontraron datos del usuario actual.');
  }
  }

  findData() {
  console.log('Buscando datos...');
  if (!this.currentUser || !this.currentUser.id) {
    console.error('No se pudo obtener el ID del usuario actual.');
    return;
  }

  const userId = this.currentUser.id;

  const paginate = {
    paginate: this.pageSize,
    page: this.actualPage,
    column: this.orderColumn || 'title',
    direction: this.orderType || 'asc',
    search: {
      nameUser: this.name,
      user_id: null,
      company_id: null,
      state_id: this.selectedState,  // Usar selectedState en lugar de state
      areas_id: null
    }
  };

  this.individualAPI.FindAllByHierarchy(userId, paginate).then((res: any) => {
    // Verificar si hay datos en la respuesta
    if (res && res.data && res.data.objetives) {
      // Asignar los datos de los objetivos individuales al origen de datos de la tabla
      // Agregar iconos a cada registro de objetivos individuales
      res.data.objetives.forEach((objective: any) => {
        objective.icons = ['done'];
      });
      this.dataSource = new MatTableDataSource(res.data.objetives);
      this.length = res.data.total;
    } else {
      console.error('No se encontraron datos de objetivos individuales en la respuesta.');
    }
  }).catch((error: any) => {
    console.error('Error al buscar objetivos individuales:', error);
    // Manejar errores
  });
}






  // FUNCION QUE BUSCA TODOS LOS OBJETIVOS INDIVIDUALES Y LOS PONE EN LA TABLA
  // findData() {
  //   const paginate = {
  //     paginate: this.pageSize,
  //     page: this.actualPage,2
  //     column: this.orderColumn || 'title',
  //     direction: this.orderType || 'asc',
  //     search: {
  //       nameUser: this.name,
  //       user_id: null,
  //       company_id: null,
  //       state_id: this.selectedState,  // Usar selectedState en lugar de state
  //       areas_id: null
  //     }
  //   }

  //   this.individualAPI.FindAll(paginate).then((res:any)=>{
  //     for (let i = 0; i < res.data.objetives.length; i++){
  //       res.data.objetives[i].icons = ['delete','done'];
  //     }
  //     console.log("Datos recibidos:", res.data.objetives);
  //     this.dataSource = res.data.objetives;
  //     this.length = res.data.total;
  //   });
  // }


  // FUNCION QUE BUSCA TODOS LOS OBJETIVOS INDIVIDUALES Y LOS PONE EN LA TABLA



  getAllStates() {
  this.individualAPI.GetAllStates().then((res: any) => {
    // Mapear los datos del servidor para que coincidan con el formato esperado
    this.states = res.data.map((state: any) => ({
      id: state.id,
      description: state.description
    }));
  }).catch((err: any) => {
    console.error('Error al obtener los estados:', err);
  });
}


  selectedStateChange() {
  this.findData(); // Llama a la función para filtrar los datos cuando se cambia el estado seleccionado
}

  applyFilters() {
  console.log("Aplicando filtros...");
  this.findData(); // Llama al método para filtrar los datos después de aplicar los filtros
}




  changeSort(item:any){
    this.orderColumn = item.active;
    this.orderType = item.direction;
    this.findData();
  }

  changePaginator(info: any) {
    console.log('Cambio de página detectado:', info);
    this.actualPage = info.pageIndex + 1;
    this.pageSize = info.pageSize;
    this.findData();
  }

  iconsFunction(event: any) {
    if (event.icon == 'edit') {
      this.router.navigateByUrl('admin/usuarios/form/' + this.unique_id + '/perfil');
    }
    else if (event.icon == 'delete') {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '250px',
        data: { message: '¿Estás seguro de que quieres eliminar este objetivo?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.individualAPI.Delete(event.data.unique_id).then((res: any) => {
            this.snack.viewsnack('El objetivo se elimino correctamente', 'Success');
            this.findData();
          })
        }
      })
    } else if (event.icon == 'done') {
  // Obtén el estado actual del objetivo individual usando el servicio FindOne
  this.individualAPI.FindOne(event.data.unique_id).then((individualData: any) => {
    const currentState = individualData.data.state_id; // Supongamos que el estado se encuentra en individualData.data.state_id

    // Abre el diálogo para cambiar el estado y pasa el estado actual como parte de los datos
    const dialogRef = this.dialog.open(ChangeStateDialogComponentComponent, {
      width: '250px',
      data: { objectiveId: event.data.unique_id, currentState: currentState }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snack.viewsnack('Estado cambiado correctamente', 'Success');
        this.findData();
      }
    });
  });
}
  }
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
