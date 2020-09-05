import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { apis } from 'src/app/services/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  hideTable = false;
  loading = false;
  submitted = false;
  productForm : FormGroup;
  productList : []
  constructor(
    private commonService : CommonService,
    private formBuilder : FormBuilder
  ) {
      this.getList()
   }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      product_title: ['', Validators.required],
      product_quantity: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  getList(): void {
    this.commonService.get(apis.product).subscribe((ele : any) => {
      this.productList = ele
    })
  }

  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }
    this.loading = true
    console.log()
    this.commonService.post(apis.product, {product_title : this.f.product_title.value,quantity_total : parseInt(this.f.product_quantity.value),price : parseInt(this.f.price.value)}).subscribe(ele => {
      this.loading = false;
      this.productForm.reset();
      this.getList()
    })
  }
  getQuantity(row){
    return row.quantity_total - row.quantity_booked
  }
}
