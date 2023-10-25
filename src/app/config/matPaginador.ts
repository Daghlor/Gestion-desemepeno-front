import { MatPaginatorIntl } from '@angular/material/paginator';

// PAGINADO PERZONALIZADO
export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();
  customPaginatorIntl.itemsPerPageLabel = 'Paginado:';
  return customPaginatorIntl;
}

// Copyright (c) Engagement
// https://www.engagement.com.co/
// Año: 2023
// Sistema: Gestion de desempeño (GDD)
// Programador: David Tuta
