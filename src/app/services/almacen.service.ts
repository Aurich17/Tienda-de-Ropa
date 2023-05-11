import { guardaalmacenrequest, almacenrequest, editaalmacenrequest } from './../Almacen/domain/request/almacen_request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlmacenResponse } from '../Almacen/domain/response/almacen_response';
import { StorageService } from './storage.service';
import { AlmacenRepository } from '../Almacen/domain/almacen.repository';

@Injectable()
export class AlmacenService extends AlmacenRepository{

  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService

    ){

    super();
  }

  listar(prolrequest:almacenrequest): Observable<AlmacenResponse>
    {
        return this.http.post<AlmacenResponse>(`${environment.PATH_API}/almacen/ListaAlmacen/`,prolrequest);


    }
  listarfiltro(prolrequest:almacenrequest): Observable<AlmacenResponse>
    {
      return this.http.post<AlmacenResponse>(`${environment.PATH_API}/almacen/ListaAlmacen/`,prolrequest);
    }

  guardaalmacen(prolrequest:guardaalmacenrequest): Observable<AlmacenResponse>
  {
    return this.http.post<AlmacenResponse>(`${environment.PATH_API}/almacen/MantAlmacen`,prolrequest);
  }
  editaalmacen(prolrequest:editaalmacenrequest): Observable<AlmacenResponse>
  {
    return this.http.post<AlmacenResponse>(`${environment.PATH_API}/almacen/MantAlmacen`,prolrequest);
  }
}

