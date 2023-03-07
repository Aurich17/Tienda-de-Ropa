import { AgregarMenu, ListaMenus} from 'src/app/menus/domain/response/menu_response';
import { ManteMenuComponent} from './../mante-menu/mante-menu.component';
import { Component,Inject,OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editamenurequest, guardamenurequest, menurequest } from 'src/app/menus/domain/request/menu_request';
import { MenuResponse } from 'src/app/menus/domain/response/menu_response';
import { MenuRepository } from 'src/app/menus/domain/menu.repository';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-reg-menu',
  templateUrl: './reg-menu.component.html',
  styleUrls: ['./reg-menu.component.css']
})

export class RegMenuComponent implements OnInit  {

  //------------------------------------------------------------------------------
  menusAgregar =[]; //ESTOS VALORES SON LOS QUE SE AGREGAn A LA TABLA CUANDO DE GUARDAR
  agregarResponse : AgregarMenu;
  //dataTable : ListaMenus[];
  menuResponse : MenuResponse
  subMenu = 'subMenu'
  group:FormGroup
  codigoMenu:number

  //TABLA QUE MUESTRA EN LA PANTALLA DE REG-MENU
  // metadataTable = [
  //   {field:'indicadorgrupomenu', title:'GrupoMenu'},
  //   {field:'descripcion',title:'Descripcion'},
  //   {field:'linkmenu',title:'Link-Menu'},
  //   {field:'codigogrupomenu', title:'Codigrupomenu'},
  //   {field:'estado',title:'Estado'},
  // ];

  initializeForm(){
    this.group = new FormGroup({
    desMenu : new FormControl (null,null),
    desIcono : new FormControl (null,null),
    grupoMenu : new FormControl (null,null),
    subMenu : new FormControl (null,null),
    desUrl : new FormControl (null,null),
    radio : new   FormControl(null,null),   
   })};

  constructor(private readonly menuService : MenuRepository, @Inject(MAT_DIALOG_DATA) private data : ListaMenus,private readonly  reference: MatDialogRef<RegMenuComponent>){}
  
  ngOnInit(): void {
    console.log('Se a inicializado el REG-MENU');
    this.initializeForm();
  }
  closeModal() {
    this.reference.close();
  }
  
  guardamenu(){
    //Esto agarra los valores del HTML dentro del FormGroup
    const requestGuardaRol: guardamenurequest =<guardamenurequest>{}

    for(let i = 0 ; i < this.menusAgregar.length; i++){
      console.log('Este es el Array Nro: '+i);
      requestGuardaRol.CodigoMenu = 0
      requestGuardaRol.Descripcion = this.menusAgregar[i][0]
      requestGuardaRol.IndicadorGrupoMenu = this.menusAgregar[i][1]
      requestGuardaRol.CodigoGrupoMenu = this.menusAgregar[i][2]
      requestGuardaRol.linkmenu = this.menusAgregar[i][3]
      requestGuardaRol.Estado = this.menusAgregar[i][4]
      requestGuardaRol.iconomenu = this.menusAgregar[i][5]
      requestGuardaRol.Usuario_reg = 'admin'
      requestGuardaRol.Tipo = 'I'

      if(requestGuardaRol.IndicadorGrupoMenu == true){
        requestGuardaRol.IndicadorGrupoMenu = false
      }
      else{
        requestGuardaRol.IndicadorGrupoMenu = true
      }
      this.menuService.guardamenu(requestGuardaRol).subscribe(response=>
      {
        this.menuResponse = response
      }
      )
    }
    alert('GUARDADO CON EXITO');
  }
  mostrarLista(){
    const valores = this.group.value
    let lista = [];
    lista.push(valores['desMenu'])
    lista.push(valores['subMenu'])
    lista.push(valores['grupoMenu'])
    lista.push(valores['desUrl'])
    lista.push(valores['radio'])
    lista.push(valores['desIcono'])
    this.menusAgregar.push(lista)

     console.log('Tamano del array: '+this.menusAgregar.length)
    for(let i = 0 ; i < this.menusAgregar.length; i++){
       console.log(this.menusAgregar[i]);
     }
  }
}
