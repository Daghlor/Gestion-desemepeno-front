import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { FeedbackActionsService } from 'src/app/admin/services/feedback-actions.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';

@Component({
  selector: 'app-feeback-actions',
  templateUrl: './feeback-actions.component.html',
  styleUrls: ['./feeback-actions.component.scss']
})
export class FeebackActionsComponent implements OnInit {

  @ViewChild(MatAccordion) accordion?: MatAccordion;
  title: string = '';
  listFeedback: any[] = [];
  validateTime: any;
  validateTime2: any;
  titleButton: string = 'Crear';
  showList: boolean = false;
   showForm: boolean = false;

  constructor(
    private FeebackAPI: FeedbackActionsService,
    private snack: SnackbarService,
    private Local: LocalService,
  ) { }

  ngOnInit(): void {
    this.title = '';
  }





  loadFeedbacks() {
    this.FeebackAPI.FindAll({}).then((response: any) => {
      this.listFeedback = response; // Asignar la respuesta al array listFeedback
    }).catch((error) => {
      // Manejar errores si es necesario
    });
  }

  changeUpdate(index: number, type: string) {
    clearTimeout(this.validateTime2);
    this.validateTime2 = setTimeout(() => {
      if (type == 'title' && !this.listFeedback[index].update && this.listFeedback[index].sync) {
        this.listFeedback[index].update = true;
      }
    }, 1500);
  }


  addFeedback() {
    this.showForm = true;
    if (!this.validateFeedback()) {
      return;
    }

    this.listFeedback.push({
      title: '',
      update: false,
      create: true,
      sync: false,
      delete: false
    });

    this.showList = true;

  }

  deleteFeedback(index: number) {
    // Lógica para eliminar un elemento de la listas
    this.listFeedback.splice(index, 1);

  }


 validateFeedback() {
  for (let i = 0; i < this.listFeedback.length; i++) {
    if (!this.listFeedback[i].title) {
      this.snack.viewsnack('Hace falta la descripción de la acción de retroalimentación', 'error');
      return false;
    }
  }
  return true;
}


async saveData() {
  if (!this.title) {
    return this.snack.viewsnack('Hace Falta el Titulo', 'ERROR');
  }

  const data = {
    title: this.title
  };

  try {
    const response = await this.FeebackAPI.Create(data);
    if (response.res && response.data) {
      // Mostrar un mensaje de éxito
      this.snack.viewsnack(response.data.msg, 'success');

      // Actualizar la lista de retroalimentación desde el backend
      await this.loadFeedbacks();
    } else {
      // Mostrar un mensaje de error si la respuesta no es la esperada
      this.snack.viewsnack('Hubo un error al crear la Accion de Retroalimentación', 'error');
    }
  } catch (error) {
    // Manejar errores aquí
    this.snack.viewsnack('Hubo un error al crear la Accion de Retroalimentación', 'error');
  }

  this.title = '';
  this.showList = false;
}


}
