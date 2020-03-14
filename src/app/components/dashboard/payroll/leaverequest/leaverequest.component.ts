import { Component, Inject, Optional, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AlertService } from '../../../../services/alert.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { StatusCodes } from '../../../../enums/common/common';
import { DatePipe, formatDate } from '@angular/common';
import { ApiConfigService } from '../../../../services/api-config.service';
import { NgxSpinnerService } from 'ngx-spinner';


interface Session {
 value: string;
 viewValue: string;
}
//interface NumberType {
//  value: string;
//  viewValue: string;
//}
@Component({
  selector: 'app-leaverequest',
  templateUrl: './leaverequest.component.html',
  styleUrls: ['./leaverequest.component.scss']
})

export class LeaveRequestComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  LeaveTypeatList: any;
  companyList: any;
  brandList: any;
  MaterialGroupsList: any;
  SizesList: any; 

  applDate = new FormControl(new Date());

  sessions: Session[] =
   [
     { value: 'FirstHalf', viewValue: 'FirstHalf' },
     { value: 'SecondHalf', viewValue: 'SecondHalf' }
   ];

  //NumberTypes: NumberType[] =
  //  [
  //    { value: 'SL-10', viewValue: 'SL-10' },
  //    { value: 'CL-10', viewValue: 'CL-10' }
  //  ];




  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<LeaveRequestComponent>,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,

    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
  {

    this.modelFormData = this.formBuilder.group({
      empCode: [null],
      empName: [null],
      applDate: [null],
      leaveCode: [null],
      leaveFrom: [null],
      leaveTo: [null],
      leaveDays: [null],
      leaveRemarks: [null],
      status: [null],
      ext1: [null],
      ext2: [null],
      sno: [null],
      countofLeaves: [null],
      approvedID: [null],
      approveName: [null],
      reason: [null],
      chkAcceptReject: [null],
      reportID: [null],
      reportName: [null],
      appr_date: [null],
      acceptedRemarks: [null],
      companyCode: null,
      rejectedId: null,
      rejectedName: null,
      loPdays: null
    });

    
    
    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['empCode'].disable();
    }

  }

  ngOnInit() {
     this.getTableData();
  }

  getTableData() {
    //debugger;
    this.spinner.show();
    const getCompanyUrl = String.Join('/', this.apiConfigService.getLeaveTypeatList);
    this.apiService.apiGetRequest(getCompanyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.LeaveTypeatList = res.response['leavetypesList'];
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


  save()
  {
    //debugger;
    if (this.modelFormData.invalid)
    {
      return;
    }
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
