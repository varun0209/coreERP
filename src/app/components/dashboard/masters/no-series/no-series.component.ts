import { Component, OnInit, Optional, Inject } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

import { AlertService } from '../../../../services/alert.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from '../../../../enums/common/common';

@Component({
  selector: 'app-no-series',
  templateUrl: './no-series.component.html',
  styleUrls: ['./no-series.component.scss']
})
export class NoSeriesComponent implements OnInit {
    modelFormData: any;
    formData: any;

  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NoSeriesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      //name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      ext1: [null],
      ext2: [null],
      notype: [null],
      noseries: [null],
      partnertype: [null],
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

  ngOnInit() {
  }

}
