import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-tabs',
  templateUrl: './my-tabs.component.html',
  styleUrls: ['./my-tabs.component.scss']
})
export class MyTabsComponent implements OnInit {
  @Input("optionsTabs") optionsTabs: any;
  @Input("intialTabCode") intialTabCode?: number;
  @Input("currentTab") currentTab?: number;
  @Output() getTabActive = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.onGetTabActive();  
  }

  onGetTabActive(index?: number){
    if(!index){
      this.optionsTabs.map((option: any) => {
        option.active = false;
        if(option.code == this.intialTabCode){
          option.active = true;
        }
      });
    }else{
      this.optionsTabs.map((option: any) => option.active = false);
      this.optionsTabs[index].active = !this.optionsTabs[index].disabled ? true : false;
      this.optionsTabs[0].active = this.optionsTabs[index].disabled ? true : false;
    }
    this.getTabActive.emit(this.optionsTabs.filter((o:any) => o.active == true)[0]);
  }


}
