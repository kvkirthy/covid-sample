import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StateListComponent } from './state-list/state-list.component';
import { StateDetailsComponent } from './state-details/state-details.component';


@NgModule({
  declarations: [
    StateListComponent,
    StateDetailsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ComponentsModule { }
