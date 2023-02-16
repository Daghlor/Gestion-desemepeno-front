import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/admin/services/auth.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
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
  rolesAssing: any = [];
  rolesView: any = [];

  listRoles: any = [];
  listCompany: any = [];
  listEmployments: any = [];
  allEmployments: any = [];

  typePasswordVerify: string = 'password';
  showPasswordVerify: boolean = false;
  iconPasswordVerify: string = 'visibility';
  typePassword: string = 'password';
  showPassword: boolean = false;
  iconPassword: string = 'visibility';

  constructor(
    private authApi: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllList();
  }

  changePhoto(photo: any){

  }

  getAllList(){
    this.authApi.FindData().then((res:any)=>{
      this.listRoles = res.roles;
      this.listCompany = res.companies;
      this.allEmployments = res.employments;
    })
  }

  addRoles(){
    this.rolesAssing.push(this.role_id);
    let validateExits = false;

    /*for (let i = 0; i < this.rolesView.length; i++) {
      const element = rolesView[i];
      
    }*/

    for (let i = 0; i < this.listRoles.length; i++) {
      if(this.listRoles[i].id == this.role_id){
        this.rolesView.push(this.listRoles[i]);
      }
    }
    this.role_id = 0;
  }

  changeCompany(){
    this.listEmployments = [];
    this.employment_id = 0;
 
    for (let i = 0; i < this.allEmployments.length; i++) {
      if(this.allEmployments[i].company_id == this.company_id){
        this.listEmployments.push(this.allEmployments[i]);
      }
    }
  }



}
