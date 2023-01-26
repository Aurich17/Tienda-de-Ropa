export interface UserEntity {

    usuario? : string ;
   // email? : string ;
    password? : string ;
  //  isactive? : string 
  //  refreshtoken?: string ;
  //  roles?: string[];
}

export interface ResponseLogin{

 datos : {status : number,totalRegistro: number,
 result: result
},
 meta :  {mensaje:string }
}


export interface result{
    
  token:string;
  codigoCompañia : string ,
  nombreCompañia: string,
  menu: Menu;
  
}


export interface Menu{

  title : string ,
  group:boolean ,
  grupomenu : GroupMenu[],
  active:boolean,
  codigoRol: number

}

export interface GroupMenu{

  title : string ,
  group:boolean ,
  children : Children[],
  active:boolean
}

export interface Children{
  title: string,
  icon: string,
  link: string ,
  children: Children[],
  active:boolean
}
