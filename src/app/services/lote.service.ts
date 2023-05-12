import { guardaloterequest, loterequest, editaloterequest } from './../lotes/domain/request/lote_request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoteResponse } from '../lotes/domain/response/lote_response';
import { StorageService } from './storage.service';
import { LoteRepository } from '../lotes/domain/lote.repository';

@Injectable()
export class LoteService extends LoteRepository{
  
  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService
    
    ){

    super();
  }

  listarLote(prolrequest:loterequest): Observable<LoteResponse> 
    {
        return this.http.post<LoteResponse>(`${environment.PATH_API}/lote/ListaLote/`,prolrequest);


    }
  listarfiltro(prolrequest:loterequest): Observable<LoteResponse>
    {
      return this.http.post<LoteResponse>(`${environment.PATH_API}/Lote/ListaLote/`,prolrequest);
    }

  guardalote(prolrequest:guardaloterequest): Observable<LoteResponse>
  {
    return this.http.post<LoteResponse>(`${environment.PATH_API}/lote/Mantlote/`,prolrequest);
  }
  editalote(prolrequest:editaloterequest): Observable<LoteResponse>
  {
    return this.http.post<LoteResponse>(`${environment.PATH_API}/lote/Mantlote/`,prolrequest);
  }
}

