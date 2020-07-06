import { Component, Inject, Optional, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StatusCodes } from '../../../../enums/common/common';
import { ApiService } from '../../../../services/api.service';
import { ApiConfigService } from '../../../../services/api-config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/services/common.service';

import { String } from 'typescript-string-operations';
@Component({
  selector: 'app-materialgroups',
  templateUrl: './materialgroups.component.html',
  styleUrls: ['./materialgroups.component.scss']
})

export class MaterialGroupsComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  AccountingClassList: any;
    companyList: any;

  constructor(
    private commonService: CommonService,
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<MaterialGroupsComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      groupId:0,
      groupCode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      groupName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      // hsnCode: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      // compCode: [null],
      // ext1: [null],
      // ext2: [null],
      // accClass:[null],
      narration: [null]
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['groupId'].disable();
    }

  }

  ngOnInit() {
    this.getAccountingClassList();
    this.companiesListData();
  }


  companiesListData() {
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
        }, error => {

        });
  }

  getAccountingClassList() {
    const getCompanyUrl = String.Join('/', this.apiConfigService.getAccountingClassList);
    this.apiService.apiGetRequest(getCompanyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.AccountingClassList = res.response['AccountingClassList'];
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
    this.modelFormData.controls['groupId'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
