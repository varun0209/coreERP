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
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.scss']
})

export class TanksComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
    BranchesList: any;
    getCashPaymentBranchesListArray: any;

  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TanksComponent>,

    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      branchId: [null],
      branchCode: [null],
      branchName: [null],
      tankNo: [null],
      tankCapacityinLtrs: [null],
      noofPumps: [null],
      isWorking: [null],
      productCode: [null],
      itemCode: [null],
      tankId: "0"
      
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
    }

  }

  ngOnInit()
  {
    this.GetBranchesList();
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

  getproductCodeList() {
    
  }


  getbranchCodeList() {
    this.spinner.show();
    const getbranchcodeList = String.Join('/', this.apiConfigService.Getbranchcodes, this.modelFormData.get('branchName').value);
    this.apiService.apiGetRequest(getbranchcodeList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.getCashPaymentBranchesListArray = res.response['productcode'];
              this.modelFormData.patchValue({
                branchCode: this.getCashPaymentBranchesListArray[0]['id'],
              })
            }
          }
          this.spinner.hide();
        });
  }

 
 get formControls() { return this.modelFormData.controls; }


  save() {
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
