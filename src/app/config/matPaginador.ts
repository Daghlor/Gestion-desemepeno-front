import { MatPaginatorIntl } from '@angular/material/paginator';

// PAGINADO PERZONALIZADO
export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();
  customPaginatorIntl.itemsPerPageLabel = 'Paginado:';
  return customPaginatorIntl;
}
