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
import { CommonService } from '../../../../services/common.service';
@Component({
  selector: 'vouchertypes',
  templateUrl: './vouchertypes.component.html',
  styleUrls: ['./vouchertypes.component.scss']
})

export class VoucherTypesComponent  implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
  voucherClass:any;
  compList:any;
  branchList:any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VoucherTypesComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private commonService:CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
        voucherCode: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        branch: [null, [Validators.required]],
        company: [null, [Validators.required]],
        active: [null],
        noSeries: [null],
        ext1: [null],
        ext2: [null],
        period:[null],
        prefix: [null],
        transaction: [null],
        voucherType:[null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
      });


      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        this.modelFormData.controls['voucherCode'].disable();
      }

  }

  ngOnInit() {
this.getVoucherClassList();
this.getCompaniesList();
this.getVoucherBranchesList();
  }

  getVoucherClassList() {
    const getVoucherClassList = String.Join('/', this.apiConfigService.getVoucherClassList);
    this.apiService.apiGetRequest(getVoucherClassList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.voucherClass = res.response['VoucherClassList'];
          }
        }
        this.spinner.hide();
      });
  }

  getCompaniesList() {
    const getCompaniesList = String.Join('/', this.apiConfigService.getCompaniesList);
    this.apiService.apiGetRequest(getCompaniesList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.compList = res.response['CompaniesList'];
          }
        }
        this.spinner.hide();
      });
  }

  getVoucherBranchesList() {
    const getVoucherBranchesList = String.Join('/', this.apiConfigService.getVoucherBranchesList);
    this.apiService.apiGetRequest(getVoucherBranchesList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.branchList = res.response['BranchesList'];
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
    this.modelFormData.controls['voucherCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
