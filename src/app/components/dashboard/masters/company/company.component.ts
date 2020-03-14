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
import { CommonService } from '../../../../services/common.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent  implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CompanyComponent>,
    private commonService: CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
        companyCode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
        name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        address1: [null],
        address2: [null],
        address3: [null],
        address4: [null],
        email: [null],
        ext1: [null],  // hide
        ext2: [null], // hide
        ext3: [null], // hide
        ext4: [null], // hide
        finacialYear: ['2020'],  // current year
        fromMonth: ['1'],  // currnet month
        gstNo: [null],
        active: ['Y'],
        place: [null],
        state: [null],
        pinCode: [null],
        phone1: [null],
        phone2: [null],
        phone3: [null],
        panNo: [null],
        tanNo: [null],
        natureOfBusiness: [null],
        toMonth: ['1'] // currnet month
      });


      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        this.modelFormData.controls['companyCode'].disable();
      }

  }

  ngOnInit() {

  }

  get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['companyCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
