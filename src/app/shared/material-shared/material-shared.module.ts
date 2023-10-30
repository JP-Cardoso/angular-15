import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule
  ],
  exports: [
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class MaterialSharedModule { }
