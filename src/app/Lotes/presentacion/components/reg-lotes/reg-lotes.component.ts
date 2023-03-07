import { LoteResponse, ListaLote } from './../../../domain/response/lote_response';
import { Component,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  guardaloterequest } from 'src/app/Lotes/domain/request/lote_request';
import { LoteRepository } from 'src/app/Lotes/domain/lote.repository';

@Component({
  selector: 'app-reg-lotes',
  templateUrl: './reg-lotes.component.html',
  styleUrls: ['./reg-lotes.component.css']
})
export class RegLotesComponent implements OnInit {
  loteAgregar =[];
  loteResponse:LoteResponse
  group:FormGroup;
  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (null,null),
    radio : new   FormControl(null,null),   
   });
   }
  constructor(private readonly  loteService : LoteRepository,private readonly  reference: MatDialogRef<RegLotesComponent>) { }
  

  ngOnInit(): void {
    this.initializeForm();
  }
  closeModal() {
    this.reference.close();
  }

  guardalote(){
    const requestGuardaLote: guardaloterequest =<guardaloterequest>{}
    
    for(let i = 0 ; i < this.loteAgregar.length; i++){
      console.log('Este es el Array Nro: '+i);
      requestGuardaLote.Descripcion = this.loteAgregar[i][0]
      requestGuardaLote.Estado = this.loteAgregar[i][1]
      requestGuardaLote.Usuario = 'Admin'
      requestGuardaLote.Tipo = 'I'
      
      this.loteService.guardalote(requestGuardaLote).subscribe(response=>
      {
        this.loteResponse = response
      }
      )
    }
    alert('GUARDADO CON EXITO');
  }
  mostrarLista(){
    const valores = this.group.value
    let lista = [];

    lista.push(valores['descripcion'])
    lista.push(valores['radio'])
    
    this.loteAgregar.push(lista)
    console.log('Tamano del array: '+this.loteAgregar.length)
    for(let i = 0 ; i < this.loteAgregar.length; i++){
       console.log(this.loteAgregar[i]);
     }
  }
}
