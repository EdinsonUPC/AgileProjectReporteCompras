import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseApi } from 'src/app/models/api/response.model';
import { tokenApi, urlServicios } from 'src/app/models/utilities/variables-globales';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  baseURL = urlServicios + 'proveedors';

  constructor(private httpClient: HttpClient) { }

  listAll(): Observable<ResponseApi> {
    var headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenApi}`
      }
    );
    return this.httpClient.get<ResponseApi>(this.baseURL, { headers: headers }).pipe(catchError(e => throwError(e)));
  }
}
