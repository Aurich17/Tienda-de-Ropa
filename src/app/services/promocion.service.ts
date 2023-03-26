import { editapromocionrequest, guardapromocionrequest, promocionrequest } from './../Promociones/domain/request/promociones_request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PromocionResponse } from '../Promociones/domain/response/promociones_response';
import { StorageService } from './storage.service';
import { PromocionRepository } from '../Promociones/domain/promociones.repository';

@Injectable()
export class PromocionService extends PromocionRepository{
  
  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService
    
    ){

    super();
  }

  listar(prolrequest:promocionrequest): Observable<PromocionResponse> 
    {
        return this.http.post<PromocionResponse>(`${environment.PATH_API}/Promociones/ListaPromociones/`,prolrequest);
    

    }
  listarfiltro(prolrequest:promocionrequest): Observable<PromocionResponse>
    {
      return this.http.post<PromocionResponse>(`${environment.PATH_API}/Promociones/ListaPromociones/`,prolrequest);
    }

  guardapromocion(prolrequest:guardapromocionrequest): Observable<PromocionResponse>
  {
    return this.http.post<PromocionResponse>(`${environment.PATH_API}/Promociones/MantPromociones/`,prolrequest);
  }
  editapromocion(prolrequest:editapromocionrequest): Observable<PromocionResponse>
  {
    return this.http.post<PromocionResponse>(`${environment.PATH_API}/Promociones/MantPromociones/`,prolrequest);
  }
}

