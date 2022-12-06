import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from './reportes.component';
import { ReportesComprasModule } from './reportes-compras/reportes-compras.module';


@NgModule({
  declarations: [
    ReportesComponent,
  ],
  imports: [
    CommonModule,
    ReportesComprasModule,
  ]
})
export class ReportesModule { }
