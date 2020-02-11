import { Component, Inject, Optional, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AlertService } from '../../../../services/alert.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';

@Component({
  selector: 'app-card-type',
  templateUrl: './card-type.component.html',
  styleUrls: ['./card-type.component.scss']
})
export class CardTypeComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  cardTypeList: any;
  getAccList: any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CardTypeComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,

    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      cardName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      type: [null],
      cardType1: [null],
      ext1: [null],
      ext2: [null],
      glaccount: [null],
      active: [null]
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['code'].disable();
    }

  }

  ngOnInit() {
    this.getTypeList();
  }

  getTypeList() {
    this.spinner.show();
    const getTypeList = String.Join('/', this.apiConfigService.getTypeList);
    this.apiService.apiGetRequest(getTypeList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.cardTypeList = res.response['typeList'];
          }
        }
        this.spinner.hide();
      }, error => {

      });
  }

  getGLAccountsList() {
    this.spinner.show();
    const getGLAccountsList = String.Join('/', this.apiConfigService.getGLAccountsList, this.modelFormData.get('type').value);
    this.apiService.apiGetRequest(getGLAccountsList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.getAccList = res.response['accounts'];
          }
        }
        this.spinner.hide();
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
    this.modelFormData.controls['code'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
