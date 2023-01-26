import { Directive, ElementRef } from "@angular/core";
import { NgControl, ValidationErrors } from "@angular/forms";
import { ErrorService } from "src/app/services/error.service";

@Directive(
{
   selector: "[formControlName], [FormControl]",

}

)

export class ErrorControlDirective{

    errorSpanId = "";
 constructor(private readonly el: ElementRef ,
             private readonly control: NgControl ,
             private readonly errors : ErrorService) //Permite acceder a los elementos HTML
    {}


    NgOnInit(){

        this.errorSpanId= Date.now().toString();

        this.control.statusChanges.subscribe(status => {

            if (status==="INVALID"){

                this.insertMessageError();
            } else {

            this.removeMessageError();

            }

        })
    }

    private insertMessageError(){
        this.removeMessageError();
        const valueErrors: ValidationErrors = this.control.errors
        const firtsError =  Object.keys(valueErrors)[0]
        const errorMessage = this.errors.getMessage(firtsError)
        
        const errSpan = `<span style= "color:red;font-style:italic;font-size:11px;" id ="${this.errorSpanId}">
        ${errorMessage}</span>`

        this.el.nativeElement.parentElement.insertAdjancetHTML(
            "beforeend",
            errSpan
            );
    }

    private removeMessageError(){


        const errorElement  = document.getElementById(this.errorSpanId)
        if (errorElement){
            errorElement.remove()
        }

    }
}