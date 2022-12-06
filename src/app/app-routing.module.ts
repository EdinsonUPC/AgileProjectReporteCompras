import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDefaultComponent } from './components/menu/menu-default/menu-default.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReportesComprasComponent } from './components/reportes/reportes-compras/reportes-compras.component';
import { ReportesComprasProveedorComponent } from './components/reportes/reportes-compras/reportes-compras-proveedor/reportes-compras-proveedor.component';
import { SecurityComponent } from './components/security/security.component';
import { SecurityLogComponent } from './components/security/security-log/security-log.component';
import { SecurityLogInComponent } from './components/security/security-log/security-log-in/security-log-in.component';
import { ReportesComprasProductoComponent } from './components/reportes/reportes-compras/reportes-compras-producto/reportes-compras-producto.component';

const routes: Routes = [
  {

    path: '',
    children: [
      {
        path: 'login',
        component: SecurityLogInComponent,
      },
      {
        path: 'access',
        component: MenuDefaultComponent,
        children: [
          {
            path: 'reportes',
            children: [
              {
                path: 'compras',
                children: [
                  {
                    path: 'comprasByProveedor',
                    component: ReportesComprasProveedorComponent
                  },
                  {
                    path: 'comprasByProducto',
                    component: ReportesComprasProductoComponent
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
