import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../../services/common.service';
import { ApiConfigService } from '../../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../../services/api.service';
import { isNullOrUndefined, callbackify } from 'util';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss']
})
export class CreateBillComponent implements OnInit {

  displayedColumns: string[] = ['slNo','code', 'name', 'hsnNo', 'pump', 'qty', 'fqty',
  'slipNo','unit','discount','taxCode', 'rate','grossAmount','stockAvailable','delete'
];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  memberNamesList: any;
  branchesList: any;
  date = new Date((new Date().getTime() - 3888000000));

  branchFormData: FormGroup;
  modelFormData: FormGroup;
  tableFormData: FormGroup;
  getSalesBranchListArray: any;
  tableFormObj = false

  @ViewChild('autosize', { static: true }) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private _ngZone: NgZone
  ) {
    this.branchFormData = this.formBuilder.group({
      invoiceNo: [null],
      cashOrParty: [null],
      branchName: [null],
      invoiceDate: [(new Date()).toISOString()],
      vehicleNo: [null],
      accountName: [null],
      stateCode: [null],
      customerName: [null],
      customerGSTIN: [null],
      memberName: [null],
      payment: [null],
      mobileNo: [null],
      generalNo: [null],
      accountBalance: [null],
      suppliedTo: [null],
      amountInWords: [null],
      totalGross: [null],
      totalTax: [null],
      totalInvoiceAmount: [null],
    });
    this.branchFormData.controls['invoiceNo'].disable();
    this.branchFormData.controls['invoiceDate'].disable();
    this.branchFormData.controls['accountBalance'].disable();
    this.branchFormData.controls['totalGross'].disable();
    this.branchFormData.controls['totalTax'].disable();
    this.branchFormData.controls['totalInvoiceAmount'].disable();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!isNullOrUndefined(user)) {
      this.branchFormData.patchValue({
        branch: user.branchCode,
      })

      this.getSalesBranchList();
      this.genarateBillNo(user.branchCode);
      this.getBillingBranchesList();
      this.getMemberNamesList();


      this.getcashAcctobranchAccountsList(user.branchCode);
      this.getEmployesList(user.branchCode);

      // this.getModelList(user.branchCode);
      // this.getBillingList(user.branchCode);
    }
    this.getTableData();

    this.getFinanceGlAccList();
    this.getGlaccountsList();
    this.getCardTypeList();

  }

  ngOnInit() {
    this.formGroup();
    console.log(this.dataSource)
  }

  formGroup() {
    this.tableFormData = this.formBuilder.group({
      slNo: [null],
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      hsnNo: [null, [Validators.required]],
      pump: [null, [Validators.required]],
      qty: [null, [Validators.required]],
      fqty: [null, [Validators.required]],
      slipNo: [null, [Validators.required]],
      unit: [null, [Validators.required]],
      discount: [null, [Validators.required]],
      taxCode: [null, [Validators.required]],
      rate: [null, [Validators.required]],
      grossAmount: [null, [Validators.required]],
      stockAvailable: [null, [Validators.required]],
    });
  }

  setToFormModel(text, column, value) {
    this.tableFormObj = true;
    if (text == 'obj') {
      this.tableFormData.patchValue({
        [column]: value
      })
    }
    if (this.tableFormData.valid) {
      this.addTableRow();
      this.formGroup();
      this.tableFormObj = false;
    }
  }

  addTableRow() {
    let tableObj = {
      slNo: '',
      code: '',
      name: '',
      hsnNo: '',
      pump: '',
      qty: '',
      fqty: '',
      slipNo: '',
      unit: '',
      discount: '',
      taxCode: '',
      rate: '',
      grossAmount: '',
      stockAvailable: '',
      delete: '',
      text: 'obj'
    }
    console.log(this.dataSource)
    if (!isNullOrUndefined(this.dataSource)) {
      this.dataSource.data.push(tableObj);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    } else {
      this.dataSource = new MatTableDataSource([tableObj]);

    }
    this.dataSource.paginator = this.paginator;
  }

  deleteRow(i) {
    console.log(i)
    this.dataSource.data = this.dataSource.data.filter((value, index, array) => {
      return index !== i;
    });
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource)
  }

  save() {
    if (!this.tableFormObj) {
      this.dataSource.data.pop();
      console.log(this.dataSource.data);
    }
  }

  getSalesBranchList() {
    const getSalesBranchListUrl = String.Join('/', this.apiConfigService.getSalesBranchList);
    this.commonService.apiCall(getSalesBranchListUrl, (data) => {
      this.getSalesBranchListArray = data.BranchesList;
    });
  }

  genarateBillNo(branch?) {
    var generateBillUrl;
    if (!isNullOrUndefined(branch)) {
      generateBillUrl = String.Join('/', this.apiConfigService.generateBillNo, branch);
    } else {
      generateBillUrl = String.Join('/', this.apiConfigService.generateBillNo, this.branchFormData.get('branch').value);
    }
    this.commonService.apiCall(generateBillUrl, (data) => {
      this.branchFormData.patchValue({
        invoiceNo: data['BillNo']
      })
    });
  }

  getBillingBranchesList() {
    const getBillingBranchesListUrl = String.Join('/', this.apiConfigService.getBillingBranchesList);
    this.commonService.apiCall(getBillingBranchesListUrl, (data) => {
      this.branchesList = data['BranchesList'];
      console.log(data);
    });
  }










  getMemberNamesList() { 
    const getMemberNamesListUrl = String.Join('/', this.apiConfigService.getMemberNamesList);
    this.commonService.apiCall(getMemberNamesListUrl, (res) => {
      this.memberNamesList = res['PartnerCreationList'];
    });
  }


  // stop
  getFinanceGlAccList() {
    const getFinanceGlAccListUrl = String.Join('/', this.apiConfigService.getFinanceGlAccList);
    this.commonService.apiCall(getFinanceGlAccListUrl, (data) => {
      console.log(data);
    });
  }

  // stop
  getcashAcctobranchAccountsList(branch) {
    const getcashAcctobranchAccountsListUrl = String.Join('/', this.apiConfigService.getcashAcctobranchAccountsList, branch);
    this.commonService.apiCall(getcashAcctobranchAccountsListUrl, (data) => {
      console.log(data);
    });
  }

  getGlaccountsList() {
    const getGlaccountsListUrl = String.Join('/', this.apiConfigService.getGlaccountsList);
    this.commonService.apiCall(getGlaccountsListUrl, (data) => {
      console.log(data);
    });
  }

  getCardTypeList() {
    const getCardTypeListUrl = String.Join('/', this.apiConfigService.getCardTypeList);
    this.commonService.apiCall(getCardTypeListUrl, (data) => {
      console.log(data);
    });
  }

  getEmployesList(branch) {
    const getEmployesListUrl = String.Join('/', this.apiConfigService.getEmployesList, branch);
    this.commonService.apiCall(getEmployesListUrl, (data) => {
      console.log(data);
    });
  }
























  getTableData() {
    const getcashAcctobranchAccountsListUrl = String.Join('/', this.apiConfigService.getBranchesBranchList);
    this.commonService.apiCall(getcashAcctobranchAccountsListUrl, (data) => {
      // this.dataSource = new MatTableDataSource(data['branchesList']);
      // this.dataSource.paginator = this.paginator;
      this.addTableRow();
    });
  }

  getBillingList(branch) {
    const getBillingListUrl = String.Join('/', this.apiConfigService.getBillingList, branch);
    this.commonService.apiCall(getBillingListUrl, (data) => {
      this.dataSource = new MatTableDataSource(data['BillingList']);
      this.dataSource.paginator = this.paginator;
      this.addTableRow();
    });
  }







  getModelList(branch) {
    const getModelListUrl = String.Join('/', this.apiConfigService.getModelList, branch);
    this.commonService.apiCall(getModelListUrl, (data) => {
      console.log(data);
    });
  }






  print() {

  }


  // this.branchFormData.patchValue({
  //   applyDate : this.commonService.formatDate(this.branchFormData.get('applyDate').value),
  //   fromDate : this.commonService.formatDate(this.branchFormData.get('fromDate').value)
  // })

}
