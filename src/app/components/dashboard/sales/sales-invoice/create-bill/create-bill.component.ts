import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../../services/common.service';
import { ApiConfigService } from '../../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../../services/api.service';
import { isNullOrUndefined } from 'util';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SnackBar, StatusCodes } from '../../../../../enums/common/common';
import { AlertService } from '../../../../../services/alert.service';
import { Static } from '../../../../../enums/common/static';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss']
})
export class CreateBillComponent implements OnInit {

  branchFormData: FormGroup;
  GetBranchesListArray = [];
  getCashPartyAccountListArray = [];
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  getmemberNamesArray = [];
  getStateListArray = [];
  getProductByProductCodeArray = [];
  getProductByProductNameArray = [];
  getPupmsArray = [];
  getSalesBranchListArray = [];
  memberNamesList = [];
  branchesList = [];

  displayedColumns: string[] = ['productCode', 'productName', 'hsnNo', 'pumpNo', 'qty', 'fQty',
    'slipNo', 'unitName', 'discount', 'taxGroupName', 'rate', 'grossAmount', 'availStock', 'delete'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  date = new Date((new Date().getTime() - 3888000000));
  modelFormData: FormGroup;
  tableFormData: FormGroup;
  printBill = false;
  tableFormObj = false;
  routeUrl = '';
  taxPercentage: any;
  totalInvoiceAmount: any;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
    this.branchFormData = this.formBuilder.group({
      branchCode: [null],
      branchName: [null],
      invoiceDate: [(new Date()).toISOString()],
      invoiceNo: [null],
      ledgerCode: [null],
      vehicleRegNo: [null],
      stateCode: [null],
      memberName: [null],
      customerGstin: [null],
      paymentMode: [null],
      mobile: [null],
      generalNo: [null],
      amountInWords: [null],
      totalAmount: [null],
      totaltaxAmount: [null],

      invoiceMasterId: [null],
      voucherNo: [null],
      voucherTypeId: [null],
      ledgerId: [null],
      ledgerName: [null],
      vehicleId: [null],
      memberCode: [null],
      customerName: [null],
      suppliedTo: [null],
      accountBalance: [null],
      shiftId: [null],
      userId: [null],
      userName: [null],
      employeeId: [null],
      discount: [0.00],
      grandTotal: [null],
      totalCgst: [null],
      totalSgst: [null],
      totalIgst: [null],
      otherAmount1: [null],
      otherAmount2: [null],
      roundOffPlus: [null],
      roundOffMinus: [null],
      serverDateTime: [null],
      isSalesReturned: [null],
      isManualEntry: [null],
      manualInvoiceNo: [null],
      // printBill: [false]
    });

  }

  ngOnInit() {
    this.GetBranchesList();
    this.getCashPartyAccountList();
    this.getStateList();
    this.addTableRow();
    this.formGroup();
    this.activatedRoute.params.subscribe(params => {
      console.log(params.id1);
      if (!isNullOrUndefined(params.id1)) {
        this.routeUrl = params.id1;
        this.disableForm(params.id1);
        this.getInvoiceDeatilList(params.id1);
        const billHeader = JSON.parse(localStorage.getItem('selectedBill'));
        this.branchFormData.setValue(billHeader);
        console.log(billHeader);
      } else {
        this.disableForm();
        const user = JSON.parse(localStorage.getItem('user'));
        user.branchCode = '5';
        if (!isNullOrUndefined(user.branchCode)) {
          this.branchFormData.patchValue({
            branchCode: user.branchCode
          });
          this.setBranchCode();
          this.genarateBillNo(user.branchCode);
        }
      }
    });
  }

