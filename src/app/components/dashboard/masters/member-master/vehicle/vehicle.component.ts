import { Component, Inject, Optional, OnInit, Input, OnChanges } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../../services/api.service';

import { AlertService } from '../../../../../services/alert.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../../services/api-config.service';
import { StatusCodes } from '../../../../../enums/common/common';
import { CommonService } from '../../../../../services/common.service';
import { SnackBar } from '../../../../../enums/common/common';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit, OnChanges {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  companyList: any;
  tableUrl: any;
  vehicleTypes: any = [];

  @Input() vehicleTableData: any = [];

  isFormEdit: boolean = false;

  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    // public dialogRef: MatDialogRef<VehicleComponent>,
    private commonService: CommonService,
    // @Optional() is used to prevent error if no data is passed
    // @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.modelFormData = this.formBuilder.group({
      vehicleId: [null],
      memberId: [null],
      memberCode: [null],
      memberShares: [null],
      vehicleRegNo: [null],
      vehicleModel: [null],
      isValid: [null],
      fromDate: [null],
      toDate: [null],
      vehicleTypeId: [null],
      vehicleTypeName: [null],
      vehicleType: [null],

    });

  }

  ngOnChanges() {
    this.formData = this.vehicleTableData[0];
    if (!isNullOrUndefined(this.formData)) {
      this.seDefaults();
      this.tableUrl = {
        url: this.apiConfigService.getVehicles,
        registerUrl: this.apiConfigService.registerMemberMaster,
        updateUrl: this.apiConfigService.updateVehicle
      }
    }
  }

  seDefaults() {
    this.modelFormData.controls['memberId'].setValue(this.formData.memberId);
    this.modelFormData.controls['memberCode'].setValue(this.formData.memberCode);
    this.modelFormData.controls['memberId'].disable();
    this.modelFormData.controls['memberCode'].disable();
  }

  ngOnInit() {
    this.getVehicleTypes();
  }

  getVehicleTypes() {
    this.apiService.apiGetRequest(this.apiConfigService.getVehicleTypes)
      .subscribe(
        response => {
          // debugger
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              // console.log(res);
              this.vehicleTypes = res.response['VehicleTypes'];
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

  get formControls() { return this.modelFormData.controls; }

  addOrUpdateEvent(value) {
    if (value.action == 'Edit') {
      this.formData = value.item;
      if (!isNullOrUndefined(this.formData)) {
        this.modelFormData.patchValue(this.formData);
        this.modelFormData.controls['memberId'].disable();
        this.modelFormData.controls['memberCode'].disable();
        this.isFormEdit = true;
      }
    }
  }

  save() {
  
    if (this.modelFormData.invalid) {
      return;
    }

    this.modelFormData.controls['memberId'].enable();
    this.modelFormData.controls['memberCode'].enable();

    let memberCode = this.modelFormData.controls['memberCode'].value;

    if (!this.isFormEdit) {
      this.apiService.apiPostRequest(this.tableUrl.registerUrl + '/' + memberCode, this.modelFormData.value)
        .subscribe(
          response => {
            const res = response.body;
            if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
              if (!isNullOrUndefined(res.response)) {
                this.alertService.openSnackBar('Record Added...', 'close', SnackBar.success);
                this.reset();
                this.getVehicleTableData(memberCode);
              }
            }
            this.spinner.hide();
          }
        );
    }

    else if (this.isFormEdit) {

      this.apiService.apiUpdateRequest(this.tableUrl.updateUrl, this.modelFormData.value)
        .subscribe(
          response => {
            const res = response.body;
            if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
              if (!isNullOrUndefined(res.response)) {
                this.alertService.openSnackBar('Record Updated...', 'close', SnackBar.success);
                this.reset();
                this.getVehicleTableData(memberCode);
              }
            }
            this.spinner.hide();
          }
        );
    }

  }

  reset() {
    this.modelFormData.reset();
    this.seDefaults();
  }

}

