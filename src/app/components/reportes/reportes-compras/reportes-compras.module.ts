import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComprasComponent } from './reportes-compras.component';
import { ReportesComprasProveedorComponent } from './reportes-compras-proveedor/reportes-compras-proveedor.component';
import { MaterialPrincipalModule } from 'src/app/material.module';
import { ReportesComprasProductoComponent } from './reportes-compras-producto/reportes-compras-producto.component';


@NgModule({
  declarations: [
    ReportesComprasComponent,
    ReportesComprasProveedorComponent,
    ReportesComprasProductoComponent,
  ],
  imports: [
    CommonModule,
    MaterialPrincipalModule,
  ]
})
export class ReportesComprasModule { }
