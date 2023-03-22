import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';
import { ProductoResponse } from 'src/app/producto/domain/response/producto.response';
import { ProductoRepository } from 'src/app/producto/domain/producto.repository';
import { UtilService } from 'src/app/services/util.service';
import { guardaproductorequest } from 'src/app/producto/domain/request/producto_request';

@Component({
  selector: 'app-reg-producto',
  templateUrl: './reg-producto.component.html',
  styleUrls: ['./reg-producto.component.css']
})
export class RegProductoComponent implements OnInit {
  select:'A'|'I'='A'
  productoResponse:ProductoResponse
  group:FormGroup
  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (null,Validators.required),
    color : new FormControl (null, Validators.required),
    talla : new FormControl (null,Validators.required),
    prenda : new FormControl (null,Validators.required),
    genero : new FormControl (null,Validators.required),
    radio : new   FormControl(null,null),   
   });
   }

  constructor(private readonly productoService : ProductoRepository,private readonly  reference: MatDialogRef<RegProductoComponent>, private readonly util: UtilService) { }
  

  ngOnInit(): void {
    this.initializeForm();
  }
  closeModal() {
    this.reference.close();
  }

  guarda(){
    const valores = this.group.value
    const requestGuardaProducto: guardaproductorequest =<guardaproductorequest>{}
      requestGuardaProducto.CodigoProducto = '0'
      requestGuardaProducto.Descripcion = valores['descripcion']
      requestGuardaProducto.Color = valores['color']
      requestGuardaProducto.Talla = valores['talla']
      requestGuardaProducto.Genero = valores['genero']
      requestGuardaProducto.Tipo_Prenda = valores['prenda']
      requestGuardaProducto.Estado = valores['radio']
      requestGuardaProducto.Usuario_reg = 'Admin'
      requestGuardaProducto.Tipo = 'I'
      
      this.productoService.guardaproducto(requestGuardaProducto).subscribe(response=>
      {
        this.productoResponse = response
        this.util.showMessage('GUARDADO CORRECTAMENTE')
        this.closeModal()
      }
      )
  }
  clear() {
    this.group.reset({radio: 'A'})
  }
}
