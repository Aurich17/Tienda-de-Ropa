import { guardatiendarequest, tiendarequest, editatiendarequest } from './../tienda/domain/request/tienda_request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiendaResponse } from '../tienda/domain/response/tienda_response';
import { StorageService } from './storage.service';
import { TiendaRepository } from '../tienda/domain/tienda.repository';

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

