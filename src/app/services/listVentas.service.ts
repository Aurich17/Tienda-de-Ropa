import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { ListadoVentasRepository } from '../listadoVentas/domain/listadoVentas.respository';
import { listadoVentasRequest } from '../listadoVentas/domain/request/listadoVentas_request';
import { ListaVentasResponse } from '../listadoVentas/domain/response/listadoVentas.response';


//@ts-ignore
@Injectable()
export class ListadoVentasService extends ListadoVentasRepository{

  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService

    ){

    super();
  }

  listar(prolrequest:listadoVentasRequest): Observable<ListaVentasResponse>
    {
        return this.http.post<ListaVentasResponse>(`${environment.PATH_API}/comprobante/listacomprobante/`,prolrequest);
    }
}

