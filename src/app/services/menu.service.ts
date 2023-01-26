import { Injectable } from '@angular/core';
import { Menu } from '../core/presentacion/component/accordion/accordion/type/Menu';
import { IMenu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  Menu: IMenu [] = [
  {path: "/RegistroParte", title: "Registro Partes" , icon :"face"},
  {path: "/CapacidadMaquina", title: "Capacidad Maquina" , icon :"face"},
  {path: "/vizualizarParte", title: "Vizualizar Parte" , icon :"face"},
  {path: "/capacidadmaquina", title: "Capacidad Maquina" , icon :"face"},
  ]


  menus: Menu[] = [
    {
        "name": "PRODUCCION",
        "iconClass": "settings", 
        "active" :false,
        "submenu": [
            {
                "name": "Gestion Partes",
                "url": "/gestionpartes"
            },
            {
                "name": " Capacidad Maquina",
                "url": "/capacidadmaquina"
            },
            {
                "name": "Aperturar Tiempo Muerto",
                "url": "/tiempomuerto"
            },
            {
                "name": "Cerrar Tiempo Muerto",
                "url": "/cerrartiempomuerto"
            },
            {
                "name": "Importar Programacion",
                "url": "/importarprograma"
            }
        ]
    },
    {
        "name": "COMERCIAL",
        "iconClass": "face", 
        "active" :false,
        "submenu": [
            {
                "name": " The secondary menu ",
                "url": ""
            },
            {
                "name": " The secondary menu ",
                "submenu": [
                    {
                        "name": " Level 3 menu ",
                        "submenu": [
                            {
                                "name": " Level 4 menu ",
                                "url": ""
                            }
                        ]
                    }
                   
                ]
            },
            {
                "name": " The secondary menu ",
                "url": ""
            },
            {
                "name": " The secondary menu ",
                "submenu": [
                    {
                        "name": " Level 3 menu ",
                        "submenu": [
                            {
                                "name": " Level 4 menu ",
                                "url": ""
                            }
                        
                        ]
                    }
                   
                ]
            },
            {
                "name": " The secondary menu ",
                "url": ""
            }
        ]
    },
 
];
  constructor() { }
}
