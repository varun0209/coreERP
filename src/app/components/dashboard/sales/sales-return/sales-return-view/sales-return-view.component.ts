import { Component, OnInit, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../../services/common.service';
import { ApiConfigService } from '../../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../../services/api.service';
import { isNullOrUndefined } from 'util';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SnackBar, StatusCodes } from '../../../../../enums/common/common';
import { AlertService } from '../../../../../services/alert.service';
import { Static } from '../../../../../enums/common/static';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrintComponent } from '../../../../../reuse-components/print/print.component';
var curValue = require("multilingual-number-to-words");
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../../directives/format-datepicker';
@Component({
  selector: 'app-sales-return-view',
  templateUrl: './sales-return-view.component.html',
  styleUrls: ['./sales-return-view.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class SalesReturnViewComponent implements OnInit {

  branchFormData: FormGroup;
  GetBranchesListArray = [];
  getCashPartyAccountListArray = [];
  myControl = new FormControl();
  getmemberNamesArray = [];
  getStateListArray = [];
  getProductByProductCodeArray = [];
  getProductByProductNameArray = [];
  getVechielsArray = [];
  getPupmsArray = [];
  getSalesBranchListArray = [];
  memberNamesList = [];
  branchesList = [];
  disableSlipList = [];
  disablePump: any
  displayedColumns: string[] = ['SlNo', 'productCode', 'productName', 'hsnNo', 'pumpNo', 'qty', 'fQty',
    'slipNo', 'unitName', 'discount', 'taxGroupName', 'rate', 'grossAmount', 'availStock', 'delete'
  ];
  dataSource: MatTableDataSource<any>;

  date = new Date((new Date().getTime() - 3888000000));
  modelFormData: FormGroup;
  tableFormData: FormGroup;
  printBill = false;
  routeUrl = '';
  taxPercentage: any;
  isSalesReturnInvoice: any;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {

    this.formDataGroup();
  }

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

  formDataGroup() {
    this.branchFormData = this.formBuilder.group({
      branchCode: [null],
      branchName: [null],
      invoiceDate: [(new Date()).toISOString()],
      invoiceNo: [null],
      invoiceMasterReturnId: [null],
      invoiceReturnNo: [null],
      invoiceReturnDate: [null],
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
      // isSalesReturned: [null],
      isManualEntry: [null],
      manualInvoiceNo: [null],
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.GetBranchesList();
    this.getStateList();
    this.getSlipDate();
    this.getperchaseData();
    this.activatedRoute.params.subscribe(params => {
      if (!isNullOrUndefined(params.id1)) {
        this.routeUrl = params.id1;
        this.disableForm(params.id1);
        const billHeader = JSON.parse(localStorage.getItem('selectedRetunBill'));
        this.branchFormData.setValue(billHeader);
        this.getInvoiceDeatilList(billHeader.invoiceMasterReturnId);
      } else {
        this.disableForm();
        this.addTableRow();
        this.getCashPartyAccountList("100");
        const user = JSON.parse(localStorage.getItem('user'));
        if (!isNullOrUndefined(user.branchCode)) {
          this.branchFormData.patchValue({
            branchCode: user.branchCode,
            userId: user.seqId,
            userName: user.userName
          });
          this.branchFormData.patchValue({
            ledgerCode: "100"
          });
          this.setBranchCode();
          this.genarateBillNo(user.branchCode);
          this.formGroup();
        }
      }
    });
  }

  getperchaseData() {
    const getSlipListUrl = String.Join('/', '../../../../../../assets/settings/perchase.json');
    this.apiService.apiGetRequest(getSlipListUrl).subscribe(
      response => {
        this.disablePump = response.body;
        this.spinner.hide();
      });
  }

  disabledPump(code) {
    if (!isNullOrUndefined(this.disablePump)) {
      for (let p = 0; p < this.disablePump.length; p++) {
        if (this.disablePump[p] == code) {
          return false;
        }
      }
      return true;
    }
    return true;
  }

  generateSalesReturnInvNo(branchCode, invoice) {
    const generateSalesReturnInvNoUrl = String.Join('/', this.apiConfigService.generateSalesReturnInvNo, branchCode);
    this.apiService.apiGetRequest(generateSalesReturnInvNoUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['SalesReturnInvNo'])) {
              this.isSalesReturnInvoice = res.response['SalesReturnInvNo'];
              this.spinner.hide();
            }
          }
        }
      });
  }

  getInvoiceDeatilList(id) {
    const getInvoiceDeatilListUrl = String.Join('/', this.apiConfigService.getInvoiceReturnDetail, id);
    this.apiService.apiGetRequest(getInvoiceDeatilListUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response['InvoiceReturnDtlsList']) && res.response['InvoiceReturnDtlsList'].length) {
            this.dataSource = new MatTableDataSource(res.response['InvoiceReturnDtlsList']);
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
      this.branchFormData.controls['stateCode'].disable();
      this.branchFormData.controls['paymentMode'].disable();
      this.branchFormData.controls['memberName'].disable();
      this.branchFormData.controls['customerGstin'].disable();
      this.branchFormData.controls['generalNo'].disable();
      this.branchFormData.controls['suppliedTo'].disable();
      this.branchFormData.controls['customerName'].disable();
      this.branchFormData.controls['mobile'].disable();
    }

    this.branchFormData.controls['invoiceNo'].disable();
    this.branchFormData.controls['accountBalance'].disable();
    this.branchFormData.controls['totalAmount'].disable();
    this.branchFormData.controls['ledgerName'].disable();
    this.branchFormData.controls['grandTotal'].disable();
    this.branchFormData.controls['totaltaxAmount'].disable();
    this.branchFormData.controls['paymentMode'].disable();
    this.branchFormData.controls['totalCgst'].disable();
    this.branchFormData.controls['totalSgst'].disable();
    this.branchFormData.controls['totalIgst'].disable();
    this.branchFormData.controls['amountInWords'].disable();
    this.branchFormData.controls['userName'].disable();

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
              this.spinner.hide();
            }
          }
        }
      });
  }


  genarateBillNo(branch?) {
    let flag = false;
    const branchList = JSON.parse(localStorage.getItem('branchList'));
    for (let b = 0; b < branchList.length; b++) {
      if (this.branchFormData.get('branchCode').value == branchList[b]) {
        flag = true;
      }
    }
    if (!flag) {
      this.alertService.openSnackBar(`You are not eligible to use this Branch(${this.branchFormData.get('branchCode').value}) code`, Static.Close, SnackBar.error);
      this.branchFormData.patchValue({
        branchCode: null,
        branchName: null,
        invoiceNo: null
      });
    } else {
      this.setBranchCode();
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
                // this.getAccountBalance();
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
  }

  setBranchCode() {
    const bname = this.GetBranchesListArray.filter(branchCode => {
      if (branchCode.id == this.branchFormData.get('branchCode').value) {
        return branchCode;
      }
    });
    if (bname.length) {
      this.branchFormData.patchValue({
        branchName: !isNullOrUndefined(bname[0]) ? bname[0].text : null
      });
    }
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
    this.getCashPartyAccount();
  }

  getAccountBalance() {
    if (!isNullOrUndefined(this.branchFormData.get('ledgerCode').value) && this.branchFormData.get('ledgerCode').value != '') {
      const getAccountBalanceUrl = String.Join('/', this.apiConfigService.getAccountBalance,
        this.branchFormData.get('ledgerCode').value);
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
            }
          }
          this.spinner.hide();
        });
    } else {
      this.getmemberNamesArray = [];
    }
  }


  getVechiels(value) {
    if (!isNullOrUndefined(value) && value != '') {
      const getVechielsUrl = String.Join('/', this.apiConfigService.getVechiels, value, this.branchFormData.get('memberCode').value);
      this.apiService.apiGetRequest(getVechielsUrl).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['Members']) && res.response['Members'].length) {
                this.getVechielsArray = res.response['Members'];
              } else {
                this.getVechielsArray = [];
              }
            }
            this.spinner.hide();
          }
        });
    } else {
      this.getVechielsArray = [];
    }
  }

  getCashPartyAccountList(value) {
    if (!isNullOrUndefined(value) && value != '') {
      const getCashPartyAccountListUrl = String.Join('/', this.apiConfigService.getCashPartyAccountList, value);
      this.apiService.apiGetRequest(getCashPartyAccountListUrl).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['CashPartyAccountList']) && res.response['CashPartyAccountList'].length) {
                this.getCashPartyAccountListArray = res.response['CashPartyAccountList'];
                this.getCashPartyAccount();
              } else {
                this.getCashPartyAccountListArray = [];
              }
            }
            this.spinner.hide();
          }
        });
    } else {
      this.getCashPartyAccountListArray = [];
    }
  }

  setMemberName(member) {
    this.branchFormData.patchValue({
      memberCode: member.item.id,
      mobile: member.item.phoneNo
    });
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
                ledgerName: res.response['CashPartyAccount']['ledgerName'],
                paymentMode: res.response['CashPartyAccount']['crOrDr'],
                ledgerId: res.response['CashPartyAccount']['ledgerId']
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

  getSlipDate() {
    const getSlipListUrl = String.Join('/', '../../../../../../assets/settings/bill.json');
    this.apiService.apiGetRequest(getSlipListUrl).subscribe(
      response => {
        this.disableSlipList = response.body;
        this.spinner.hide();
      });
  }

  disableSlipVal(column) {
    let flag = true;
    for (let s = 0; s < this.disableSlipList.length; s++) {
      if (this.disableSlipList[s] == column) {
        flag = false;
        return false;
      }
    }
    if (flag) {
      return true;
    }
  }

  // disableSlipValData(column) {
  //   if (this.disableSlipVal(column.productCode)) {
  //     return true;
  //   } else if (isNullOrUndefined(column.slipNo)) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

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
              this.branchFormData.patchValue({
                stateCode: taxP.stateCode
              });
              if (taxP.igst == 0) {
                this.taxPercentage = true;
              } else {
                this.taxPercentage = false;
              }
              this.spinner.hide();
            }
          }
        }
      });
  }

  setBackGroundColor(value, disabled) {
    if (disabled) {
      return '';
    } else if (value == 0) {
      return '';
    } else if (value == '' || isNullOrUndefined(value)) {
      return 'flashLight';
    } else {
      return '';
    }
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
    if (text == 'obj') {
      this.tableFormData.patchValue({
        [column]: value
      });
    }
    if (this.tableFormData.valid) {
      if (this.dataSource.data.length < 6) {
        this.addTableRow();
        this.formGroup();
      }
    }
  }

  clearQty(index, value, column, row) {
    this.dataSource.data[index].qty = null;
    this.dataSource.data[index].fQty = null;
    if (row.availStock < value) {
      this.alertService.openSnackBar(`This Product(${row.productCode}) qty or Fqty cannot be greater than available stock`, Static.Close, SnackBar.error);
      return;
    }
    this.dataSource.data[index][column] = value;
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  deleteRow(i) {
    if (this.dataSource.data.length == 1) {
      return;
    }
    this.dataSource.data = this.dataSource.data.filter((value, index, array) => {
      return index !== i;
    });
    this.dataSource = new MatTableDataSource(this.dataSource.data);
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

  getmemberNamesByCode(event) {
    console.log(event);
    const getmemberNamesByCodeUrl = String.Join('/', this.apiConfigService.getmemberNamesByCode, event.item.memberCode);
    this.apiService.apiGetRequest(getmemberNamesByCodeUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['Members'])) {
              this.branchFormData.patchValue({
                memberCode: res.response['Members']['memberCode'],
                memberName: res.response['Members']['memberName'],
                mobile: res.response['Members']['phoneNo'],
                generalNo: res.response['Members']['generalNo'],
                vehicleId: event.item.id
              });
              this.getAccountBalance();
              this.spinner.hide();
            }
          }
        }
      });
  }

  calculateAmount(row, index) {
    if (!isNullOrUndefined(row.qty) && (row.qty != '')) {
      this.dataSource.data[index].grossAmount = (row.qty * row.rate).toFixed(2);
    } else if (!isNullOrUndefined(row.fQty) && (row.fQty != '')) {
      this.dataSource.data[index].grossAmount = (0 * row.rate).toFixed(2);
    }
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    let totaltaxAmount = 0;
    let totalAmount = 0;
    for (let a = 0; a < this.dataSource.data.length; a++) {
      if (this.dataSource.data[a].grossAmount) {
        let tax = (this.taxPercentage) ? (this.dataSource.data[a].cgst + this.dataSource.data[a].sgst) : this.dataSource.data[a].igst;
        let amountTax = (+this.dataSource.data[a].grossAmount * 100) / (tax + 100);
        let totalTax = (+this.dataSource.data[a].grossAmount - amountTax);
        totalAmount = totalAmount + amountTax;
        totaltaxAmount = totaltaxAmount + totalTax;
      }
    }
    this.branchFormData.patchValue({
      totalAmount: !isNullOrUndefined(totalAmount) ? totalAmount.toFixed(2) : null,
      totaltaxAmount: !isNullOrUndefined(totaltaxAmount) ? totaltaxAmount.toFixed(2) : null,
    });
    this.branchFormData.patchValue({
      grandTotal: (totalAmount + totaltaxAmount).toFixed(2),
      totalCgst: (this.taxPercentage) ? (totaltaxAmount / 2).toFixed(2) : 0,
      totalSgst: (this.taxPercentage) ? (totaltaxAmount / 2).toFixed(2) : 0,
      totalIgst: (!this.taxPercentage) ? (totaltaxAmount).toFixed(2) : 0,
    });
    this.branchFormData.patchValue({
      amountInWords: curValue.lakhWord(this.branchFormData.get('grandTotal').value)[0],
    });
  }

  getBillingDetailsRcd(productCode, index) {
    // if (this.checkProductCode(productCode, index)) {
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
                  this.billingDetailsSection(res.response['BillingDetailsSection'], index);
                  this.getProductByProductCodeArray = [];
                  this.spinner.hide();
                }
              }
            }
          });
      }
    // } else {
    //   this.dataSource.data[index].productCode = null;
    //   this.dataSource = new MatTableDataSource(this.dataSource.data);
    //   this.alertService.openSnackBar(`Product Code( ${productCode.value} ) Allready Selected`, Static.Close, SnackBar.error);
    // }
  }

  // checkProductCode(code, index) {
  //   if (!isNullOrUndefined(code.value)) {
  //     for (let c = 0; c < this.dataSource.data.length; c++) {
  //       if ((this.dataSource.data[c].productCode == code.value) && c != index) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   }
  // }

  billingDetailsSection(obj, index) {
    if (isNullOrUndefined(obj.availStock) || (obj.availStock == 0)) {
      this.alertService.openSnackBar(`This Product(${obj.productCode}) available stock is 0`, Static.Close, SnackBar.error);
    }
    obj.text = 'obj';
    this.dataSource.data[index] = obj;
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.tableFormData.patchValue({
      productCode: obj.productCode,
      productName: obj.productName
    });
    // this.dataSource.data = this.dataSource.data.map(val => {
    //   if (val.productCode == obj.productCode) {
    //     this.tableFormData.patchValue({
    //       productCode: obj.productCode,
    //       productName: obj.productName
    //     });
    //     val = obj;
    //   }
    //   val.text = 'obj';
    //   return val;
    // });
    // if (this.disableSlipValData(obj)) {
      this.setToFormModel(null, null, null);
    // }
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
                  this.getPupmsArray = res.response['PumpsList'];
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

  setProductName(name, column) {
    this.tableFormData.patchValue({
      productName: name.value
    });
    // if (this.disableSlipValData(column)) {
      this.setToFormModel(null, null, null);
    // }
  }

  print() {
    this.enableFileds();
    const requestObj = { InvoiceHdr: this.branchFormData.value, InvoiceDetail: this.dataSource.data };
    if (this.printBill) {
      this.dialog.open(PrintComponent, {
        width: '1024px',
        data: requestObj,
        disableClose: true
      });
    }
  }

  save() {
    if (this.routeUrl != '' || this.dataSource.data.length == 0) {
      return;
    }
    let tableData = [];
    for (let d = 0; d < this.dataSource.data.length; d++) {
      if (this.dataSource.data[d]['productCode'] != '') {
        tableData.push(this.dataSource.data[d]);
      }
    }
    let content = '';
    let availStock = tableData.filter(stock => {
      if (stock.availStock == 0) {
        content = '0 Availablilty Stock';
        return stock;
      }
      if (isNullOrUndefined(stock.qty) && isNullOrUndefined(stock.fQty)) {
        content = 'qty or Fqty is null';
        return stock;
      }
      if ((stock.qty > stock.availStock) || (stock.fQty > stock.availStock)) {
        content = 'qty or Fqty cannot be greater than available stock';
        return stock;
      }
    });
    if (availStock.length) {
      this.alertService.openSnackBar(`This Product(${availStock[0].productCode}) ${content}`, Static.Close, SnackBar.error);
      return;
    }
    this.enableFileds();
    this.registerInvoice(tableData);
  }

  enableFileds() {
    this.branchFormData.controls['invoiceNo'].enable();
    this.branchFormData.controls['accountBalance'].enable();
    this.branchFormData.controls['totalAmount'].enable();
    this.branchFormData.controls['ledgerName'].enable();
    this.branchFormData.controls['grandTotal'].enable();
    this.branchFormData.controls['totaltaxAmount'].enable();
    this.branchFormData.controls['paymentMode'].enable();
    this.branchFormData.controls['totalCgst'].enable();
    this.branchFormData.controls['totalSgst'].enable();
    this.branchFormData.controls['totalIgst'].enable();
    this.branchFormData.controls['amountInWords'].enable();
    this.branchFormData.controls['userName'].enable();
  }

  reset() {
    this.branchFormData.reset();
    this.dataSource = new MatTableDataSource();
    this.formDataGroup();
    this.loadData();
  }

  registerInvoice(data) {
    this.branchFormData.patchValue({
      paymentMode: 0,
      invoiceDate:this.commonService.formatDate(this.branchFormData.get('invoiceDate').value)
    });
    const registerInvoiceUrl = String.Join('/', this.apiConfigService.registerInvoice);
    const requestObj = { InvoiceHdr: this.branchFormData.value, InvoiceDetail: data };
    this.apiService.apiPostRequest(registerInvoiceUrl, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Billing Successfully..', Static.Close, SnackBar.success);
            if (this.printBill) {
              this.dialog.open(PrintComponent, {
                width: '1024px',
                data: requestObj,
                disableClose: true
              });
            }
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }

  registerInvoiceReturn() {
    const registerInvoiceReturnUrl = String.Join('/', this.apiConfigService.registerInvoiceReturn, this.isSalesReturnInvoice, this.branchFormData.get('invoiceMasterId').value);
    this.apiService.apiGetRequest(registerInvoiceReturnUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Billing Return Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }

}
