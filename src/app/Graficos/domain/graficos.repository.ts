import { Observable } from "rxjs/internal/Observable";
import { dashboardventasrequest, graficorequest } from "../domain/request/grafico_request";
import { DashboardVentasResponse, GraficoResponse } from "../domain/response/grafico_response";


export abstract class GraficoRepository{
    abstract listar( fd : graficorequest):Observable<GraficoResponse>;
    abstract dashboardventas(fd : dashboardventasrequest):Observable<DashboardVentasResponse>
}
