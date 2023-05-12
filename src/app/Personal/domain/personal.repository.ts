import { Observable } from "rxjs/internal/Observable";
import { personalrequest, guardapersonalrequest, editapersonalrequest } from "./request/personal_request";
import { PersonalResponse } from "./response/personal_response";




export abstract class PersonalRepository{

    abstract listar( fd : personalrequest):Observable<PersonalResponse>;
    abstract listarfiltro(fd : personalrequest):Observable<PersonalResponse>;
    abstract guardapersonal(fd : guardapersonalrequest):Observable<PersonalResponse>;
    abstract editapersonal(prolrequest:editapersonalrequest): Observable<PersonalResponse>
}


