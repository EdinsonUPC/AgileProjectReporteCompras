import { formatDate } from "@angular/common";
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdenCompra } from 'src/app/models/orden-compra.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { ProveedoresService } from 'src/app/services/entidades/proveedores.service';
import { ComprasService } from 'src/app/services/reportes/compras.service';

@Component({
  selector: 'app-reportes-compras-proveedor',
  templateUrl: './reportes-compras-proveedor.component.html',
  styleUrls: ['./reportes-compras-proveedor.component.scss']
})

export class ReportesComprasProveedorComponent implements OnInit, AfterViewInit {
  formFiltros = new FormGroup({
    proveedor: new FormControl(),
    fechaInicio: new FormControl<Date | null>(null),
    fechaFin: new FormControl<Date | null>(null),
    establecimiento: new FormControl(),
    casillaFiltro: new FormControl(),
  });

  listaProveedores: Proveedor[] = [];

  public displayedColumns: string[] = ['serie_correlativo', 'fecha_emision', 'proveedor', 'insumo', 'precio', 'cantidad'];
  public dataSource: MatTableDataSource<OrdenCompra>;

  @ViewChild(MatPaginator) public paginator?: MatPaginator;
  @ViewChild(MatSort) public sort?: MatSort;

  constructor(
    private proveedoresServices: ProveedoresService,
    private comprasService: ComprasService,
  ) {
    // Assign the data to the data source for the table to render
    var listaOrdenescompra: OrdenCompra[] = []
    this.dataSource = new MatTableDataSource(listaOrdenescompra);
  }

  ngOnInit(): void {
    this.listProveedores();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator ? this.paginator : null;
    this.dataSource.sort = this.sort ? this.sort : null;
  }


  ngOnChangesCasilleroFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  buscarOrdenCompraFiltros() {
    this.dataSource.data = [];
    var filtros = {
      proveedor: this.formFiltros.value.proveedor,
      fechaInicio: formatDate(this.formFiltros.value.fechaInicio + '', 'yyyy-MM-dd', 'en-EN'),
      fechaFin: formatDate(this.formFiltros.value.fechaFin + '', 'yyyy-MM-dd', 'en-EN'),
    }

    var servicioOrdenCompraFiltrado = this.comprasService.listByFilters(filtros).toPromise();
    servicioOrdenCompraFiltrado.then(responseApi => {
      if (responseApi) {
        if (responseApi.data) {
          var listaOrdenCompraFiltrada: OrdenCompra[] = [];
          responseApi.data.forEach((element: any, index: number) => {
            var ordenCompra = {
              serie_correlativo: element.attributes.serie_correlativo,
              fecha_emision: element.attributes.fecha_emision,
              proveedor: element.attributes.proveedor.data.attributes.nroDocIde + '-' + element.attributes.proveedor.data.attributes.razonSocial,
              insumo: '',
              precio: '',
              cantidad: '',
            }
            element.attributes.orden_compra_detalles.data.forEach((elementDetail: any) => {
              this.comprasService.listAllDetail(elementDetail.id).subscribe(detailResponseApi => {
                if (detailResponseApi) {
                  if (detailResponseApi.data) {
                    console.log(detailResponseApi.data)
                    ordenCompra.insumo = detailResponseApi.data[0].attributes.insumo.data.attributes.nombre
                    ordenCompra.precio = detailResponseApi.data[0].attributes.precio
                    ordenCompra.cantidad = detailResponseApi.data[0].attributes.cantidad
                    this.dataSource.data.push(ordenCompra);
                  }
                }
              });
            });

          });
        }
      }
    })
    this.formFiltros.controls.casillaFiltro.setValue(' ')
    this.dataSource.filter = ' ';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log(this.dataSource.data)
  }

  listProveedores() {
    this.proveedoresServices.listAll().subscribe(responseApi => {
      if (responseApi) {
        if (responseApi.data) {
          var listaProveedoresActualizada: Proveedor[] = [];
          responseApi.data.forEach((element: any) => {
            var proveedor = {
              nroDocIde: element.attributes.nroDocIde,
              razonSocial: element.attributes.razonSocial,
            }
            listaProveedoresActualizada.push(proveedor);
          });

          this.listaProveedores = listaProveedoresActualizada;
        }
      }
    });
  }
}