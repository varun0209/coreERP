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
  selector: 'app-taxstructure',
  templateUrl: './taxstructure.component.html',
  styleUrls: ['./taxstructure.component.scss']
})

export class TaxstructuresComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  BranchesList: any;
  getCashPaymentBranchesListArray: any;
    TaxGroupsList: any;
    PSGroupsList: any;

  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TaxstructuresComponent>,

    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      taxStructureId: "0",
      taxStructureCode: [null],
      taxGroupId: "0",
      taxGroupCode: "0",
      taxGroupName: [null],
      description: [null],
      fromDate: [null],
      toDate: [null],
      purchaseAccount: [null],
      salesAccount: [null],
      totalPercentageGst: [null],
      cgst: [null],
      sgst: [null],
      igst: [null],
      totalGst: [null],
      narration: [null]

    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['taxStructureCode'].disable();
    }

  }

  ngOnInit() {
    this.GetTaxGroupsList();
    this.GetPurchaseAccountsList();
  }

  setTotalGST(val) {
    this.modelFormData.patchValue({
      totalGst: val
    });
  }

  GetTaxGroupsList() {
    const getTaxGroupsListUrl = String.Join('/', this.apiConfigService.TaxGroupsLists);
    this.apiService.apiGetRequest(getTaxGroupsListUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.TaxGroupsList = res.response['TaxGroupsList'];
            }
          }
          this.spinner.hide();
        });

  }
  GetPurchaseAccountsList() {
    const getTaxGroupsListUrl = String.Join('/', this.apiConfigService.PurchaseAccountsList);
    this.apiService.apiGetRequest(getTaxGroupsListUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.PSGroupsList = res.response['PSGroupsList'];
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
    this.modelFormData.controls['taxStructureCode'].enable();
  }

  cancel() {
    this.dialogRef.close();
  }

}
