import { Component, Inject, Optional, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { ApiService } from '../../../../services/api.service';
import { String } from 'typescript-string-operations';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-acctoaccclass',
  templateUrl: './acctoaccclass.component.html',
  styleUrls: ['./acctoaccclass.component.scss']
})

export class AccToAccClassComponent  implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
  accClassList:any;
  tranTypes:any;
  salesGlAcc:any;
  purchaseAcc:any;
  invAcc:any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AccToAccClassComponent>,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
        code: [null],
        accClass: [null, [Validators.required]],
        inventoryAcc: [null],
        active: [null],
        purchaseAcc: [null],
        ext1: [null],
        ext2: [null],
        saleAcc:[null],
        transactionType: [null, [Validators.required]]
      });


      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        //this.modelFormData.controls['code'].disable();
      }

  }

  ngOnInit() {
    this.getAccountingClass();
    this.getMatTranTypes();
    this.getSalesGlAccounts();
    this.getPurchaseGlAccounts();
    this.getInventoryGlAccounts();
  }

  getAccountingClass() {
    const getAccountingClass = String.Join('/', this.apiConfigService.getAccountingClass);
    this.apiService.apiGetRequest(getAccountingClass)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.accClassList = res.response['AccountingclassList'];
          }
        }
        this.spinner.hide();
      });
  }

  getMatTranTypes() {
    const getMatTranTypes = String.Join('/', this.apiConfigService.getMatTranTypes);
    this.apiService.apiGetRequest(getMatTranTypes)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.tranTypes = res.response['mattranstype'];
          }
        }
        this.spinner.hide();
      });
  }

  getSalesGlAccounts() {
    const getSalesGlAccounts = String.Join('/', this.apiConfigService.getSalesGlAccounts);
    this.apiService.apiGetRequest(getSalesGlAccounts)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.salesGlAcc = res.response['GLSalesAccounts'];
          }
        }
        this.spinner.hide();
      });
  }

  getPurchaseGlAccounts() {
    const getPurchaseGlAccounts = String.Join('/', this.apiConfigService.getPurchaseGlAccounts);
    this.apiService.apiGetRequest(getPurchaseGlAccounts)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.purchaseAcc = res.response['GLPurchaseAccounts'];
          }
        }
        this.spinner.hide();
      });
  }

  getInventoryGlAccounts() {
    const getInventoryGlAccounts = String.Join('/', this.apiConfigService.getInventoryGlAccounts);
    this.apiService.apiGetRequest(getInventoryGlAccounts)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.invAcc = res.response['GLInventoryAccounts'];
          }
        }
        this.spinner.hide();
      });
  }

  get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    //this.modelFormData.controls['code'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
