import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateDetailsComponent } from './components/state-details/state-details.component';
import { StateListComponent } from './components/state-list/state-list.component';

const routes: Routes = [{
  path: 'home',
  component: StateListComponent
},{
  path: 'details',
  component: StateDetailsComponent
}, {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
