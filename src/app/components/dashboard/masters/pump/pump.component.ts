import { Component, Inject, Optional, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { StatusCodes } from '../../../../enums/common/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { ApiConfigService } from '../../../../services/api-config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { String } from 'typescript-string-operations';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-pump',
  templateUrl: './pump.component.html',
  styleUrls: ['./pump.component.scss']
})

export class PumpComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  BranchesList: any;
  getCashPaymentBranchesListArray: any;
    ProductGroupsList: any;

  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PumpComponent>,

    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      branchId: [null],
      branchCode: [null],
      branchName: [null],
      productId: [null],
      productCode: [null],
      productName: [null],
      tankId: [null],
      tankNo: [null],
      //pumpId: [null],
      pumpNo: [null],
      pumpCapacityinLtrs: [null],
      meterReading: [null],
      isWorking: [null],
      pumpId: "0"

    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
    }

  }

  ngOnInit() {
    this.GetBranchesList();
    this.GetProductGroupsList();
  }

  GetBranchesList() {
    const getBranchesListUrl = String.Join('/', this.apiConfigService.GetBranches);
    this.apiService.apiGetRequest(getBranchesListUrl)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.BranchesList = res.response['BranchesList'];
          }
        }
          this.spinner.hide();
      });
  }
  GetProductGroupsList() {
    const getProductGroupsListUrl = String.Join('/', this.apiConfigService.GetProductGroups);
    this.apiService.apiGetRequest(getProductGroupsListUrl)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.ProductGroupsList = res.response['ProductGroupsList'];
          }
        }
          this.spinner.hide();
      });
  }


  getbranchCodeList() {
    const getbranchcodeList = String.Join('/', this.apiConfigService.GetBranchcodes, this.modelFormData.get('branchName').value);
    this.apiService.apiGetRequest(getbranchcodeList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.getCashPaymentBranchesListArray = res.response['branchcode'];
              this.modelFormData.patchValue({
                branchCode: this.getCashPaymentBranchesListArray[0]['id'],
                tankNo: this.getCashPaymentBranchesListArray[0]['name'],
              })
            }
          }
          this.spinner.hide();
        });

  }
  getGetProductGroupsNamesList() {
    const getProductGroupsNamesList = String.Join('/', this.apiConfigService.GetProductGroupsNames, this.modelFormData.get('productCode').value);
    this.apiService.apiGetRequest(getProductGroupsNamesList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.getCashPaymentBranchesListArray = res.response['ProductGroupsName'];
              this.modelFormData.patchValue({
                productName: this.getCashPaymentBranchesListArray[0]['name'],
              })
            }
          }
          this.spinner.hide();
        });
  }


 get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
