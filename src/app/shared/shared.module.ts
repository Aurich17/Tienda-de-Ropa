import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ContainerComponent } from './components/container/container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';
import { KeypadComponent } from './components/keypad/keypad.component';
 import { MatTooltipModule } from '@angular/material/tooltip';
 import {MatDialogModule} from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from './components/dialogoconfirmacion/dialogoconfirmacion.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ConfirmComponent } from './components/confirm/confirm.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { ExportComponent } from './components/export/export.component';
import { MatListModule } from '@angular/material/list';
import { ErrorFormDirective } from './directives/error-form.directive';
import { ErrorControlDirective } from './directives/error-control.directive';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { FindestacionComponent } from './components/findestacion/findestacion.component'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  declarations: [ContainerComponent, TableComponent, KeypadComponent,DialogoConfirmacionComponent, ConfirmComponent, 
    ExportComponent,ErrorFormDirective,ErrorControlDirective,FindestacionComponent
  ],
  imports: [
    CommonModule,MatSidenavModule,MatCardModule,FlexLayoutModule, MatTableModule,MatButtonModule,MatIconModule,
    MatTooltipModule,MatDialogModule,MatBottomSheetModule,MatListModule,MatSelectModule,MatCheckboxModule,MatPaginatorModule,
     MatTableExporterModule,FormsModule 
  ],
  exports: [FlexLayoutModule,
     MatSidenavModule,
     MatToolbarModule,
     MatCardModule,
     MatFormFieldModule,
     MatInputModule,
     MatButtonModule,
     MatIconModule,
      ContainerComponent,
      ReactiveFormsModule,
      MatTableModule,
      TableComponent,
      KeypadComponent,
      MatTooltipModule,
      MatDialogModule,
      MatSnackBarModule,
      MatBottomSheetModule,
      ExportComponent,
      MatListModule,
      ErrorFormDirective,
      ErrorControlDirective,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSelectModule,
      FindestacionComponent,
      MatCheckboxModule,
      MatPaginatorModule,
      MatTableExporterModule
      


    ]
})
export class SharedModule { }