  getInvoiceDeatilList(id) {
    const getInvoiceDeatilListUrl = String.Join('/', this.apiConfigService.getInvoiceDeatilList, id);
    this.apiService.apiGetRequest(getInvoiceDeatilListUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response['InvoiceDetailList']) && res.response['InvoiceDetailList'].length) {
            this.dataSource = new MatTableDataSource(res.response['InvoiceDetailList']);
            this.dataSource.paginator = this.paginator;
            this.spinner.hide();
          }
        }
      });
  }

  disableForm(route?) {
    if (!isNullOrUndefined(route)) {
      this.branchFormData.controls['ledgerCode'].disable();
      this.branchFormData.controls['branchCode'].disable();
      this.branchFormData.controls['invoiceDate'].disable();
      this.branchFormData.controls['vehicleRegNo'].disable();
      this.branchFormData.controls['ledgerName'].disable();
      this.branchFormData.controls['stateCode'].disable();
      this.branchFormData.controls['paymentMode'].disable();
      this.branchFormData.controls['memberName'].disable();
      this.branchFormData.controls['customerGstin'].disable();
      this.branchFormData.controls['generalNo'].disable();
      this.branchFormData.controls['amountInWords'].disable();
      this.branchFormData.controls['suppliedTo'].disable();
    }

    this.branchFormData.controls['invoiceNo'].disable();
    this.branchFormData.controls['accountBalance'].disable();
    this.branchFormData.controls['totalAmount'].disable();
    this.branchFormData.controls['totaltaxAmount'].disable();
  }


  GetBranchesList() {
    const getBranchesListUrl = String.Join('/', this.apiConfigService.getBillingBranchesList);
    this.apiService.apiGetRequest(getBranchesListUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['BranchesList']) && res.response['BranchesList'].length) {
              this.GetBranchesListArray = res.response['BranchesList'];
              this.setBranchCode();
              this.spinner.hide();
            }
          }
        }
      });
  }

  getCashPartyAccountList() {
    const getCashPartyAccountListUrl = String.Join('/', this.apiConfigService.getCashPartyAccountList);
    this.apiService.apiGetRequest(getCashPartyAccountListUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['CashPartyAccountList']) && res.response['CashPartyAccountList'].length) {
              this.getCashPartyAccountListArray = res.response['CashPartyAccountList'];
              this.spinner.hide();
            }
          }
        }
      });
  }

  genarateBillNo(branch?) {
    let generateBillUrl;
    if (!isNullOrUndefined(branch)) {
      generateBillUrl = String.Join('/', this.apiConfigService.generateBillNo, branch);
    } else {
      generateBillUrl = String.Join('/', this.apiConfigService.generateBillNo, this.branchFormData.get('branchCode').value);
    }
    this.apiService.apiGetRequest(generateBillUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['BillNo'])) {
              this.branchFormData.patchValue({
                invoiceNo: res.response['BillNo']
              });
              this.getAccountBalance();
              this.spinner.hide();
            }
          }
        } else if (res.status === StatusCodes.fail) {
          this.branchFormData.patchValue({
            invoiceNo: null
          });
        }
      });
  }

  setBranchCode() {
    const bname = this.GetBranchesListArray.filter(branchCode => {
      if (branchCode.id == this.branchFormData.get('branchCode').value) {
        return branchCode;
      }
    });
    this.branchFormData.patchValue({
      branchName: !isNullOrUndefined(bname[0]) ? bname[0].text : null
    });
    console.log(this.branchFormData);
  }

  setLedgerName() {
    const lname = this.getCashPartyAccountListArray.filter(lCode => {
      if (lCode.id == this.branchFormData.get('ledgerCode').value) {
        return lCode;
      }
    });
    this.branchFormData.patchValue({
      ledgerName: !isNullOrUndefined(lname[0]) ? lname[0].text : null
    });
    console.log(this.branchFormData);
  }

  getAccountBalance() {
    if (!isNullOrUndefined(this.branchFormData.get('branchCode').value) && this.branchFormData.get('branchCode').value != '' &&
      !isNullOrUndefined(this.branchFormData.get('ledgerName').value) && this.branchFormData.get('ledgerName').value != '') {
      const getAccountBalanceUrl = String.Join('/', this.apiConfigService.getAccountBalance,
        this.branchFormData.get('ledgerName').value, this.branchFormData.get('branchCode').value);
      this.apiService.apiGetRequest(getAccountBalanceUrl).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['AccountBalance'])) {
                this.branchFormData.patchValue({
                  accountBalance: res.response['AccountBalance']
                });
                this.spinner.hide();
              }
            }
          }
        });
    }
  }

  getmemberNames(value) {
    if (!isNullOrUndefined(value) && value != '') {
      const getmemberNamesUrl = String.Join('/', this.apiConfigService.getmemberNames, value);
      this.apiService.apiGetRequest(getmemberNamesUrl).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['Members']) && res.response['Members'].length) {
                this.getmemberNamesArray = res.response['Members'];
              } else {
                this.getmemberNamesArray = [];
              }
              this.memberNamesFilter();
            }
          }
        });
    } else {
      this.getmemberNamesArray = [];
      this.memberNamesFilter();
    }
  }

  setMemberName(member) {
    this.branchFormData.patchValue({
      memberName: member.value
    });
  }

  memberNamesFilter() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );
    this.spinner.hide();
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.getmemberNamesArray.filter(option => option.text.toLowerCase().includes(filterValue));
  }

  getCashPartyAccount() {
    const getCashPartyAccountUrl = String.Join('/', this.apiConfigService.getCashPartyAccount,
      this.branchFormData.get('ledgerCode').value);
    this.apiService.apiGetRequest(getCashPartyAccountUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['CashPartyAccount'])) {
              this.branchFormData.patchValue({
                ledgerName: res.response['CashPartyAccount']['ledgerName']
              });
              this.getAccountBalance();
              this.spinner.hide();
            }
          }
        }
      });
  }

  getStateList() {
    const getStateListUrl = String.Join('/', this.apiConfigService.getStateList);
    this.apiService.apiGetRequest(getStateListUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['StateList']) && res.response['StateList'].length) {
              this.getStateListArray = res.response['StateList'];
              this.branchFormData.patchValue({
                stateCode: '37'
              });
              this.getSelectedState();
              this.spinner.hide();
            }
          }
        }
      });
  }

  getSelectedState() {
    const getSelectedStateUrl = String.Join('/', this.apiConfigService.getSelectedState,
      this.branchFormData.get('stateCode').value);
    this.apiService.apiGetRequest(getSelectedStateUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['StateList']) && res.response['StateList'].length) {
              const taxP = res.response['StateList'][0];
              if (taxP.igst == 0) {
                this.taxPercentage = (taxP.cgst + taxP.sgst);
              } else {
                this.taxPercentage = (taxP.igst);
              }
              this.spinner.hide();
            }
          }
        }
      });
  }

  addTableRow() {
    const tableObj = {
      productCode: '', productName: '', hsnNo: '', pumpNo: '', qty: '', fQty: '', slipNo: '', unitName: '',
      discount: 0.00, taxGroupName: '', rate: '', grossAmount: '', availStock: '', delete: '', text: 'obj'
    };
    if (!isNullOrUndefined(this.dataSource)) {
      this.dataSource.data.push(tableObj);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    } else {
      this.dataSource = new MatTableDataSource([tableObj]);
    }
    this.dataSource.paginator = this.paginator;
  }

  formGroup() {
    this.tableFormData = this.formBuilder.group({
      invoiceNo: [null],
      invoiceDate: [null],
      stateCode: [null],
      shiftId: [null],
      userId: [null],
      employeeId: [null],
      productId: [null],
      hsnNo: [null],
      productCode: [null, [Validators.required]],
      productName: [null, [Validators.required]],
      rate: [null],
      productGroupId: [null],
      productGroupCode: [null],
      pumpID: [null],
      pumpNo: [null],
      qty: [null],
      fQty: [null],
      slipNo: [null],
      unitId: [null],
      unitName: [null],
      discount: [0.00],
      taxGroupId: [null],
      taxGroupCode: [null],
      taxGroupName: [null],
      taxStructureId: [null],
      taxStructureCode: [null],
      cgst: [null],
      sgst: [null],
      igst: [null],
      grossAmount: [null],
      totalGST: [null],
      availStock: [null],
    });
  }

  setToFormModel(text, column, value) {
    this.tableFormObj = true;
    if (text == 'obj') {
      this.tableFormData.patchValue({
        [column]: value
      });
    }
    if (this.tableFormData.valid) {
      this.addTableRow();
      this.formGroup();
      this.tableFormObj = false;
    }
  }

  clearQty(index, value, column) {
    this.dataSource.data[index].qty = null;
    this.dataSource.data[index].fQty = null;
    this.dataSource.data[index][column] = value;
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }

  deleteRow(i) {
    this.dataSource.data = this.dataSource.data.filter((value, index, array) => {
      return index !== i;
    });
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);
  }

  getProductByProductCode(value) {
    if (!isNullOrUndefined(value) && value != '') {
      const getProductByProductCodeUrl = String.Join('/', this.apiConfigService.getProductByProductCode, value);
      this.apiService.apiGetRequest(getProductByProductCodeUrl).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['Products'])) {
                this.getProductByProductCodeArray = res.response['Products'];
                this.spinner.hide();
              }
            }
          }
        });
    } else {
      this.getProductByProductCodeArray = [];
    }
  }

  calculateAmount(row, index) {
    if (!isNullOrUndefined(row.qty) && (row.qty != '')) {
      this.dataSource.data[index].grossAmount = row.qty * row.rate;
    } else if (!isNullOrUndefined(row.fQty) && (row.fQty != '')) {
      this.dataSource.data[index].grossAmount = row.fQty * row.rate;
    }
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    let amount = 0;
    for (let a = 0; a < this.dataSource.data.length; a++) {
      if (this.dataSource.data[a].grossAmount) {
        amount = amount + this.dataSource.data[a].grossAmount;
      }
    }

    const amountTax = (amount * 100) / (this.taxPercentage + 100);
    if (!isNullOrUndefined(amountTax) && !isNullOrUndefined(amount)) {
      this.totalInvoiceAmount = amount + amountTax;
    }
    this.branchFormData.patchValue({
      totalAmount: !isNullOrUndefined(amount) ? amount : null,
      totaltaxAmount: !isNullOrUndefined(amountTax) ? amountTax : null
    });

  }

  getBillingDetailsRcd(productCode) {
    if (!isNullOrUndefined(this.branchFormData.get('branchCode').value) && this.branchFormData.get('branchCode').value != '' &&
      !isNullOrUndefined(productCode.value) && productCode.value != '') {
      const getBillingDetailsRcdUrl = String.Join('/', this.apiConfigService.getBillingDetailsRcd, productCode.value,
        this.branchFormData.get('branchCode').value);
      this.apiService.apiGetRequest(getBillingDetailsRcdUrl).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['BillingDetailsSection'])) {
                this.billingDetailsSection(res.response['BillingDetailsSection']);
                this.spinner.hide();
              }
            }
          }
        });
    }
  }

  billingDetailsSection(obj) {
    this.dataSource.data = this.dataSource.data.map(val => {
      if (val.productCode == obj.productCode) {
        this.tableFormData.patchValue({
          productCode: obj.productCode,
          productName: obj.productName
        });
        val = obj;
      }
      val.text = 'obj';
      return val;
    });
    this.setToFormModel(null, null, null);
  }

  getProductByProductName(value) {
    if (!isNullOrUndefined(value) && value != '') {
      const getProductByProductNameUrl = String.Join('/', this.apiConfigService.getProductByProductName, value);
      this.apiService.apiGetRequest(getProductByProductNameUrl).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['Products'])) {
                this.getProductByProductNameArray = res.response['Products'];
                this.spinner.hide();
              }
            }
          }
        });
    } else {
      this.getProductByProductNameArray = [];
    }
  }

  getPupms(pump) {
    const pNumber = +pump;
    if (!isNaN(pNumber)) {
      if (!isNullOrUndefined(this.branchFormData.get('branchCode').value) && this.branchFormData.get('branchCode').value != '' &&
      !isNullOrUndefined(pump) && pump != '') {
      const getPupmsUrl = String.Join('/', this.apiConfigService.getPupms, pump,
        this.branchFormData.get('branchCode').value);
      this.apiService.apiGetRequest(getPupmsUrl).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['PumpsList'])) {
                this.getPupmsArray = res.response['Products'];
                this.spinner.hide();
              }
            }
          }
        });
    } else {
      this.getPupmsArray = [];
    }
    } else {
      this.alertService.openSnackBar('Only Number', Static.Close, SnackBar.error);
    }
  }

  setProductName(name) {
    this.tableFormData.patchValue({
      productName: name.value
    });
    this.setToFormModel(null, null, null);
  }

  save() {
    if (!this.tableFormObj) {
      this.dataSource.data.pop();
    }
    console.log(this.branchFormData, this.dataSource.data, this.printBill, this.totalInvoiceAmount);

    this.registerInvoice();
  }

  reset() {
    console.log(this.branchFormData);
    this.branchFormData.reset();
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }

  registerInvoice() {
    const registerInvoiceUrl = String.Join('/', this.apiConfigService.registerInvoice);
    const requestObj = { InvoiceHdr: this.branchFormData.value, InvoiceDetail: this.dataSource.data };
    this.apiService.apiPostRequest(registerInvoiceUrl, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.alertService.openSnackBar(Static.LoginSussfull, Static.Close, SnackBar.success);
          }
        }
      });
  }

}
