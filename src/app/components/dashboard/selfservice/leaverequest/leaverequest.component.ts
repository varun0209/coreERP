import { Component, Inject, Optional, OnInit, ViewChild } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';

import { AlertService } from '../../../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { StatusCodes } from '../../../../enums/common/common';
import { DatePipe, formatDate } from '@angular/common';
import { ApiConfigService } from '../../../../services/api-config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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


  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  LeaveTypeatList: any;
  companyList: any;
  brandList: any;
  MaterialGroupsList: any;
  SizesList: any; 
  getProductByProductCodeArray = [];
  getProductByProductNameArray: any[];
  applDate = new FormControl(new Date());

  sessions: Session[] =
   [
     { value: 'FirstHalf', viewValue: 'FirstHalf' },
     { value: 'SecondHalf', viewValue: 'SecondHalf' }
   ];
  EmpName: any;
  pipe = new DatePipe('en-US');
  now = Date.now();

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
      sno: ['0'],
      applDate: [null],
      leaveCode: [null],
      leaveFrom: [null],
      leaveTo: [null],
      leaveDays: [null],
      leaveRemarks: [null],
      status: [null],
      approvedId: [null],
      approveName: [null],
      reason: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+'), Validators.minLength(2), Validators.maxLength(40)]],
      authorizedStatus: [null],
      authorizedId: [null],
      formno: [null],
      trmno: [null],
      apprDate: [null],
      authDate: [null],
      accptedId: [null],
      accDate: [null],
      acceptedRemarks: [null],
      skip: [null],
      lopdays: [null],
      reportId: [null],
      reportName: [null],
      recomendedby: [null],
      companyCode: [null],
      companyName: [null],
      rejectedId: [null],
      rejectedName: [null],
      countofLeaves: [null],
      chkAcceptReject: [null],
      session1: [null],
      session2: null
    });

    
    
    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      //this.modelFormData.controls['empCode'].disable();
    }

  }

  ngOnInit()
  {
    const user = JSON.parse(localStorage.getItem('user'));
    this.getTableData();
    this.modelFormData.patchValue
      ({
        empCode: user.userName
      });
    this.getProductByProductCode(user.userName);
    this.onSearchChange(null);
  }


  //load data
  getLeaveApplDetailsList() {
   // debugger;
    const user = JSON.parse(localStorage.getItem('user'));
    const getLeaveApplDetailsListUrl = String.Join('/', this.apiConfigService.getLeaveRequestList, user.userName);
    this.apiService.apiGetRequest(getLeaveApplDetailsListUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.dataSource = new MatTableDataSource(res.response['LeaveApplDetailsList']);
              this.dataSource.paginator = this.paginator;
              //this.checkAll(false);
            }
          }
          this.spinner.hide();
        });
  }


  ///gettting NoofdaysCount code
  NoofdaysCount()
  {
    //debugger;
    var date1 = this.pipe.transform(this.modelFormData.get('leaveFrom').value, 'dd-MM-yyyy');
    var date2 = this.pipe.transform(this.modelFormData.get('leaveTo').value, 'dd-MM-yyyy');

    var session1 = this.modelFormData.get('session1').value
    var session2 = this.modelFormData.get('session2').value

    if (!isNullOrUndefined(date1)) {
      const getProductByProductCodeUrl = String.Join('/', this.apiConfigService.getnoofdayscount);
      this.apiService.apiPostRequest(getProductByProductCodeUrl, { Code: date1, date2, session1, session2 }).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['days'])) {
                this.EmpName = res.response['days']
                this.modelFormData.patchValue
                  ({
                    leaveDays: res.response['days']
                  });
                this.spinner.hide();
              }
            }
          }
        });
    } else {
      this.getProductByProductCodeArray = [];
    }
  }

  sessionevent()
  {
    this.NoofdaysCount();
  }
  orgValueChange()
  {
    //debugger;
    this.NoofdaysCount();
  }
  leaveToValueChange()
  {
    this.NoofdaysCount();
  }
  
  sessionevent2()
  {
    //debugger;
   //const user = JSON.parse(localStorage.getItem('user'));
    //let username = user.userName;
    //var date1 = this.modelFormData.get('leaveFrom').value
    //var date2 = this.modelFormData.get('leaveTo').value
    //let da1 = new Date(date1);
    //var da2 = new Date(date2);
    //var date = new Date(date1);

    var date1 = this.pipe.transform(this.modelFormData.get('leaveFrom').value, 'dd-MM-yyyy');
    var date2 = this.pipe.transform(this.modelFormData.get('leaveTo').value, 'dd-MM-yyyy');
    //var momentVariable = moment(date, 'MM-DD-YYYY');  
    //let str = date.toDateString();  
    var session1 = this.modelFormData.get('session1').value
    var session2 = this.modelFormData.get('session2').value

    if (!isNullOrUndefined(date1))
    {
      const getProductByProductCodeUrl = String.Join('/', this.apiConfigService.getnoofdayscount);
      this.apiService.apiPostRequest(getProductByProductCodeUrl, { Code: date1, date2,session1,session2 }).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['days'])) {
                this.EmpName = res.response['days']
                this.modelFormData.patchValue
                  ({
                    leaveDays: res.response['days']
                  });
                this.spinner.hide();
              }
            }
          }
        });
    } else {
      this.getProductByProductCodeArray = [];
    }
  }


  //sessionevents() {
  //  let countdays = 0;
  //  let Difference_In_Days = 0;
  //  //debugger;
  //  var date1 = this.modelFormData.get('leaveFrom').value
  //  var date2 = this.modelFormData.get('leaveTo').value

  //  //var date1 = this.modelFormData.get('leaveFrom').value
  //  //var date2 = this.modelFormData.get('leaveTo').value
  //  var da1 = new Date(date1);
  //  var da2 = new Date(date2);
  //  var session1 = this.modelFormData.get('session1').value
  //  var session2 = this.modelFormData.get('session2').value
  //  if ((session1 == "FirstHalf") && (session2 == "FirstHalf") && (da1 == da2)) {
  //    countdays = 0.5;
  //  }
  //  if ((session1 == "FirstHalf") && (session2 == "SecondHalf")) {
  //    countdays = 1.5;
  //  }
  //  if ((session1 == "SecondHalf") && (session2 == "SecondHalf")) {
  //    countdays = 2.0;
  //  }
  //  var Difference_In_Time = (da2.getTime() - da1.getTime());
  //  // To calculate the no. of days between two dates 
  //  Difference_In_Days = Difference_In_Time / (24 * 60 * 60 * 1000);
  //  //if (Difference_In_Days == 0)
  //  //{
  //  //  Difference_In_Days = 1;
  //  //}
  //  this.modelFormData.patchValue
  //    ({
  //      leaveDays: (Difference_In_Days + countdays)
  //    });
  //}
  //orgValueChanges()
  //{
  //  let countdays = 0;
  //  let Difference_In_Days = 0;
  //  //debugger;
  //  var date1 = this.modelFormData.get('leaveFrom').value
  //  var date2 = this.modelFormData.get('leaveTo').value
  //  var da1 = new Date(date1);
  //  var da2 = new Date(date2);
   
  //  var session1 = this.modelFormData.get('session1').value
  //  var session2 = this.modelFormData.get('session2').value
  //  if ((session1 == "FirstHalf") && (session2 == "FirstHalf") && (da1 == da2))
  //  {
  //     countdays = 0.5;
  //  }
  //  if ((session1 == "FirstHalf") && (session2 == "SecondHalf")) {
  //    countdays = 1.5;
  //  }
  //  if ((session1 == "SecondHalf") && (session2 == "SecondHalf")) {
  //    countdays = 2.0;
  //  }
  //  var Difference_In_Time = (da2.getTime() - da1.getTime());
  //  // To calculate the no. of days between two dates 
  //   Difference_In_Days = Difference_In_Time / (24 * 60 * 60 * 1000);
  //  //if (Difference_In_Days == 0)
  //  //{
  //  //  Difference_In_Days = 1;
  //  //}
  //  this.modelFormData.patchValue
  //    ({
  //      leaveDays: (Difference_In_Days + countdays)
  //    });
  //}
  //leaveToValueChanges()
  //{
  //  //debugger;
  //  let countdays = 0;
  //  let Difference_In_Days = 0;

  //  var date11 = this.modelFormData.get('leaveFrom').value
  //  var date12 = this.modelFormData.get('leaveTo').value
  //  var da1 = new Date(date11);
  //  var da2 = new Date(date12); 

  //  var session1 = this.modelFormData.get('session1').value
  //  var session2 = this.modelFormData.get('session2').value
  //  if (session1 != null && session2 != null)
  //  {
  //    if ((session1 == "FirstHalf") && (session2 == "FirstHalf") && (da1 == da2)) {
  //      countdays = 0.5;
  //    }
  //    if ((session1 == "FirstHalf") && (session2 == "SecondHalf")) {
  //      countdays = 1.5;
  //    }
  //    if ((session1 == "SecondHalf") && (session2 == "SecondHalf")) {
  //      countdays = 2.0;
  //    }
  //  }
   

  //  var Difference_In_Time = da2.getTime() - da1.getTime();
  //  Difference_In_Days = Difference_In_Time / (1000 * 3600  *24/*24 * 60 * 60 * 1000*/);
  //  //if (Difference_In_Days == 0)
  //  //{
  //  //  Difference_In_Days = 1;
  //  //}
  //  this.modelFormData.patchValue
  //    ({
  //      leaveDays: (Difference_In_Days + countdays)
  //    });
  //}



  getTableDataonempcodechangevent()
  {

    this.spinner.show();
    const getCompanyUrl = String.Join('/', this.apiConfigService.getLeaveTypeatList, this.modelFormData.get('empCode').value);
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

  getTableData() {
    //debugger;
    const user = JSON.parse(localStorage.getItem('user'));
    let username = user.userName;
    this.spinner.show();
    const getCompanyUrl = String.Join('/', this.apiConfigService.getLeaveTypeatList,username);
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


  getProductByProductCode(value) {
    //debugger;
    
    if (!isNullOrUndefined(value) && value != '') {
      const getProductByProductCodeUrl = String.Join('/', this.apiConfigService.getEmpCode);
      this.apiService.apiPostRequest(getProductByProductCodeUrl, { Code: value }).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['Empcodes'])) {
                this.getProductByProductCodeArray = res.response['Empcodes'];
                this.spinner.hide();
              }
            }
          }
          
        });
    } else {
      this.getProductByProductCodeArray = [];
    }
  }
  
  onSearchChange(code) {
    //debugger;
    let genarateVoucherNoUrl;
    if (!isNullOrUndefined(code)) {
      genarateVoucherNoUrl = String.Join('/', this.apiConfigService.getEmpName,code.value);
    } else {
      genarateVoucherNoUrl = String.Join('/', this.apiConfigService.getEmpName, this.modelFormData.get('empCode').value);
    }
    this.apiService.apiGetRequest(genarateVoucherNoUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['empname'])) {
              this.EmpName = res.response['empname']
              this.modelFormData.patchValue
                ({
                  empName: res.response['empname']
                });
              this.spinner.hide();
            }
          }
        }
        this.getTableDataonempcodechangevent();
      });
  }

  

  showErrorAlert(caption: string, message: string) {
    // this.alertService.openSnackBar(caption, message);
  }

  get formControls() { return this.modelFormData.controls; }


  save()
  {
   // debugger;
    if (this.modelFormData.invalid)
    {
      return;
    }

    this.modelFormData.patchValue({
     leaveTo: this.commonService.formatDate(this.modelFormData.get('leaveTo').value),
     leaveFrom: this.commonService.formatDate(this.modelFormData.get('leaveFrom').value)
    });
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}

