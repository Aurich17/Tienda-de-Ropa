export type Menu = {
   // name: string, 
   // iconClass: string, 
   // active: boolean,
   // submenu: { name: string, url: string }[]

    
     name: string, 
     iconClass: string, 
     active :boolean
     submenu: { name: string,url?:string , 
      submenu?: { name: string,
        submenu :{name: string,url:string}[]
      }[]
      
      }[]

/*
active: boolean,
MenuId:number,
MenuName:string,
MenuLink:string,
Action:string,
Controller:string,
ParentID:number,
SortOrder:number,
ModuleId:string,
Menus?: {
  active: boolean,
  MenuId:number,
  MenuName:string,
  MenuLink:string,
  Action:string,
  Controller:string,
  ParentID:number,
  SortOrder:number,
  ModuleId:string

}[]
*/

  }