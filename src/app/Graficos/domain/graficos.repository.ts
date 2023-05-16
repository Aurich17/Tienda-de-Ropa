import { DashboardIndicadorResponse } from './response/grafico_response';
import { Observable } from "rxjs/internal/Observable";
import { dashboardventasrequest, graficorequest } from "../domain/request/grafico_request";
import { DashboardPromedioVentasResponse, DashboardVentasResponse} from "../domain/response/grafico_response";


export abstract class GraficoRepository{
    abstract dashboardventas(fd : dashboardventasrequest):Observable<DashboardVentasResponse>
    abstract dashboardpromedioventas(fd: dashboardventasrequest):Observable<DashboardPromedioVentasResponse>
    abstract dashboardindicador(fd: dashboardventasrequest):Observable<DashboardIndicadorResponse>
}
