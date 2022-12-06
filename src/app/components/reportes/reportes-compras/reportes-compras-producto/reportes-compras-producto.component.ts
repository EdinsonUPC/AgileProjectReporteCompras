import { formatDate } from "@angular/common";
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Insumo } from "src/app/models/insumo.model";
import { OrdenCompra } from 'src/app/models/orden-compra.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { InsumosService } from "src/app/services/entidades/insumos.service";
import { ProveedoresService } from 'src/app/services/entidades/proveedores.service';
import { ComprasService } from 'src/app/services/reportes/compras.service';

@Component({
  selector: 'app-reportes-compras-producto',
  templateUrl: './reportes-compras-producto.component.html',
  styleUrls: ['./reportes-compras-producto.component.scss']
})
export class ReportesComprasProductoComponent implements OnInit, AfterViewInit {
  formFiltros = new FormGroup({
    proveedor: new FormControl(),
    insumo: new FormControl(),
    fechaInicio: new FormControl<Date | null>(null),
    fechaFin: new FormControl<Date | null>(null),
    establecimiento: new FormControl(),
    casillaFiltro: new FormControl(),
  });

  listaProveedores: Proveedor[] = [];
  listaInsumos: Insumo[] = [];

  public mostrarResultado = false;

  //table1
  public displayedColumns: string[] = ['serie_correlativo', 'fecha_emision', 'proveedor', 'insumo', 'precio', 'cantidad'];
  public dataSource: MatTableDataSource<OrdenCompra>;

  @ViewChild(MatPaginator) public paginator?: MatPaginator;
  @ViewChild(MatSort) public sort?: MatSort;

  public displayedColumns2: string[] = ['serie_correlativo', 'fecha_emision', 'proveedor', 'insumo', 'precio', 'cantidad'];
  public dataSource2: MatTableDataSource<OrdenCompra>;

  @ViewChild(MatPaginator) public paginator2?: MatPaginator;
  @ViewChild(MatSort) public sort2?: MatSort;

  public displayedColumns3: string[] = ['serie_correlativo', 'fecha_emision', 'proveedor', 'insumo', 'precio', 'cantidad'];
  public dataSource3: MatTableDataSource<OrdenCompra>;

  @ViewChild(MatPaginator) public paginator3?: MatPaginator;
  @ViewChild(MatSort) public sort3?: MatSort;

  constructor(
    private proveedoresServices: ProveedoresService,
    private insumosServices: InsumosService,
    private comprasService: ComprasService,
  ) {
    // Assign the data to the data source for the table to render
    var listaOrdenescompra: OrdenCompra[] = []
    this.dataSource = new MatTableDataSource(listaOrdenescompra);
    this.dataSource2 = new MatTableDataSource(listaOrdenescompra);
    this.dataSource3 = new MatTableDataSource(listaOrdenescompra);
  }

  ngOnInit(): void {
    this.listProveedores();
    this.listInsumos();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator ? this.paginator : null;
    this.dataSource.sort = this.sort ? this.sort : null;

    this.dataSource2.paginator = this.paginator2 ? this.paginator2 : null;
    this.dataSource2.sort = this.sort2 ? this.sort2 : null;

    this.dataSource3.paginator = this.paginator3 ? this.paginator3 : null;
    this.dataSource3.sort = this.sort3 ? this.sort3 : null;
  }


  ngOnChangesCasilleroFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnChangesCasilleroFiltro2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  ngOnChangesCasilleroFiltro3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();

    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  }

  buscarOrdenCompraFiltros() {
    this.mostrarResultado = false;
    this.listaProveedores.forEach((elementPro: Proveedor, index: number) => {
      switch (index) {
        case 0:
          this.dataSource.data = [];
          var filtros = {
            proveedor: elementPro.nroDocIde,
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
                          this.listaInsumos.forEach((elementIns: Insumo) => {
                            if (this.formFiltros.controls.insumo.value === elementIns.id) {
                              if (ordenCompra.insumo === elementIns.nombre) {
                                this.dataSource.data.push(ordenCompra);
                              }
                            }
                          });
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
          break;
        case 1:
          this.dataSource2.data = [];
          var filtros2 = {
            proveedor: elementPro.nroDocIde,
            fechaInicio: formatDate(this.formFiltros.value.fechaInicio + '', 'yyyy-MM-dd', 'en-EN'),
            fechaFin: formatDate(this.formFiltros.value.fechaFin + '', 'yyyy-MM-dd', 'en-EN'),
          }

          var servicioOrdenCompraFiltrado = this.comprasService.listByFilters(filtros2).toPromise();
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
                          
                          this.listaInsumos.forEach((elementIns: Insumo) => {
                            if (this.formFiltros.controls.insumo.value === elementIns.id) {
                              if (ordenCompra.insumo === elementIns.nombre) {
                                this.dataSource2.data.push(ordenCompra);
                              }
                            }
                          });
                        }
                      }
                    });
                  });

                });
              }
            }
          })
          this.formFiltros.controls.casillaFiltro.setValue(' ')
          this.dataSource2.filter = ' ';
          if (this.dataSource2.paginator) {
            this.dataSource2.paginator.firstPage();
          }
          console.log(this.dataSource2.data)
          break;
        case 2:
          this.dataSource3.data = [];
          var filtros3 = {
            proveedor: elementPro.nroDocIde,
            fechaInicio: formatDate(this.formFiltros.value.fechaInicio + '', 'yyyy-MM-dd', 'en-EN'),
            fechaFin: formatDate(this.formFiltros.value.fechaFin + '', 'yyyy-MM-dd', 'en-EN'),
          }

          var servicioOrdenCompraFiltrado = this.comprasService.listByFilters(filtros3).toPromise();
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
                          
                          this.listaInsumos.forEach((elementIns: Insumo) => {
                            if (this.formFiltros.controls.insumo.value === elementIns.id) {
                              if (ordenCompra.insumo === elementIns.nombre) {
                                this.dataSource3.data.push(ordenCompra);
                              }
                            }
                          });
                        }
                      }
                    });
                  });

                });
              }
            }
          })
          this.formFiltros.controls.casillaFiltro.setValue(' ')
          this.dataSource3.filter = ' ';
          if (this.dataSource3.paginator) {
            this.dataSource3.paginator.firstPage();
          }
          console.log(this.dataSource3.data)
          break;
        default:
          break;
      }

    });
    setTimeout(() => {
      this.mostrarResultado = true;
    }, 1500);
  }

  listInsumos() {
    this.insumosServices.listAll().subscribe(responseApi => {
      if (responseApi) {
        if (responseApi.data) {
          var listaInsumosActualizada: Insumo[] = [];
          responseApi.data.forEach((element: any) => {
            var insumo = {
              nroDocIde: element.attributes.nroDocIde,
              razonSocial: element.attributes.razonSocial,
              id: element.id,
              nombre: element.attributes.nombre,
              descripcion: element.attributes.descripcion,
              stock: element.attributes.stock,
            }
            listaInsumosActualizada.push(insumo);
          });

          this.listaInsumos = listaInsumosActualizada;
        }
      }
    });
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