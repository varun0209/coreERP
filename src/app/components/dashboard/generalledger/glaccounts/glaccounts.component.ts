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
  selector: 'app-glaccounts',
  templateUrl: './glaccounts.component.html',
  styleUrls: ['./glaccounts.component.scss']
})

export class GlAccountsComponent  implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
  accGrpList:any;
  accTypeList:any;
  paymentType:any;
  pricingLevel:any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GlAccountsComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private commonService:CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
        ledgerId:0,
        ledgerCode: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        ledgerName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        accountGroupId: [null, [Validators.required]],
        accountTypeId: [null],
        openingBalance: 0,
        GetPaymentTypelist: [null],
        crOrDr: [null],
        mailingName: [null],
        bankAccountNumber: [null],
        phone: [null],
        email:[null],
        mobile:[null],
        cst:[null],
        tin:[null],
        pan:[null],
        creditLimit:0,
        creditPeriod:0,
        pricinglevelId:[null],
        address:[null],
        narration:[null]
      });


      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        this.modelFormData.controls['ledgerCode'].disable();
      }

  }

  ngOnInit() {
this.getAccountGrouplist();
this.getAccountTypelist();
this.getPaymentTypelist();
this.getPricingLevellist();
  }

  getAccountGrouplist() {
    const getAccountGrouplist = String.Join('/', this.apiConfigService.getAccountGrouplist);
    this.apiService.apiGetRequest(getAccountGrouplist)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.accGrpList = res.response['GetAccountGrouplist'];
          }
        }
        this.spinner.hide();
      });
  }

  getAccountTypelist() {
    const getAccountTypelist = String.Join('/', this.apiConfigService.getAccountTypelist);
    this.apiService.apiGetRequest(getAccountTypelist)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.accTypeList = res.response['GetAccountTypelist'];
          }
        }
        this.spinner.hide();
      });
  }

  getPaymentTypelist() {
    const getPaymentTypelist = String.Join('/', this.apiConfigService.getPaymentTypelist);
    this.apiService.apiGetRequest(getPaymentTypelist)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.paymentType = res.response['GetPaymentTypelist'];
          }
        }
        this.spinner.hide();
      });
  }

  getPricingLevellist() {
    const getPricingLevellist = String.Join('/', this.apiConfigService.getPricingLevellist);
    this.apiService.apiGetRequest(getPricingLevellist)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.pricingLevel = res.response['GetPricingLevellist'];
          }
        }
        this.spinner.hide();
      });
  }

  copyledgerName(){
    this.modelFormData.patchValue({
      mailingName:this.modelFormData.get('ledgerName').value
    })
  }

  get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['ledgerCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
