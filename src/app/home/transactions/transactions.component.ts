import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { apis } from 'src/app/services/config';
import { catchError, map } from 'rxjs/operators';
import { error } from 'protractor';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  hideTable = false;
  loading = false;
  submitted = false;
  error = { isError : false , err : ''}
  transactionForm : FormGroup;
  transactionList : [] = []
  transactionOutList : [] = []
  customers: [];
  products: [];
  constructor(
    private commonService : CommonService,
    private formBuilder : FormBuilder,
    private autheticationService : AuthenticateService
  ) {
      this.getList()
      this.getCustomerList()
      this.getProductList()
      this.getTransactionOut()
   }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      transaction_date_time : ['', Validators.required],
      customer_id : ['', Validators.required],
      product_id : ['', Validators.required],
      transaction_type : ['', Validators.required],
      quantity: ['', Validators.required],
      transaction_id_parent: [''],
    });
    this.autheticationService.errorRes.subscribe(ele => {
      this.error = { isError : true, err : ele}
      setTimeout(()=>{
        this.error = { isError : false, err : ''}
      },4000)
      this.resetForm()
      this.loading = false
    })
  }

  getList(): void {
    this.commonService.get(apis.transaction).subscribe((ele : any) => {
      this.transactionList = ele
    })
  }

  getCustomerList(): void {
    this.commonService.get(apis.customer).subscribe((ele : any) => {
      this.customers = ele
    })
  }

  getProductList(): void {
    this.commonService.get(apis.product).subscribe((ele : any) => {
      this.products = ele
    })
  }

  getTransactionOut() : void {
    this.commonService.get(apis.transaction).subscribe((ele : any) => {
      let outTransactions = ele.filter(row => row.transaction_type == 'OUT')
      outTransactions.map(transaction => {
        let tempQuantity = 0
        ele.filter(trans => trans.transaction_id_parent == transaction._id).map(ele_ => {
          tempQuantity += ele_.quantity 
        })
        transaction.remaining_quantity = transaction.quantity - tempQuantity
      })
      this.transactionOutList = outTransactions.filter(ele => ele.remaining_quantity > 0)
    })
  }
  get f() { return this.transactionForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.transactionForm.invalid) {
      return;
    }
    this.loading = true
    console.log()
    console.log(this.transactionForm.getRawValue())
    this.commonService.post(apis.transaction, this.transactionForm.getRawValue()).subscribe(ele => {
      this.getTransactionOut()
      this.getList()
      this.loading = false;
      this.transactionForm.reset();
    })
  }

  selectTransactionParent(){
      let transaction : any = this.transactionOutList.filter((ele: any) => ele._id == this.transactionForm.controls['transaction_id_parent'].value)[0]
      transaction.transaction_type = 'IN'
      transaction.quantity = transaction.remaining_quantity;
      delete transaction.transaction_date_time;
      delete transaction.remaining_quantity
      transaction.transaction_id_parent = this.transactionForm.controls['transaction_id_parent'].value
      this.transactionForm.patchValue(transaction)
      this.transactionForm.controls['customer_id'].disable()
      this.transactionForm.controls['product_id'].disable()
      this.transactionForm.controls['transaction_type'].disable()
  }

  resetForm(){
    this.transactionForm.controls['customer_id'].enable()
    this.transactionForm.controls['product_id'].enable()
    this.transactionForm.controls['transaction_type'].enable()
    this.transactionForm.reset()
  }
}
