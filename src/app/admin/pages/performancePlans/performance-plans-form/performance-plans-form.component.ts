import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackbarService } from 'src/app/config/snackbar.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TracingsComponent } from "src/app/admin/components/tracings/tracings.component";
import * as moment from 'moment';
import { PerfomancePlansService } from 'src/app/admin/services/perfomance-plans.service';
import { AuthService } from 'src/app/admin/services/auth.service';
import { LocalService } from 'src/app/config/local.service';

@Component({
	selector: 'app-performance-plans-form',
	templateUrl: './performance-plans-form.component.html',
	styleUrls: ['./performance-plans-form.component.scss']
})
export class PerformancePlansFormComponent implements OnInit {
	// SE DEFINE VARIABLES LOCALES
	name?: string;
	term?: number;
	company_id?: string;
	listTerms: any = [3, 6, 12];
	listCompany: any = [];
	validateAllPermission: boolean = false;


	params: any;
	unique_id?: string;
	listObjetives: any = [];
	userData: any;

	constructor(
		// SE DEFINE VARIABLES CON SERVICIOS ASIGNADOS
		private perfomancePlansAPI: PerfomancePlansService,
		private authApi: AuthService,
		private snack: SnackbarService,
		private activeRouter: ActivatedRoute,
		private router: Router,
		public dialog: MatDialog,
		private Local: LocalService
	) { }

	ngOnInit(): void {
		this.params = this.activeRouter.snapshot.params;
		this.unique_id = this.params.uuid;
		this.validatePermissions('get_all_data');
		this.findData();
	}

	findData() {
		this.authApi.FindData().then((res: any) => {
			this.listCompany = res.companies
		})
	}

	// FUNCION PARA VALIDAR LOS PEMISOS SI ES O NO ES ADMIN
	validatePermissions(code: string): Boolean {
		this.validateAllPermission = this.Local.validatePermission(code) ? true : false;
		return this.validateAllPermission;
	}

	async saveData() {
		this.perfomancePlansAPI.Create({
			name: this.name,
			term: this.term,
			dateInit: moment().format('YYYY-MM-DD'),
			dateEnd: moment().add(this.term, 'months').format('YYYY-MM-DD'),
			company_id: this.validateAllPermission ? this.company_id : JSON.parse(this.Local.findDataLocal('info_company')).id,
		}).then((res: any) => {
			if (!res.res) {
				this.snack.viewsnack(res.data, 'error');
			} else {
				this.snack.viewsnack(res.data.msg, 'success');
				this.router.navigate(['admin/performance_plans']);
			}
		})
	}

}
