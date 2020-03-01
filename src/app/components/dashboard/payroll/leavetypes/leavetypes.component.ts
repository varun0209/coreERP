import { Component, Inject, Optional, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AlertService } from '../../../../services/alert.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { StatusCodes } from '../../../../enums/common/common';

@Component({
  selector: 'app-leavetypes',
  templateUrl: './leavetypes.component.html',
  styleUrls: ['./leavetypes.component.scss']
})
export class LeavetypesComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  apiConfigService: any;
  apiService: any;
  companyList: any;


  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LeavetypesComponent>,
    private commonService: CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      leaveCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      leaveName: ['', [Validators.required, Validators.minLength(2)]],
      leaveMaxLimit: [null],
      ext1: [null],
      leaveMinLimit: [null],
      companyCode: [null],
      active: [null],
      addDate: [null],
      branchCode: [null],
      remarks: [null],
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      // this.modelFormData.controls['code'].disable();
    }

  }

  ngOnInit() {
    //this.getTableData();
  }


  getTableData() {
    this.commonService.showSpinner();
    const getLeaveopeningbalanceUrl = String.Join('/', this.apiConfigService.getLeaveopeningbalanceList);
    this.apiService.apiGetRequest(getLeaveopeningbalanceUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.companyList = res.response['companiesList'];
            }
          }
          this.commonService.hideSpinner();
        }, error => {

        });
  }

  showErrorAlert(caption: string, message: string) {
    // this.alertService.openSnackBar(caption, message);
  }

  get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
