
import { HttpClient,  } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { MedidaResponse } from '../medida/domain/response/medida_response';
import { Medidarequest, guardaMedidarequest } from '../medida/domain/request/medida_request';
import { MedidaRepository } from '../medida/domain/medida.repository';

@Injectable()
export class MedidaService extends MedidaRepository{
  
  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService
    
    ){

    super();
  }

  listar(prolrequest:Medidarequest): Observable<MedidaResponse> 
    {
        return this.http.post<MedidaResponse>(`${environment.PATH_API}/unidadmedida/listaunidadmedida`,prolrequest);
    

    }
  listarfiltro(prolrequest:Medidarequest): Observable<MedidaResponse>
    {
      return this.http.post<MedidaResponse>(`${environment.PATH_API}/unidadmedida/listaunidadmedida`,prolrequest);
    }

  guardaalmacen(prolrequest:guardaMedidarequest): Observable<MedidaResponse>
  {
    return this.http.post<MedidaResponse>(`${environment.PATH_API}/unidadmedida/Mantunidadmedida`,prolrequest);
  }

  editaalmacen(prolrequest:guardaMedidarequest): Observable<MedidaResponse>
  {
    return this.http.post<MedidaResponse>(`${environment.PATH_API}/unidadmedida/Mantunidadmedida`,prolrequest);
  }
}

