import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { ApiConfigService } from '../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { isNullOrUndefined, callbackify } from 'util';
import { StatusCodes } from '../../../../enums/common/common';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  branchFormData: FormGroup;
  modelFormData: FormGroup;
  getSalesBranchListArray: any;
  tableData: any;


  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,

  ) {


    this.branchFormData = this.formBuilder.group({
      branch: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      billNo: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      billDate: [null],
      name: [null],
      mobile1: [null],
      mobile2: [null],
      address1: [null],
      address2: [null],
      address3: [null],
      gstNo: [null],
      email: [null],
      billType: [null]
    });

    this.modelFormData = this.formBuilder.group({
      modelForSale: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      cash: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      credit: [null],
      rtgs: [null],
      INTChanges: [null],
      phonePay: [null],
      paytm: [null],
      check: [null],
      financeAmount: [null],
      financeName: [null],
      cardAmt: [null],
      cardType: [null],
      netAmount: [null]
    });

    this.branchFormData.controls['billNo'].disable();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!isNullOrUndefined(user)) {
      this.genarateBillNo(user.branchCode);
      // this.getEmployesList(user.branchCode);
      // this.getcashAcctobranchAccountsList(user.branchCode);
      // this.getModelList(user.branchCode);
    }
    // this.getCardTypeList();
    // this.getGlaccountsList();
    // this.getFinanceGlAccList();
    // this.getTableData();
  }

  ngOnInit() {
    const getSalesBranchListUrl = String.Join('/', this.apiConfigService.getSalesBranchList);
    this.commonService.apiCall(getSalesBranchListUrl, (data) => {
      this.getSalesBranchListArray = data.BranchesList;
    });
  }

  getTableData() {
    const getcashAcctobranchAccountsListUrl = String.Join('/', this.apiConfigService.getBranchesBranchList);
     this.commonService.apiCall(getcashAcctobranchAccountsListUrl, (data) => {
       console.log(data);
       this.tableData = data['branchesList'];
     });
   }

  genarateBillNo(branch?) {
    this.branchFormData.patchValue({
      billNo : ''
    })
    var generateBillUrl;
    if (!isNullOrUndefined(branch)) {
      generateBillUrl = String.Join('/', this.apiConfigService.generateBillNo, branch);
    } else {
      generateBillUrl = String.Join('/', this.apiConfigService.generateBillNo, this.branchFormData.get('branch').value);
    }
    this.commonService.apiCall(generateBillUrl, (data) => {
      console.log(data);
      this.branchFormData.patchValue({
        billNo : data['BillNo']
      })
    });
  }

  getEmployesList(branch) {
   const getEmployesListUrl = String.Join('/', this.apiConfigService.getEmployesList, branch);
    this.commonService.apiCall(getEmployesListUrl, (data) => {
      console.log(data);
    });
  }


  getcashAcctobranchAccountsList(branch) {
   const getcashAcctobranchAccountsListUrl = String.Join('/', this.apiConfigService.getcashAcctobranchAccountsList, branch);
    this.commonService.apiCall(getcashAcctobranchAccountsListUrl, (data) => {
      console.log(data);
    });
  }

  getModelList(branch) {
   const getModelListUrl = String.Join('/', this.apiConfigService.getModelList, branch);
    this.commonService.apiCall(getModelListUrl, (data) => {
      console.log(data);
    });
  }

  getCardTypeList() {
   const getCardTypeListUrl = String.Join('/', this.apiConfigService.getCardTypeList);
    this.commonService.apiCall(getCardTypeListUrl, (data) => {
      console.log(data);
    });
  }

  getGlaccountsList() {
   const getGlaccountsListUrl = String.Join('/', this.apiConfigService.getGlaccountsList);
    this.commonService.apiCall(getGlaccountsListUrl, (data) => {
      console.log(data);
    });
  }

  getFinanceGlAccList() {
   const getFinanceGlAccListUrl = String.Join('/', this.apiConfigService.getFinanceGlAccList);
    this.commonService.apiCall(getFinanceGlAccListUrl, (data) => {
      console.log(data);
    });
  }


  // this.branchFormData.patchValue({
  //   applyDate : this.commonService.formatDate(this.branchFormData.get('applyDate').value),
  //   fromDate : this.commonService.formatDate(this.branchFormData.get('fromDate').value)
  // })

}
