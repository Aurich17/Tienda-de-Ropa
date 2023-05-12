import { LoteResponse} from '../../../../lotes/domain/response/lote_response';
import { Component,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {  guardaloterequest } from 'src/app/lotes/domain/request/lote_request';
import { LoteRepository } from 'src/app/lotes/domain/lote.repository';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-reg-lotes',
  templateUrl: './reg-lotes.component.html',
  styleUrls: ['./reg-lotes.component.css']
})
export class RegLotesComponent implements OnInit {
  select: 'A'|'I' ='A'
  loteAgregar =[];
  loteResponse:LoteResponse
  group:FormGroup;
  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (null,Validators.required),
    radio : new   FormControl(null,Validators.required),
   });
   }
  constructor(private readonly  loteService : LoteRepository,private readonly  reference: MatDialogRef<RegLotesComponent>,  private readonly util: UtilService) { }


  ngOnInit(): void {
    this.initializeForm();
  }
  closeModal() {
    this.reference.close();
  }

  guardalote(){
    const requestGuardaLote: guardaloterequest =<guardaloterequest>{}
    const valores = this.group.value

      requestGuardaLote.Descripcion = valores['descripcion']
      requestGuardaLote.Estado = valores['radio']
      requestGuardaLote.Usuario = 'Admin'
      requestGuardaLote.Tipo = 'I'

      this.loteService.guardalote(requestGuardaLote).subscribe(response=>
      {
        this.loteResponse = response
        this.util.showMessage('GUARDADO CORRECTAMENTE')
        this.closeModal()
      }
      )
  }
  clear() {
    this.group.reset({radio: 'A'})
  }
}
