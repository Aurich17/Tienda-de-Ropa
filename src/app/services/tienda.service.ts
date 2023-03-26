import { guardatiendarequest, tiendarequest, editatiendarequest } from './../Tienda/domain/request/tienda_request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TiendaResponse } from '../Tienda/domain/response/tienda_response';
import { StorageService } from './storage.service';
import { TiendaRepository } from '../Tienda/domain/tienda.repository';

@Injectable()
export class TiendaService extends TiendaRepository{
  
  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService
    
    ){

    super();
  }

  listar(prolrequest:tiendarequest): Observable<TiendaResponse> 
    {
        return this.http.post<TiendaResponse>(`${environment.PATH_API}/Tienda/ListaTienda/`,prolrequest);
    

    }
  listarfiltro(prolrequest:tiendarequest): Observable<TiendaResponse>
    {
      return this.http.post<TiendaResponse>(`${environment.PATH_API}/Tienda/ListaTienda/`,prolrequest);
    }

  guardatienda(prolrequest:guardatiendarequest): Observable<TiendaResponse>
  {
    return this.http.post<TiendaResponse>(`${environment.PATH_API}/Tienda/MantTienda/`,prolrequest);
  }
  editatienda(prolrequest:editatiendarequest): Observable<TiendaResponse>
  {
    return this.http.post<TiendaResponse>(`${environment.PATH_API}/Tienda/MantTienda/`,prolrequest);
  }
}

