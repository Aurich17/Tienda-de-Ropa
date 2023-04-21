import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { ListadoKardexRepository } from '../Kardex/domain/kardex.repository';
import { listadoKardex } from '../Kardex/domain/request/kardex.request';
import { ListaKardexResponse } from '../Kardex/domain/response/kardex.response';


//@ts-ignore
@Injectable()
export class ListadoKardexService extends ListadoKardexRepository{

  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService
    ){
    super();
  }

  listarKardex(prolrequest:listadoKardex): Observable<ListaKardexResponse>
    {
        return this.http.post<ListaKardexResponse>(`${environment.PATH_API}/kardex/listakardex/`,prolrequest);
    }
}
