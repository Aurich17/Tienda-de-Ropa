import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IngresoProductoRequest } from '../../domain/ingresoproducto-request';
import { IngresoProducto, IngresoProductoResponse } from '../../domain/ingresoproducto-response';
import { IngresoProductoRepository } from '../../domain/ingresorproducto.repository';


@Component({
  selector: 'app-ingresoproducto',
  templateUrl: './ingresoproducto.component.html',
  styleUrls: ['./ingresoproducto.component.css']
})
export class IngresoproductoComponent implements OnInit {


  group: FormGroup;
  private readonly IngresoProductoService : IngresoProductoRepository
  private  ResponseIngresoProducto : IngresoProductoResponse
  dataTable : IngresoProducto[]


  
  constructor() { }

  ngOnInit(): void {
  }




  ListarTransaccion (param_CodigoTransaccion: number){


    if (this.group.valid){
     
      const fd= new FormData();
      const values = this.group.value
    
      const ingresoproductorequest: IngresoProductoRequest =<IngresoProductoRequest>{}//  this.group.value;
      ingresoproductorequest.CodigoTransaccion = param_CodigoTransaccion;
  

        this.IngresoProductoService.listartransaccion(ingresoproductorequest).subscribe(response => 
  
          {
            this.ResponseIngresoProducto = response
            this.dataTable = this.ResponseIngresoProducto.datos.result;
          }
            )

  }
}




  limpiartexto(control:string ){

    

  }

}
