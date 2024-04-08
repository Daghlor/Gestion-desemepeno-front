import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { FeedbackActionsService } from 'src/app/admin/services/feedback-actions.service';
import { TrainingActionsService } from 'src/app/admin/services/training-actions.service';
import { IndividualService } from 'src/app/admin/services/individual.service';

@Component({
  selector: 'app-individuales-objectives-index',
  templateUrl: './individuales-objectives-index.component.html',
  styleUrls: ['./individuales-objectives-index.component.scss']
})
export class IndividualesObjectivesIndexComponent implements OnInit {

  unique_id?: string;

  individualsData: any[] = [];
  feedbackData: any[] = [];
  trainingData: any[] = [];

  constructor(
    private router: Router,
    private Local: LocalService,
    private snack: SnackbarService,
    private individualAPI: IndividualService,
    private FeebackAPI: FeedbackActionsService,
    private TrainingAPI: TrainingActionsService,
  ) { }

  async ngOnInit() {
  const userInfo = JSON.parse(this.Local.findDataLocal('info_user'));
  console.log(userInfo);
  this.unique_id = userInfo.unique_id;
  const unique_id = userInfo.unique_id; // Obtén el unique_id del objeto userInfo

  const requiredPermissions = ['list_my_objectives_strategics', 'list_my_objectives_individuals'];

  const hasRequiredPermissions = this.Local.validateArrayPermission(requiredPermissions);

  if (hasRequiredPermissions) {
    // El usuario tiene los permisos necesarios, puedes cargar los datos y habilitar las funcionalidades.

    // Llama a los métodos de carga de datos y pasa unique_id como argumento
    await this.loadIndividualsData(unique_id);
    await this.loadTrainingData(unique_id);
    await this.loadFeedbackData(unique_id);
  } else {
    // El usuario no tiene los permisos necesarios, puedes mostrar un mensaje de error o redirigirlo a otra página.
    console.log('El usuario no tiene los permisos necesarios para acceder a esta funcionalidad.');
    // Puedes redirigir al usuario a una página de acceso denegado o tomar otra acción apropiada.
  }
}



  redirectForm(url: string){
    this.snack.redirect(url);
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

  routers(url: string) {
        this.router.navigateByUrl('/admin' + url);
    }

  goToTrackinsg(): void {
        this.router.navigateByUrl('admin/mis_seguimientos/' + this.unique_id);
    }
}
