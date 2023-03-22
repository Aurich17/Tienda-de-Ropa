import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { ListaProducto, ProductoResponse } from 'src/app/producto/domain/response/producto.response';
import { ProductoRepository } from 'src/app/producto/domain/producto.repository';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editaproductorequest } from 'src/app/producto/domain/request/producto_request';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-edita-producto',
  templateUrl: './edita-producto.component.html',
  styleUrls: ['./edita-producto.component.css']
})
export class EditaProductoComponent implements OnInit {
  group:FormGroup
  codigoProducto:number
  productoResponse:ProductoResponse
  initializeForm(){
    this.group = new FormGroup({
      descripcion : new FormControl (this.data?.descripcion,Validators.required),
      color : new FormControl (this.data?.color, Validators.required),
      talla : new FormControl (this.data?.talla,Validators.required),
      prenda : new FormControl (this.data?.tipoPrenda,Validators.required),
      genero : new FormControl (this.data?.genero,Validators.required),
      radio : new   FormControl(this.data.estado,null), 
   });
  }
  constructor(private readonly productoService : ProductoRepository, @Inject(MAT_DIALOG_DATA) private data : ListaProducto,private readonly  reference: MatDialogRef<EditaProductoComponent>, private readonly util: UtilService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoProducto= this.data?.codigoProducto
  }

  closeModal() {
    this.reference.close();
  }

  guarda(){
    const valores = this.group.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestGuardaProducto: editaproductorequest =<editaproductorequest>{}
    
    requestGuardaProducto.CodigoProducto = this.codigoProducto.toString()
    requestGuardaProducto.Descripcion = valores['descripcion']
    requestGuardaProducto.Color = valores['color']
    requestGuardaProducto.Talla = valores['talla']
    requestGuardaProducto.Genero = valores['genero']
    requestGuardaProducto.Tipo_Prenda = valores['prenda']
    requestGuardaProducto.Estado = valores['radio']
    requestGuardaProducto.Usuario_reg = 'Admin'
    requestGuardaProducto.Tipo = 'U'
    
    this.productoService.editaproducto(requestGuardaProducto).subscribe(response=>
    {
      this.productoResponse = response
      this.util.showMessage('EDITADO CORRECTAMENTE');
      this.closeModal()
    }
    
    )
  }
  clear() {
    this.group.reset({radio: 'A'})
  }  

}
