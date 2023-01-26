import { Component, OnInit } from '@angular/core';
import { KeyPadButton } from 'src/app/interfaces/keypad-button.interface';
import { ParteEntity } from '../../domain/parte-entity';
import { AperturaparteRepository } from '../../domain/parte.repository';

@Component({
  selector: 'app-page-aperturaparte',
  templateUrl: './page-aperturaparte.component.html',
  styleUrls: ['./page-aperturaparte.component.css']
})
export class PageAperturaparteComponent implements OnInit {

list: ParteEntity[];
constructor (private readonly aperturaparteService : AperturaparteRepository){}

listKeyPadButtons: KeyPadButton[] = [
  
  {icon:'description',color:'warn',action:'nuevo',tooltip:'Nuevo',texto : "Nuevo",estado:""},
  {icon:'add',color:'warn',action:'agregar',tooltip:'Agregar',texto:"Agregar",estado:""}
];


 
  ngOnInit(): void {

    //this.aperturaparteService.listar(10).subscribe((response) => (this.list = response));

    
  }


  insert(parte: ParteEntity){
    //console.log(value);
    //Enviar a la capa de aplicacion 
    //tiene que llamar al controlador userlogincaseuse

    //this.aperturaparteService.insert(parte);

  }

}
