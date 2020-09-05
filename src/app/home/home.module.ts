import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ProductsComponent } from './products/products.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CostomerComponent } from './costomer/costomer.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductsComponent, TransactionsComponent, CostomerComponent],
  imports: [
    CommonModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
