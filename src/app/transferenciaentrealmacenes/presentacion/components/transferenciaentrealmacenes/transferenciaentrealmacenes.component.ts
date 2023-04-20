import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { almacenrequest } from 'src/app/almacen/domain/request/almacen_request';
import { AlmacenRepository } from 'src/app/almacen/domain/almacen.repository';
import { AlmacenResponse, ListaAlmacen } from 'src/app/almacen/domain/response/almacen_response';
import { UtilService } from 'src/app/services/util.service';
import { productorequest } from 'src/app/producto/domain/request/producto_request';
import { ProductoRepository } from 'src/app/producto/domain/producto.repository';
import { ProductoResponse } from 'src/app/producto/domain/response/producto.response';
import { Lote, TransferenciaDetalle } from 'src/app/transferenciaentrealmacenes/domain/transferenciaentrealmacenes-entity';
import { ProductoLoteRequest } from 'src/app/transferenciaentrealmacenes/domain/transferenciaentrealmacenes-request';

import { TransferenciaEntreAlmacenesRepository } from 'src/app/transferenciaentrealmacenes/domain/transferenciaentrealmacenes.repository';
import { ProductoLoteResponse } from 'src/app/transferenciaentrealmacenes/domain/transferenciaentrealmacenes-response';

@Component({
  selector: 'app-transferenciaentrealmacenes',
  templateUrl: './transferenciaentrealmacenes.component.html',
  styleUrls: ['./transferenciaentrealmacenes.component.css']
})
export class TransferenciaentrealmacenesComponent implements OnInit {


Almacen   : ListaAlmacen[]
group     : FormGroup;
dataTable : TransferenciaDetalle[]
ListaTransferenciaItem:TransferenciaDetalle[] = []
Lote : Lote[]
ListaLote : Lote

private ResponseAlmacen    : AlmacenResponse
private ResponseProducto   : ProductoResponse
private ListaProductoItem  :TransferenciaDetalle
private ResponseProductoLote: ProductoLoteResponse



  constructor( private readonly AlmacenService : AlmacenRepository, 
               private readonly util: UtilService,
               private readonly ProductoService: ProductoRepository,
               private readonly TransferenciaentreAlamcenesService: TransferenciaEntreAlmacenesRepository
     ) { }

  ngOnInit(): void {

    this.initializeForm()
    this.ListarAlmacen('')
    
  }




  
ListarAlmacen (Empresa : string ){

  const Almacenequest: almacenrequest =<almacenrequest>{}

      Almacenequest.Descripcion = '%'
      Almacenequest.Estado='A'
      this.AlmacenService.listar(Almacenequest).subscribe(response => 
          {
            this.ResponseAlmacen = response
            this.Almacen = this.ResponseAlmacen.datos.result;
          }
            )



}

/*
ListarProducto (param_Empresa:string,param_CodigoProducto:string){

  const ProductoRequest : productorequest = <productorequest>{}
  const values = this.group.value
  
  if (values["codigoproducto"]!=null && values["codigoproducto"]!=""){
  
  ProductoRequest.CodigoProducto = param_CodigoProducto
  ProductoRequest.CodigoEmpresa = param_Empresa 
  ProductoRequest.Descripcion = "%"
  ProductoRequest.Color = "%"
  ProductoRequest.Talla = "%"
  ProductoRequest.Tipo_Prenda = 0
  ProductoRequest.Genero = "%"
  ProductoRequest.Estado = "A"
  
  
  this.ProductoService.listar(ProductoRequest).subscribe(response => 
    {
  
      this.ResponseProducto = response
  
    if (this.ResponseProducto.datos.status!=200){
        this.util.showMessage(this.ResponseProducto.meta.mensaje)
    }else{
  
      this.group.controls['descripcion'].setValue(response.datos.result[0].descripcion)
      this.group.controls['stockactual'].setValue(response.datos.result[0].stock)
      //this.group.controls['lote'].setValue(this.ResponseProducto.datos.result[0])
      //this.group.controls['costounitario'].setValue(0)
      //this.group.controls['stockactual'].setValue(0)
      //lote : new FormControl (null,Validators.required),
  
        }
  
  }, (errorServicio)=>{
    this.util.showMessage( errorServicio.error.meta.mensaje);
    this.group.controls['codigoproducto'].setValue("");
    this.group.controls['descripcion'].setValue("")
    this.group.controls['cantidad'].setValue(0)

    
  })
  
  }else {
  
  this.util.showMessage("Ingrese un valor valido")
  
  }
  
  }
*/

ListarProducto (param_Empresa:string,param_CodigoProducto:string){

  const ProductoLoteRequest : ProductoLoteRequest = <ProductoLoteRequest>{}
  const values = this.group.value
  let CodigoProductoLote 
  let CodigoProducto
  let SumaStockTotal = 0 
  let CodigoLote = 0
  this.Lote =[]
  
  if (values["codigoproducto"]!=null && values["codigoproducto"]!=""){
  
    if (!isNaN(values["codigoproducto"])){

      CodigoProductoLote ="" 
      CodigoProducto = param_CodigoProducto

    }else{
      CodigoProductoLote = param_CodigoProducto
      CodigoProducto = 0
      
    }
    ProductoLoteRequest.CodigoProducto = CodigoProducto
    ProductoLoteRequest.CodigoEmpresa = param_Empresa 
    ProductoLoteRequest.Descripcion = "%"
    ProductoLoteRequest.Estado = ""
    ProductoLoteRequest.CodigoAlmacen = values["almacenorigen"]
    ProductoLoteRequest.CodigoLote = 0 
    ProductoLoteRequest.CodigoProductoLote = CodigoProductoLote
  
  
  this.TransferenciaentreAlamcenesService.listarProductoLote(ProductoLoteRequest).subscribe(response => 
    {
  
      this.ResponseProductoLote = response
  
    if (this.ResponseProductoLote.datos.status!=200){
        this.util.showMessage(this.ResponseProductoLote.meta.mensaje)
    }else{
  
      this.group.controls['descripcion'].setValue(response.datos.result[0].descripcion)
      //this.group.controls['stockactual'].setValue(response.datos.result[0].stock)
      
      this.ResponseProductoLote.datos.result.forEach(item => {
        
         this.ListaLote = <Lote>{}
         this.ListaLote.CodigoLote = item.codigoLote
         this.ListaLote.Descripcion = item.desLote
         
         this.Lote.push(this.ListaLote)
         this.group.controls['lote'].setValue(item.codigoLote)
         SumaStockTotal = SumaStockTotal + item.stock
         CodigoLote = item.codigoLote
      });
  
      this.group.controls['stockactual'].setValue(SumaStockTotal)
      
      this.ListarStockxLote(CodigoLote)
    
      }
  
  }, (errorServicio)=>{
    this.util.showMessage( errorServicio.error.meta.mensaje);
    this.group.controls['codigoproducto'].setValue("");
    this.group.controls['descripcion'].setValue("")
    this.group.controls['cantidad'].setValue(0)

    
  })
  
  }else {
  
  this.util.showMessage("Ingrese un valor valido")
  
  }
  
  }


