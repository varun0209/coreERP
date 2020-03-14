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
  selector: 'app-cashacctobranches',
  templateUrl: './cashacctobranches.component.html',
  styleUrls: ['./cashacctobranches.component.scss']
})

export class CashAccToBranchesComponent  implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
  branchesList:any;
  bankList:any;
  cashaccList:any;
  glaccgrpList:any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CashAccToBranchesComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private commonService:CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
        code: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        branchCode: [null, [Validators.required]],
        active: [null],
        bankGlacc: [null],
        ext1: [null],
        ext2: [null],
        cashGlacc:[null],
      });


      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        this.modelFormData.controls['code'].disable();
      }

  }

  ngOnInit() {
this.getCashAccBranchesList();
this.getBankAccounts();
this.getCashAccounts();
  }

  getCashAccBranchesList() {
    const getCashAccBranchesList = String.Join('/', this.apiConfigService.getCashAccBranchesList);
    this.apiService.apiGetRequest(getCashAccBranchesList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.branchesList = res.response['BranchesList'];
          }
        }
        this.spinner.hide();
      });
  }

  getBankAccounts() {
    const getBankAccounts = String.Join('/', this.apiConfigService.getBankAccounts);
    this.apiService.apiGetRequest(getBankAccounts)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.bankList = res.response['GLCasnBankAccounts'];
          }
        }
        this.spinner.hide();
      });
  }

  getCashAccounts() {
    const getCashAccounts = String.Join('/', this.apiConfigService.getCashAccounts);
    this.apiService.apiGetRequest(getCashAccounts)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.cashaccList = res.response['GLCashAccounts'];
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
    this.modelFormData.controls['code'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
