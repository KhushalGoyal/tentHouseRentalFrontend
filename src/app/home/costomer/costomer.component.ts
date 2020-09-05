import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { apis } from 'src/app/services/config';

@Component({
  selector: 'app-costomer',
  templateUrl: './costomer.component.html',
  styleUrls: ['./costomer.component.css']
})
export class CostomerComponent implements OnInit {
  hideTable = false;
  loading = false;
  submitted = false;
  customerForm : FormGroup;
  customerList : []
  constructor(
    private commonService : CommonService,
    private formBuilder : FormBuilder
  ) {
      this.getList()
   }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customer_name: ['', Validators.required],
    });
  }

  getList(): void {
    this.commonService.get(apis.customer).subscribe((ele : any) => {
      this.customerList = ele
    })
  }

  get f() { return this.customerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.customerForm.invalid) {
      return;
    }
    this.loading = true
    console.log()
    this.commonService.post(apis.customer, {name : this.f.customer_name.value}).subscribe(ele => {
      this.loading = false;
      this.customerForm.reset();
      this.getList()
    })
  }
}
