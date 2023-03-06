import { guardapersonalrequest, personalrequest, editapersonalrequest } from './../Personal/domain/request/personal_request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PersonalResponse } from '../Personal/domain/response/personal_response';
import { StorageService } from './storage.service';
import { PersonalRepository } from '../Personal/domain/personal.repository';

@Injectable()
export class PersonalService extends PersonalRepository{
  
  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService
    
    ){

    super();
  }

  //LISTA LOS OBJETOS AL INICIO
  listar(prolrequest:personalrequest): Observable<PersonalResponse> 
    {
        return this.http.post<PersonalResponse>(`${environment.PATH_API}/personal/listapersonal/`,prolrequest);
    
    }

    //LISTA SEGUN LOS PARAMETROS
  listarfiltro(prolrequest:personalrequest): Observable<PersonalResponse>
    {
      return this.http.post<PersonalResponse>(`${environment.PATH_API}/personal/listapersonal/`,prolrequest);
    }
    
    //GUARDA LOS ELEMENTOS
  guardapersonal(prolrequest:guardapersonalrequest): Observable<PersonalResponse>
  {
    return this.http.post<PersonalResponse>(`${environment.PATH_API}/personal/MantPersonal`,prolrequest);
  }
  editapersonal(prolrequest:editapersonalrequest): Observable<PersonalResponse>
  {
    return this.http.post<PersonalResponse>(`${environment.PATH_API}/personal/MantPersonal`,prolrequest);
  }
}

