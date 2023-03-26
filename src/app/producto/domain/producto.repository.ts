import { Observable } from "rxjs/internal/Observable";
import { guardaproductorequest, productorequest, editaproductorequest } from "./request/producto_request";
import { ProductoResponse} from "./response/producto.response";

export abstract class ProductoRepository{

    //abstract insert( fd : ParteEntity):Observable<ParteInsertResponse>;
    abstract listar( fd : productorequest):Observable<ProductoResponse>;
    abstract listarfiltro(fd : productorequest):Observable<ProductoResponse>;
    abstract guardaproducto(fd : guardaproductorequest):Observable<ProductoResponse>;
    abstract editaproducto(fd: guardaproductorequest):Observable<ProductoResponse>;
} 
  