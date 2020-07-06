import { Component, Inject, Optional, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';

import { AlertService } from '../../../../services/alert.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from '../../../../enums/common/common';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
  companyList: any;


  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BranchesComponent>,
    private commonService: CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

    this.modelFormData = this.formBuilder.group({
      branchId: 0,
      companyId: 0,
      branchCode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      branchName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      isMainBranch: [null],
      subBranchof: [null],
      branchImage: [null],
      address: [null],
      city: [null],
      state: [null],
      country: [null],
      pinCode:[null],
      phone: [null],
      fax: [null],
      email: [null],
      gstin: [null],
      narration: [null],
      sapCode: [null],
        //branchCode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
        //name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        //address1: [null],
        //address2: [null],
        //address3: [null],
        //address4: [null],
        //advanceAmount: [null],
        //bankAccountNumber: [null],
        //bankBranch: [null],
        //bankName: [null],
        //building: [null],
        //companyCode: [null],
        //email: [null],
        //ext1: [null],
        //ext2: [null],
        //gstNo: [null],
        //ifsccode: [null],
        //leaseAmount: [null],
        //leaseExpiryDate: [null],
        //leaseStartDate: [null],
        //ownerName: [null],
        //phoneNo: [null],
        //phone1: [null],
        //phone2: [null],
        //phone3: [null],
        //active: ['Y'],
        //place: [null],
        //state: [null],
        //pinCode: [null],
        //companyCodeNavigation: [null]
      });

      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
       this.modelFormData.controls['branchCode'].disable();
      }

  }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    const getCompanyUrl = String.Join('/', this.apiConfigService.getCompanysList);
    this.apiService.apiGetRequest(getCompanyUrl)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.companyList = res.response['companiesList'];
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
    this.modelFormData.controls['branchCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}

