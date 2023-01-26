import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { UserEntity } from "../domain/user-entity";
import { UserRepository } from "../domain/user-repository";
import {pluck} from "rxjs/operators";
import { StorageService } from "src/app/services/storage.service";

//Esta Clase 


@Injectable()
export class UserOperations extends UserRepository{



    constructor(private http: HttpClient, private readonly storage: StorageService){
        super();
    }
  



}


