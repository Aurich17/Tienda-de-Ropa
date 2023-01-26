import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AperturaParteEmpleado, AperturaParteEstacion, AperturaParteTransaccion, ParteEntity, ParteUpdateEntity, RequestMotivoParte, RequestMotivoRechazo, RequestOT, RequestParte, RequestParteActividadList, RequestValidarParte } from '../aperturaparte/domain/parte-entity';
import { ActividadResponse, EmpleadoResponse, EstacionResponse, OrdentrabajoResponse, ParteInsertResponse, ParteResponse, ResultMotivoParte, ResultMotivoRechazo, ValidarParteResponse } from '../aperturaparte/domain/parte-respuesta';
import { AperturaparteRepository } from '../aperturaparte/domain/parte.repository';
import { StorageService } from './storage.service';


@Injectable()
export class AperturaparteService extends AperturaparteRepository{

  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService
    
    ){

    super();
  }

  
  //insert(fd : ParteEntity): Observable<ParteInsertResponse> {
    insert(fd : AperturaParteTransaccion): Observable<ParteInsertResponse> {
  
    //return  this.http.post<ParteInsertResponse>(`${environment.PATH_API}/partes/agregar/`,fd);
    
    return  this.http.post<ParteInsertResponse>(`${environment.PATH_API}/partes/registrar`,fd).pipe(timeout(300000));
  }
  


  update(aperturaparte: ParteUpdateEntity):  Observable<ParteInsertResponse> {
    return this.http.post<ParteInsertResponse>(`${environment.PATH_API}/partes/actualizar/`,aperturaparte).pipe(timeout(300000))
  }

  listar(requestparte: RequestParte):  Observable<ParteResponse> {
   
    return this.http.post<ParteResponse>(`${environment.PATH_API}/partes/listaxfiltros/`,requestparte);
    //return this.http.get<ParteResponse>(`${environment.PATH_API}/partes/parte/${id}`).pipe(
     // pluck("datos")
    ////  pluck('codigoParte')
    //);

   //return this.http.get<ParteEntity[]>(`${environment.PATH_API}/partes/lista/`)

   //return this.http.get<ParteResponse>(`${environment.PATH_API}/partes/parte`);

    //return this.http.get<ParteEntity[]>(`${environment.PATH_API}/partes/lista`).pipe(
     // pluck('codigoEmpleado')
     //pluck('[]')
     //);
 
  }
  
  listarempleado(empleado: AperturaParteEmpleado): Observable<EmpleadoResponse> {// Observable<ParteEntity>  {
   // const headers = new HttpHeaders().set( 'Content-Type', 'application/json' );
    //let parametros = new HttpParams()
   // .set('CodigoCompañia', empleado.codigoCompañia)
    //.set('CodigoEmpleado', empleado.codigoEmpleado.toString())
   // .set('CodigoEstacion',"CER-03")
  
 // return this.http.get(this.APIUrl + '/Pais', { params: parametros });
    return this.http.post<EmpleadoResponse>(`${environment.PATH_API}/empleado/listaxfiltros/`,empleado )
   // return this.http.get<EmpleadoResponse>(`${environment.PATH_API}/estacion/listaxfiltros/`, {headers, params: parametros })
   
  }
  

  listarestacion(estacion: AperturaParteEstacion): Observable<EstacionResponse> {// Observable<ParteEntity>  {
    // const headers = new HttpHeaders().set( 'Content-Type', 'application/json' );
     //let parametros = new HttpParams()
    // .set('CodigoCompañia', empleado.codigoCompañia)
     //.set('CodigoEmpleado', empleado.codigoEmpleado.toString())
    // .set('CodigoEstacion',"CER-03")
   
  // return this.http.get(this.APIUrl + '/Pais', { params: parametros });
     return this.http.post<EstacionResponse>(`${environment.PATH_API}/estacion/listaxfiltros/`,estacion )
    // return this.http.get<EmpleadoResponse>(`${environment.PATH_API}/estacion/listaxfiltros/`, {headers, params: parametros })
    
   }


    listarot(requestOT : RequestOT):Observable<OrdentrabajoResponse>{

    return this.http.post<OrdentrabajoResponse>(`${environment.PATH_API}/ot/listaxfiltros/`,requestOT )
    
    }

     listarParteActividad(requestlistar : RequestParteActividadList):Observable<ActividadResponse>{
     return this.http.post<ActividadResponse>(`${environment.PATH_API}/parteactividad/listaxfiltros`,requestlistar )
    
    }


    ListarMotivoParte(request : RequestMotivoParte):Observable<ResultMotivoParte>{

      return this.http.post<ResultMotivoParte>(`${environment.PATH_API}/partes/ListarMotivoParte`,request )
      
      }


      ListarMotivoRechazado(request : RequestMotivoRechazo):Observable<ResultMotivoRechazo>{

        return this.http.post<ResultMotivoRechazo>(`${environment.PATH_API}/motivorechazo/listaxfiltros`,request )
        
      }


      ValidarParte(request : RequestValidarParte):Observable<ValidarParteResponse>{

        return this.http.post<ResultMotivoRechazo>(`${environment.PATH_API}/partes/validarparte`,request )
        
      }
        
}
