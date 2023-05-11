import { Observable } from "rxjs/internal/Observable";


import { personalrequest, guardapersonalrequest } from "../domain/request/personal_request";
import { PersonalResponse } from "../domain/response/personal_response";


export abstract class PersonalRepository{

    abstract listar( fd : personalrequest):Observable<PersonalResponse>;
    abstract listarfiltro(fd : personalrequest):Observable<PersonalResponse>;
    abstract guardapersonal(fd : guardapersonalrequest):Observable<PersonalResponse>;
    abstract editapersonal(fd: guardapersonalrequest):Observable<PersonalResponse>;
}
