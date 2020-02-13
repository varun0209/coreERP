import { Component, Inject, Optional, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDatepickerInputEvent } from '@angular/material';

import { AlertService } from '../../../../services/alert.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-leaverequest',
  templateUrl: './leaverequest.component.html',
  styleUrls: ['./leaverequest.component.scss']
})
export class LeaverequestComponent implements OnInit {

  isSubmitted  =  false;
  formData: FormGroup;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.formData  =  this.formBuilder.group({
        code: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
        name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        applyDate: [null],
        leaveType: [null],
        fromDate: [null]
      });



  }

  ngOnInit() {
    
  }

  get formControls() { return this.formData.controls; }

  
  save() {
    if (this.formData.invalid) {
      return;
    }

    this.formData.patchValue({
      applyDate : this.commonService.formatDate(this.formData.get('applyDate').value),
      fromDate : this.commonService.formatDate(this.formData.get('fromDate').value)
    })

    
    console.log(this.formData)
  }

  oncancel() {
  }

}
