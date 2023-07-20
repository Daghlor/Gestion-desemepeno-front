import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/config/snackbar.service';
import { ConfirmModalComponent } from 'src/app/admin/components/confirm-modal/confirm-modal.component';
import { LocalService } from 'src/app/config/local.service';
import { PerfomancePlansService } from 'src/app/admin/services/perfomance-plans.service';

@Component({
    selector: 'app-performance-plans-list',
    templateUrl: './performance-plans-list.component.html',
    styleUrls: ['./performance-plans-list.component.scss']
})
export class PerformancePlansListComponent implements OnInit {
    // SE DEFINE VARIABLES LOCALES CON MAQUETADO DE LA TABLA
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
        columnDef: 'name',
        header: 'Titulo',
        sort: true,
        type: 'text',
        cell: (element: any) => `${element.name}`,
    }, {
        columnDef: 'term',
        header: 'Duración',
        sort: true,
        type: 'text',
        cell: (element: any) => `${element.term}`,
    }, {
        columnDef: 'company',
        header: 'Empresa',
        sort: true,
        type: 'text',
        cell: (element: any) => `${element.company}`,
    }, 
    // {
    //     columnDef: 'icons',
    //     header: '',
    //     sort: true,
    //     type: 'icons',
    //     cell: (element: any) => `${element.icons}`,
    // }
];

    constructor(
        // SE DEFINE VARIBALES CON SERVICIOS ASIGNADOS
        private perfomancePlansApi: PerfomancePlansService,
        private router: Router,
        private snack: SnackbarService,
        private dialog: MatDialog,
        private Local: LocalService,
    ) { }

    ngOnInit(): void {
        this.getData();
    }

    // FUNCION PARA VALIDAR LOS PEMISOS SI ES O NO ES ADMIN
    validatePermissions(code: string): Boolean {
        return this.Local.validatePermission(code) ? true : false;
    }

    getData() {
        const paginate = {
            paginate: this.pageSize,
            page: this.actualPage,
            column: this.orderColumn || 'name',
            direction: this.orderType || 'asc',
            search: {
                company_id: this.validatePermissions('get_all_data') ? '' : JSON.parse(this.Local.findDataLocal('info_company')).id,
            }
        }

        // FUNCION QUE ENCUENTRA TODOS LOS USUARIOS Y LOS ORGANIZA EN LA TABLA
        this.perfomancePlansApi.FindAll(paginate).then((res: any) => {
            for (let i = 0; i < res.data.plans.length; i++) {
                res.data.plans[i].icons = [];
                // if (this.validatePermissions('delete_users')) {
                //     res.data.users[i].icons.push('delete');
                // }
                if (this.validatePermissions('update_users')) {
                    res.data.plans[i].icons.push('edit');
                }
            }

            this.dataSource = new MatTableDataSource(res.data.plans);
            this.length = res.data.total;

        })

    }

    changeSort(item: any) {
        this.orderColumn = item.active;
        this.orderType = item.direction;
        this.getData();
    }

    changePaginator(info: any) {
        this.actualPage = info.pageIndex + 1;
        this.pageSize = info.pageSize;
        this.getData();
    }

    redirectForm(url: string) {
        this.snack.redirect(url);
    }

    // FUNCION DE ICONOS PARA EDITAR O ELIMINAR
    iconsFunction(event: any) {
        if (event.icon == 'edit') {
            this.router.navigate(['admin/performance_plans/form/' + event.data.unique_id]);
        }
    }
}
