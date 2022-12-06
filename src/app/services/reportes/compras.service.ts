import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseApi } from 'src/app/models/api/response.model';
import { tokenApi, urlServicios } from 'src/app/models/utilities/variables-globales';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  baseURL = urlServicios + 'orden-compras';
  baseURLdetail = urlServicios + 'orden-compra-detalles';

  constructor(private httpClient: HttpClient) { }

  listAll(): Observable<ResponseApi> {
    var headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenApi}`
      }
    );
    return this.httpClient.get<ResponseApi>(this.baseURL + '?populate=*', { headers: headers }).pipe(catchError(e => throwError(e)));
  }

  listAllDetail(id: any): Observable<ResponseApi> {
    var headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenApi}`
      }
    );
    return this.httpClient.get<ResponseApi>(this.baseURLdetail + '?populate=*&filters[id]=' + id, { headers: headers }).pipe(catchError(e => throwError(e)));
  }


  listByFilters(filtros: any): Observable<ResponseApi> {
    var headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenApi}`
      }
    );
    var proveedor = '';
    if (filtros['proveedor']) {
      proveedor = '&filters[proveedor][nroDocIde][$eq]=' + filtros['proveedor']
    }
    var fechainicio = '';
    if (filtros['fechaInicio']) {
      fechainicio = '&filters[fecha_emision][$gte]=' + filtros['fechaInicio']
    }
    var fechaFin = '';
    if (filtros['fechaFin']) {
      fechaFin = '&filters[fecha_emision][$lte]=' + filtros['fechaFin']
    }
    return this.httpClient.get<ResponseApi>(this.baseURL + '?populate=*' + proveedor + fechainicio + fechaFin, { headers: headers }).pipe(catchError(e => throwError(e)));
  }

  listByFilters2(filtros: any): Observable<ResponseApi> {
    var headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenApi}`
      }
    );
    var proveedor = '';
    if (filtros['insumo']) {
      proveedor = '&filters[insumo][nroDocIde][$eq]=' + filtros['proveedor']
    }
    var fechainicio = '';
    if (filtros['fechaInicio']) {
      fechainicio = '&filters[fecha_emision][$gte]=' + filtros['fechaInicio']
    }
    var fechaFin = '';
    if (filtros['fechaFin']) {
      fechaFin = '&filters[fecha_emision][$lte]=' + filtros['fechaFin']
    }
    return this.httpClient.get<ResponseApi>(this.baseURL + '?populate=*' + proveedor + fechainicio + fechaFin, { headers: headers }).pipe(catchError(e => throwError(e)));
  }


}
