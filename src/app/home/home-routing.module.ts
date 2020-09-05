import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {path : '', component: HomeComponent, canActivate:[AuthGuard],
  children : [
    {path : '', loadChildren : () => import('./products/products.module').then(mod => mod.ProductsModule), canActivate: [AuthGuard] },
    {path : 'customers', loadChildren : () => import('./costomer/costomer.module').then(mod => mod.CostomerModule), canActivate: [AuthGuard]},
    {path : 'transactions', loadChildren : () => import('./transactions/transactions.module').then(mod => mod.TransactionsModule), canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
