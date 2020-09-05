import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CostomerComponent } from './costomer.component';


const routes: Routes = [{
  path : '', component: CostomerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostomerRoutingModule { }
