import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../shared/components/confirm/confirm.component';
import { ExportComponent } from '../shared/components/export/export.component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private readonly dialog: MatDialog,
    private readonly notifier : MatSnackBar,
    private readonly bottomSheet : MatBottomSheet
    ) { }


  openModal(classComponent: any ,
    options:{[s: string ]:string | boolean | number},
    returnReference: boolean = false
    ): Observable<any> | any {

    const reference: MatDialogRef<typeof classComponent> =
    this.dialog.open(
      classComponent ,
      options);

      if (returnReference){

        return reference;

      }else{

          return reference.afterClosed();

      }
    
  }

  showMessage(message: string):void {
    this.notifier.open(message,null,
      {duration: 5000,horizontalPosition: 'end',
        verticalPosition: 'top',panelClass: ['blue-snackbar']})
  }

  showMessageError(message:string):void{
    this.notifier.open(message,null,
      {duration: 5000,horizontalPosition:'end',
    verticalPosition:'top', panelClass: ['message-error']})
  }

  confirm(message: string=""): Observable<any>{
    
    const referenceConfirm  =   this.openModal(
    ConfirmComponent,
    {
      with: "320px",
      disableClose:true,
    },
    true
    );

    if (message){

      referenceConfirm.componentInstance.message = message;
    }
    return referenceConfirm.afterClosed();

  }


  openSheet(){
this.bottomSheet.open(ExportComponent);

  }

}
