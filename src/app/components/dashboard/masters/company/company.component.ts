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

    this.modelFormData = this.formBuilder.group({
     //companyId: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      companyId:0,
      companyName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      mailingName: [null],
      address: [null],
      phone: [null],
      emailId: [null],
      web: [null],
      country: [null],
      state: [null],
      pin: [null],
      currencyId: [null],
      financialYearFrom: [null],
      booksBeginingFrom: [null],
      gstin: [null],
      cst: [null],
      currentDate: [null],
      logo: [null],
      extra1: [null],
      extra2: [null],
      extraDate: [null],
      city: [null],       
      });


      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        this.modelFormData.controls['companyId'].disable();
      }

  }

  ngOnInit() {

  }

  get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    
    this.modelFormData.controls['companyId'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
