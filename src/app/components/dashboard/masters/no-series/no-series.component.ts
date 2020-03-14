import { Component, OnInit, Optional, Inject } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

import { AlertService } from '../../../../services/alert.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from '../../../../enums/common/common';
import { CommonService } from '../../../../services/common.service';
import { String } from 'typescript-string-operations';

interface NumberType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-no-series',
  templateUrl: './no-series.component.html',
  styleUrls: ['./no-series.component.scss']
})
export class NoSeriesComponent implements OnInit {
    modelFormData: any;
    formData: any;
    PartnetTypeList: any;
  NumberTypes: NumberType[] = [
      { value: 'AUTO', viewValue: 'AUTO' },
      { value: 'MANUAL', viewValue: 'MANUAL'}
  ];

  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NoSeriesComponent>,
    private commonService: CommonService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      numberSeries: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      ext1: [null],
      ext2: [null],
      noType: [null],
      code: [null],
      partnerType: [null],
      compCode: [null],
      branchCode: [null],
      active: ['Y']
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
     this.modelFormData.controls['code'].disable();
    }

  }

  ngOnInit()
  {
    this.PartnetTypeListData();
  }

  PartnetTypeListData() {
    const getPartnetTypeUrl = String.Join('/', this.apiConfigService.getPartnerTypesList);
    this.apiService.apiGetRequest(getPartnetTypeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.PartnetTypeList = res.response['partnerTypeList'];
            }
          }
          this.spinner.hide();
        }, error => {

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
