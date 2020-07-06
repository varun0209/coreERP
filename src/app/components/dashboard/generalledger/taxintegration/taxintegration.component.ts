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
  selector: 'app-taxintegration',
  templateUrl: './taxintegration.component.html',
  styleUrls: ['./taxintegration.component.scss']
})

export class TaxIntegrationComponent  implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
  taxcodeList:any;
  taxaccList:any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TaxIntegrationComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private commonService:CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
        taxCode: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        branchCode: [null],
        cgst: [null],
        active: [null],
        companyCode: [null],
        ext1: [null],
        ext2: [null],
        description:[null],
        igst: [null],
        sgst: [null],
        ugst:[null]
      });


      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        //this.modelFormData.controls['taxCode'].disable();
      }

  }

  ngOnInit() {
this.getTaxCodesList();
this.getGLTaxAccountList();
  }

  getTaxCodesList() {
    const getTaxCodesList = String.Join('/', this.apiConfigService.getTaxCodesList);
    this.apiService.apiGetRequest(getTaxCodesList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.taxcodeList = res.response['TaxcodesList'];
          }
        }
        this.spinner.hide();
      });
  }

  getGLTaxAccountList() {
    const getGLTaxAccountList = String.Join('/', this.apiConfigService.getGLTaxAccountList);
    this.apiService.apiGetRequest(getGLTaxAccountList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.taxaccList = res.response['GLTaxAccountList'];
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
    this.modelFormData.controls['taxCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
