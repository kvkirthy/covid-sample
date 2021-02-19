import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { StateListComponent } from './state-list/state-list.component';
import { StateDetailsComponent } from './state-details/state-details.component';

@NgModule({
  declarations: [
    StateListComponent,
    StateDetailsComponent
  ],
  imports: [
    FormsModule,
    ChartsModule,
    CommonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSliderModule,
    MatButtonModule
  ]
})
export class ComponentsModule { }
