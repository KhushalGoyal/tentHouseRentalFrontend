import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TransactionsRoutingModule } from './transactions-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
