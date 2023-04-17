import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { ListadoVentasRepository } from '../ListadoVentas/domain/listadoVentas.respository';
import { listadoVentasRequest } from '../ListadoVentas/domain/request/listadoVentas_request';
import { ListaVentasResponse } from '../ListadoVentas/domain/response/listadoVentas.response';


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

