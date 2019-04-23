import { NgModule } from "@angular/core";
import {MatDialogModule} from '@angular/material/dialog';
import {
  MatToolbarModule, MatButtonModule
} from '@angular/material';
@NgModule({
  imports: [
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class MaterialComponentsModule{}
