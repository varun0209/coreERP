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
@Component({
  selector: 'app-employee-in-branch',
  templateUrl: './employee-in-branch.component.html',
  styleUrls: ['./employee-in-branch.component.scss']
})
export class EmployeeInBranchComponent implements OnInit {

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
    public dialogRef: MatDialogRef<EmployeeInBranchComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
        branchCode: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
        name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        address1: [null],
        address2: [null],
        address3: [null],
        address4: [null],
        advanceAmount: [null],
        bankAccountNumber: [null],
        bankBranch: [null],
        bankName: [null],
        building: [null],
        companyCode: [null],
        email: [null],
        ext1: [null],
        ext2: [null],
        gstNo: [null],
        ifsccode: [null],
        leaseAmount: [null],
        leaseExpiryDate: [null],
        leaseStartDate: [null],
        ownerName: [null],
        phoneNo: [null],
        phone1: [null],
        phone2: [null],
        phone3: [null],
        active: ['Y'],
        place: [null],
        state: [null],
        pinCode: [null],
        companyCodeNavigation: [null]
      });

      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        this.modelFormData.controls['branchCode'].disable();
      }

  }

  ngOnInit() {
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

