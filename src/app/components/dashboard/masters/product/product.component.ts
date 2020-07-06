import { Component, Inject, Optional, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AlertService } from '../../../../services/alert.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from '../../../../enums/common/common';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
    tableData: any;
    tableUrl: any;
    getSupplierGroup: any;
    getProductGroup: any;
    getTaxApplicable:any;
    getProductPacking:any;
    getTaxGroup:any;
    getUnit:any;
    getTaxStructureList:any;
    getTaxListListArray:any;
    // isActive=true;


  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductComponent>,
    private commonService: CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
        productId:0,
        hsnNo: [null, [Validators.required]],
        productName: [null, [Validators.required, Validators.minLength(2)]],
        productCode: [null,[Validators.required, Validators.minLength(2)]],
        cgst: [null],
        productGroupCode: [null,[Validators.required]],
        productGroupName: [null],
        packingCode: [null,[Validators.required]],
        igst: [null],
        sgst: [null],
        taxType: [null],
        ugst: [null],
        active: [null],
        packingName: [null],
        packingSize: [null],
        taxGroupCode: [null,[Validators.required]],
        taxGroupName:[null],
        unitId: [null],
        unitName:[null],
        mrp: [null],
        purchaseRate:[null],
        salesRate:[null,[Validators.required, Validators.minLength(2)]],
        taxStructureCode:[null],
        taxapplicableOn:[null],
        totalPercentageGst: [null],
        totalGst:[null],
        supplierCode:[null],
        supplierName:[null,[Validators.required]],
        narration:[null],
        taxapplicableOnId:[null,[Validators.required]],
        isActive:[null]
      });

      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        this.modelFormData.controls['productCode'].disable();
        this.getTaxGrouplist();
        this.getTaxStructure();
      }

  }

  ngOnInit()
  {
    this.getSupplierGroupList();
    this.getProductGroupList();
    this.getTaxApplicableList();
    this.getProductPackingList();
    this.getUnitList();
  }

  getSupplierGroupList() {
    const getSupplierGroupList = String.Join('/', this.apiConfigService.getSupplierGroupList);
    this.apiService.apiGetRequest(getSupplierGroupList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.getSupplierGroup = res.response['SupplierGroupList'];
          }
        }
        this.spinner.hide();
      });
  }

        getTaxList() {
          const getTaxListUrl = String.Join('/', this.apiConfigService.getTaxList,
            this.modelFormData.get('taxStructureCode').value);
          this.apiService.apiGetRequest(getTaxListUrl).subscribe(
            response => {
              const res = response.body;
              if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
                if (!isNullOrUndefined(res.response)) {
                  if (!isNullOrUndefined(res.response['TaxList'])) {
                    this.modelFormData.patchValue({
                      cgst: res.response['TaxList'][0]['cgst'],
                      sgst: res.response['TaxList'][0]['sgst'],
                      igst: res.response['TaxList'][0]['igst'],
                      totalGst:res.response['TaxList'][0]['totalGst']
                    });
                    this.spinner.hide();
                  }
                }
              }
            });
        }
    
  

  getProductGroupList() {
    const getProductGroupList = String.Join('/', this.apiConfigService.getProductGroupList);
    this.apiService.apiGetRequest(getProductGroupList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.getProductGroup = res.response['ProductGroupList'];
          }
        }
        this.spinner.hide();
      });
  }

  getTaxApplicableList() {
    const getTaxApplicableList = String.Join('/', this.apiConfigService.getTaxApplicableList);
    this.apiService.apiGetRequest(getTaxApplicableList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.getTaxApplicable = res.response['TaxApplicableList'];
          }
        }
        this.spinner.hide();
      });
  }

  getProductPackingList() {
    const getProductPackingList = String.Join('/', this.apiConfigService.getProductPackingList);
    this.apiService.apiGetRequest(getProductPackingList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.getProductPacking = res.response['ProductPackingList'];
          }
        }
        this.spinner.hide();
      });
  }

  getTaxGrouplist(){
    const getTaxGrouplist=String.Join('/', this.apiConfigService.getTaxGrouplist,this.modelFormData.get('productGroupCode').value);
    this.apiService.apiGetRequest(getTaxGrouplist)
    .subscribe(
      response => {
      const res = response.body;
      if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
        if (!isNullOrUndefined(res.response)) {
          console.log(res);
          this.getTaxGroup = res.response['TaxGroupList'];
        }
      }
      this.spinner.hide();
    });
  }

  getUnitList() {
    const getUnitList = String.Join('/', this.apiConfigService.getUnitList);
    this.apiService.apiGetRequest(getUnitList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.getUnit = res.response['UnitList'];
          }
        }
        this.spinner.hide();
      });
  }

  getTaxStructure(){
    const getTaxStructure = String.Join('/', this.apiConfigService.getTaxStructure,this.modelFormData.get('taxGroupCode').value);
    this.apiService.apiGetRequest(getTaxStructure)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.getTaxStructureList = res.response['TaxStructureCode'];
          }
        }
        this.spinner.hide();
      });
  }
  checkCheckBoxvalue(event){
     this.modelFormData.patchValue({
       isActive:event.checked
     })
  }

  get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    // this.modelFormData.controls['productId'].enable();
    this.modelFormData.controls['productCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
    
  }

  cancel() {
    this.dialogRef.close();
  }

}

