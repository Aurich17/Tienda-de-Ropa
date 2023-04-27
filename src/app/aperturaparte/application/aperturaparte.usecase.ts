
import { Injectable } from "@angular/core";
import { AperturaparteService } from "src/app/services/aperturaparte.service"
import { ParteEntity } from "../domain/parte-entity";
import { AperturaparteRepository } from "../domain/parte.repository";

@Injectable({

providedIn: 'root',

})

export class AperturaparteUseCase{

constructor(private readonly aperturaparteService: AperturaparteRepository ){}

insert (aperturaparte: ParteEntity){

   // this.aperturaparteService.insert(aperturaparte)
}
update (aperturaparte: ParteEntity,id : string | number){

   // this.aperturaparteService.update(aperturaparte,id)
}

listar (id : string | number){

    //this.aperturaparteService.listar(id)
}

listarempleado(idEmpleado : string | number){


    //this.aperturaparteService.listarempleado()
}

ListarOT(ot: string | number){

   // this.aperturaparteService.listarot()
}



}