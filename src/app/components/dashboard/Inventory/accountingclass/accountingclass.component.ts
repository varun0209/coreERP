import { Component, Inject, Optional, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
import { ApiService } from '../../../../services/api.service';
import { ApiConfigService } from '../../../../services/api-config.service';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-accountingclass',
  templateUrl: './accountingclass.component.html',
  styleUrls: ['./accountingclass.component.scss']
})

export class AccountingClassComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
    AccountingClassList: any;

  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AccountingClassComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      description: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      ext1: [null],
      ext2: [null],
      active: [null]
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['code'].disable();
    }

  }

  ngOnInit() {
    //this.AccountingClassList();
  }

  // getAccountingClassList() {
  //   this.commonService.showSpinner();
  //   const getCompanyUrl = String.Join('/', this.apiConfigService.getAccountingClassList);
  //   this.apiService.apiGetRequest(getCompanyUrl)
  //     .subscribe(
  //       response => {
  //         const res = response.body;
  //         if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //           if (!isNullOrUndefined(res.response)) {
  //             console.log(res);
  //             this.AccountingClassList = res.response['AccountingClassList'];
  //           }
  //         }
  //         this.commonService.hideSpinner();
  //       }, error => {

  //       });
  // }


  showErrorAlert(caption: string, message: string) {
    // this.alertService.openSnackBar(caption, message);
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
