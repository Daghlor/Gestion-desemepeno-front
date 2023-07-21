import { Component, OnInit } from '@angular/core';
import { FeedbackActionsService } from 'src/app/admin/services/feedback-actions.service';
import { LocalService } from 'src/app/config/local.service';
import { SnackbarService } from 'src/app/config/snackbar.service';

@Component({
  selector: 'app-feeback-actions',
  templateUrl: './feeback-actions.component.html',
  styleUrls: ['./feeback-actions.component.scss']
})
export class FeebackActionsComponent implements OnInit {
  title?: string;
  listFeedback?: any = [];
  validateTime: any;
validateTime2: any;

  constructor(
    private FeebackAPI: FeedbackActionsService,
    private snack: SnackbarService,
    private Local: LocalService,
  ) { }

  ngOnInit(): void {
     this.title = '';
  }

  changeUpdate(index: number, type: string){
    clearTimeout(this.validateTime2);
    this.validateTime2 = setTimeout(() => {
      if(type == 'title' && !this.listFeedback[index].update && this.listFeedback[index].sync){
        this.listFeedback[index].update = true;
      }
    }, 1500);
  }

  addFeedback(){
    if(!this.validateFeedback()){
      return;
    }

    this.listFeedback.unshift({
      id: null,
      unique_id: null,
      title: '',
      update: false,
      create: true,
      sync: false,
      delete: false
    });
  }

  validateFeedback(){
    let result = true;

    for (let i = 0; i < this.listFeedback.length; i++) {
      if(!this.listFeedback[i].title){
        this.snack.viewsnack('Hace falta la descripción de la accion de retroalimentacion', 'error');
        result = false;
      }
    }

    return result;
  }

  async saveData() {
    if(!this.title){
      return this.snack.viewsnack('Hace Falta el Titulo', 'ERROR');
    }

    const data = {
      title: this.title,
    }

    this.FeebackAPI.Create(data).then((res: any) => {
      this.snack.viewsnack(res.data.msg, 'success');
    });
  }

}
