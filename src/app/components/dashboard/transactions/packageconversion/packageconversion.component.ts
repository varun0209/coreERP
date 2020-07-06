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

@Component({
  selector: 'app-packageconversion',
  templateUrl: './packageconversion.component.html',
  styleUrls: ['./packageconversion.component.scss']
})

export class PackageconversionComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  LeaveTypeatList: any;
  inputproductName = null;
  outputproductName = null;
  applDate = new FormControl(new Date());

  sessions: Session[] =
    [
      { value: 'FirstHalf', viewValue: 'FirstHalf' },
      { value: 'SecondHalf', viewValue: 'SecondHalf' }
    ];
    inputcodeList: any;
    outcodeList: any;
    getCashPaymentBranchesListArray: any;
  
  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<PackageconversionComponent>,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      inputProductId: "0",
      inputproductCode: [null],
      inputproductName: [null],
      outputProductId: "0",
      outputproductCode: [null],
      outputproductName: [null],
      inputQty: [null],
      outputQty: [null],
      addDate: [null],
      packingConversionId: "0"
    });



    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      //this.modelFormData.controls['packingConversionId'].disable();
    }

  }

  ngOnInit() {
     this.GetInputcodeproductList();
    //this.GetouttcodeproductList();
  }
  GetInputcodeproductList() {
    const getCompanyUrl = String.Join('/', this.apiConfigService.getInputcodeproductList);
    this.apiService.apiGetRequest(getCompanyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              //this.companyList = res.response['companiesList'];
              this.inputcodeList = res.response['InputcodeList'];
              this.outcodeList = res.response['InputcodeList'];
            }
          }
          this.spinner.hide();
        });
  }
   //GetInputcodeproductList() {
   //  const getCostCentersListUrl = String.Join('/', this.apiConfigService.getInputcodeproductList);
   //  this.commonService.apiCall(getCostCentersListUrl, (data) => {
   //    this.inputcodeList = data['InputcodeList'];
   //    this.outcodeList = data['InputcodeList'];
   //    console.log(data);
   //  });
   //}
 
  
  getproductCodeList() {
    //debugger;
    this.spinner.show();
    const getbranchcodeList = String.Join('/', this.apiConfigService.GetproductNames, this.modelFormData.get('inputproductCode').value);
    this.apiService.apiGetRequest(getbranchcodeList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.getCashPaymentBranchesListArray = res.response['productNames'];
              this.modelFormData.patchValue({
                inputproductName: this.getCashPaymentBranchesListArray[0]['name'],
              })
            }
          }
          this.spinner.hide();
        }, error => {

        });
  }
  getoutproductCodeList() {
   // debugger;
    this.spinner.show();
    const getbranchcodeList = String.Join('/', this.apiConfigService.GetproductNames, this.modelFormData.get('outputproductCode').value);
    this.apiService.apiGetRequest(getbranchcodeList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.getCashPaymentBranchesListArray = res.response['productNames'];
              this.modelFormData.patchValue({
                outputproductName: this.getCashPaymentBranchesListArray[0]['name'],
              })
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


  save() {
    //debugger;
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
