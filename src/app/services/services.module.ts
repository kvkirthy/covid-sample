import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAccessService } from './data-access.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{
     provide: DataAccessService
  }]
})
export class ServicesModule { }