  ListarStockxLote (row: any ){

    let values = this.group.value

     let indice = this.ResponseProductoLote.datos.result.findIndex(i => i.codigoLote == row) 

     this.group.controls['stockactuallote'].setValue(this.ResponseProductoLote.datos.result[indice].stock)

     

  }


  AgregarItem (event){
  
    if (event.pointerType!="") {
        const values = this.group.value

        alert(event.pointerType);
        
        this.ListaProductoItem   = <TransferenciaDetalle>{} 

        this.ListaProductoItem.CodigoProducto = values["codigoproducto"]
        this.ListaProductoItem.Descripcion = values["descripcion"]
        this.ListaProductoItem.cantidad = values["cantidad"]
        this.ListaProductoItem.PrecioUnitario = 0
        this.ListaProductoItem.CodigoLote =  values["lote"]
        
        this.ListaProductoItem.IsEditing = false

        if (this.ListaProductoItem.Descripcion != null && this.ListaProductoItem.Descripcion != ""){

           if (this.ListaProductoItem.cantidad > values["stockactuallote"]){
              this.util.showMessage("La cantidad a transferir no puede ser mayor al stock actual")
           }else {
              if (this.ListaProductoItem.cantidad !=0 ){

                const index = this.ListaTransferenciaItem.findIndex(i => i.CodigoProducto ===this.ListaProductoItem.CodigoProducto )
                if (index ===-1){
                    //this.dataTable = this.ListaTmpTransaccionItemGeneral
                    this.ListaTransferenciaItem.push(this.ListaProductoItem)
                    // alert(this.ListaProductoItem.Descripcion)
                    this.dataTable = Array.from(this.ListaTransferenciaItem)   

                }
              }
            }
        }

    }

  }


  


  
handleKeyDown(event: any,tipo:string)
{
    if (event.keyCode == 13)
    {

      if (tipo==="Producto"){
        const values = this.group.value
        this.ListarProducto("00000001",values["codigoproducto"])

         alert('Producto')
        
    }

    }
    else if (event.keyCode == 40)
    {
        // action
    }  
    else if (event.keyCode == 38)
    {
        // action
    }    
}


initializeForm(){
  this.group = new FormGroup({

  codigoproducto : new FormControl (null,null),
  descripcion : new FormControl (null,null),
  observacion : new FormControl(null,null),
  cantidad : new FormControl (0,null),
  stockactual : new FormControl (0,null ),
  almacenorigen : new FormControl (null,Validators.required),
  almacendestino : new FormControl (null,Validators.required),
  lote : new FormControl (null,null),
  stockactuallote : new FormControl (0,null),                       

 });
}


  metadataTable: MetadataTable[] = [

    {field:"CodigoLote", title: "Cdo. Lote",editable : false,type:"number" },
    
    {field:"CodigoProducto", title: "Codigo Producto",editable : false,type:"text" },
    {field:"Descripcion", title: "Descripcion",editable : false,type:"text" },
    {field:"cantidad", title: "Cantidad",editable : true,type:"number" },
    // {field:"Lote", title: "Lote"},
   
  
  ];



}
