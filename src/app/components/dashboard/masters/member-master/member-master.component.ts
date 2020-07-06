import { Component, Inject, Optional, OnInit, ViewChild, Input } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';

import { AlertService } from '../../../../services/alert.service';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from '../../../../enums/common/common';
import { CommonService } from '../../../../services/common.service';
import { MastersService } from '../masters.service';
import { TableComponent, DeleteItemComponent } from 'src/app/reuse-components';
import { SnackBar } from '../../../../enums/common/common';
import { VehicleComponent } from './vehicle/vehicle.component';

interface giftIssued {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-member-master',
  templateUrl: './member-master.component.html',
  styleUrls: ['./member-master.component.scss']
})
export class MemberMasterComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  companyList: any;
  tileNameList: any = [];
  stateList: any = [];
  passbookStatuses: any = [];
  relations: any = [];

  tableUrl: any;
  tableData: any = [];

  vehicleTableData: any = [];

  isMemberForm: boolean = false;

  @Input() memberUrls: any;
  isFormEdit: boolean = false;

  @ViewChild(TableComponent, { static: false }) tableComponent: TableComponent;

  giftIssued : giftIssued[]=
  [
    { value: 'Yes', viewValue: 'Yes' },
    { value: 'No', viewValue: 'No' }
  ];

  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    // public dialogRef: MatDialogRef<MemberMasterComponent>,
    private commonService: CommonService,
    public dialog: MatDialog,

    // @Optional() is used to prevent error if no data is passed
    // @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.modelFormData = this.formBuilder.group({

      memberId: [null],
      memberCode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(7)]],
      title: [null],
      memberName: [null],
      fatherOrHusbandName: [null],
      memberAge: [null],
      address: [null],
      city: [null],
      state: "ANDHRA PRADESH",
      country: "INDIA",
      pinCode: [null],
      phone: [null],
      mobile: [null],
      gender: [null],
      email: [null],
      govtIdentityType: [null],
      govtIdentity: [null],
      occupation: [null],
      nominee: [null],
      relation: [null],
      passBook: [null],
      passBookStatus: [null],
      joinDate: [null],
      noofShares: [null],
      issuedShares: [null],
      receivedShares: [null],
      totalShares: [null],
      createdDate: [null],
      isActive: [0],
      aadharNumber:[null],
      dob:[null],
      giftIssued:[null],
      giftIssuedDate:[null]

    });

  }

  ngOnInit() {
    // this.getTableData();

    this.tableUrl = this.memberUrls;

    this.getTitles();
    this.getStates();
    this.getPassbookStatuses();
    this.getRelations();

    this.searchEvent({});
  }


  searchEvent(event) {
    if(event == null) {
      event = {}
    }
    localStorage.setItem('memberObj', JSON.stringify(event));

    this.apiService.apiPostRequest(this.tableUrl.url, event)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.tableData = [];
              this.tableData = res.response[this.tableUrl.listName];
            }
          }
          this.spinner.hide();
        }
      );

  }


  getTitles() {
    this.apiService.apiGetRequest(this.apiConfigService.getTitles)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              // console.log(res);
              this.tileNameList = res.response['TileNameList'];
            }
          }
          this.spinner.hide();
        }
      );
  }

  getStates() {
    this.apiService.apiGetRequest(this.apiConfigService.getStates)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              // console.log(res);
              this.stateList = res.response['StateList'];
            }
          }
          this.spinner.hide();
        }
      );
  }

  getPassbookStatuses() {
    this.apiService.apiGetRequest(this.apiConfigService.getPassbookStatuses)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              // console.log(res);
              this.passbookStatuses = res.response['PassbookStatuses'];
            }
          }
          this.spinner.hide();
        }
      );
  }

  getRelations() {
    this.apiService.apiGetRequest(this.apiConfigService.getRelations)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              // console.log(res);
              this.relations = res.response['PassbookStatuses'];
            }
          }
          this.spinner.hide();
        }
      );
  }

  getVehicleTableData(memberCode) {

    this.apiService.apiGetRequest(this.apiConfigService.getVehicles + '/' + memberCode)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              // console.log(res);
              this.vehicleTableData = res.response['VechicleList'];
            }
          }
          this.spinner.hide();
        }
      );
  }

  addOrUpdateEvent(value) {
    if (value.action == 'Edit') {
      this.formData = value.item;
      if (!isNullOrUndefined(this.formData)) {
        this.modelFormData.patchValue(this.formData);
        this.modelFormData.controls['memberCode'].disable();
        this.formToggle();
        this.isFormEdit = true;

        this.getVehicleTableData(this.formData.memberCode)
      }
    }

  }

  get formControls() { return this.modelFormData.controls; }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }

    if (!this.isFormEdit) {
      this.modelFormData.patchValue({
        giftIssuedDate:this.commonService.formatDate(this.modelFormData.get('giftIssuedDate').value),
        dob:this.commonService.formatDate(this.modelFormData.get('dob').value),
        joinDate:this.commonService.formatDate(this.modelFormData.get('joinDate').value)
      });
      this.apiService.apiPostRequest(this.tableUrl.registerUrl, this.modelFormData.value)
        .subscribe(
          response => {
            const res = response.body;
            if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
              if (!isNullOrUndefined(res.response)) {
                this.searchEvent({});
                this.alertService.openSnackBar('Record Added...', 'close', SnackBar.success);
                this.modelFormData.reset();
                this.formToggle();
              }
            }
            this.spinner.hide();
          }
        );
    }

    else if (this.isFormEdit) {
      this.modelFormData.patchValue({
        giftIssuedDate:this.commonService.formatDate(this.modelFormData.get('giftIssuedDate').value),
        dob:this.commonService.formatDate(this.modelFormData.get('dob').value),
        joinDate:this.commonService.formatDate(this.modelFormData.get('joinDate').value)
      });
      this.modelFormData.controls['memberCode'].enable();

      this.apiService.apiUpdateRequest(this.tableUrl.updateUrl, this.modelFormData.value)
        .subscribe(
          response => {
            const res = response.body;
            if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
              if (!isNullOrUndefined(res.response)) {
                if (localStorage.getItem('memberObj')) {
                  let memberObj = JSON.parse(localStorage.getItem('memberObj'));
                  this.searchEvent(memberObj);
                  localStorage.removeItem('memberObj');
                }
                this.alertService.openSnackBar('Record Updated...', 'close', SnackBar.success);
                this.modelFormData.reset();
                this.formToggle();
              }
            }
            this.spinner.hide();
          }
        );
    }

  }

  formToggle(action?: any) {
    if (action) {
      this.modelFormData.reset();
    }
    this.isMemberForm = !this.isMemberForm;
    this.isFormEdit = false;

  }

}