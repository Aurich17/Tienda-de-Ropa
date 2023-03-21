import { guardarolrequest, rolrequest } from './../roles/domain/request/rol_request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RolResponse } from '../roles/domain/response/rol_response';
import { StorageService } from './storage.service';
import { RolRepository } from '../roles/domain/rol.repository';

@Injectable()
export class RolService extends RolRepository{

  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService
    
    ){

    super();
  }
  listar(prolrequest:rolrequest): Observable<RolResponse> 
    {
        return this.http.post<RolResponse>(`${environment.PATH_API}/rol/ListaRoles/`,prolrequest);
    

    }
  listarfiltro(prolrequest:rolrequest): Observable<RolResponse>
    {
      return this.http.post<RolResponse>(`${environment.PATH_API}/rol/ListaRoles/`,prolrequest);
    }

  guardarol(prolrequest:guardarolrequest): Observable<RolResponse>
  {
    return this.http.post<RolResponse>(`${environment.PATH_API}/Rol/MantRol/`,prolrequest);
  }
  editarol(prolrequest:guardarolrequest): Observable<RolResponse>
  {
    return this.http.post<RolResponse>(`${environment.PATH_API}/Rol/MantRol/`,prolrequest);
  }
}
