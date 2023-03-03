import { ListaMenus } from 'src/app/menus/domain/response/menu_response';
import { ManteMenuComponent} from './../mante-menu/mante-menu.component';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editamenurequest, guardamenurequest, menurequest } from 'src/app/menus/domain/request/menu_request';
import { MenuResponse } from 'src/app/menus/domain/response/menu_response';
import { MenuRepository } from 'src/app/menus/domain/menu.repository';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';

@Component({
  selector: 'app-reg-menu',
  templateUrl: './reg-menu.component.html',
  styleUrls: ['./reg-menu.component.css']
})
export class RegMenuComponent implements OnInit  {
  dataTable : ListaMenus[];
  menuResponse : MenuResponse
  subMenu = 'subMenu'
  group:FormGroup
  codigoMenu:number

  //TABLA QUE MUESTRA EN LA PANTALLA DE REG-MENU
  metadataTable : MetadataTable[] = [
    {field:'Descripcion',title:'Descripcion'},
    {field:'linkmenu',title:'Link-Menu'},
    {field:'Estado',title:'Estado'},
  ];

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
    const valores = this.group.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestGuardaRol: guardamenurequest =<guardamenurequest>{}
    
    requestGuardaRol.CodigoMenu = 0
    requestGuardaRol.Descripcion = valores['desMenu']
    requestGuardaRol.IndicadorGrupoMenu = valores['subMenu']
    requestGuardaRol.CodigoGrupoMenu = valores['grupoMenu']
    requestGuardaRol.linkmenu = valores['desUrl']
    requestGuardaRol.Estado = valores['radio']
    requestGuardaRol.iconomenu = valores['desIcono']
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
      alert('GUARDADO CON EXITO');
    }
    )
  }
}
