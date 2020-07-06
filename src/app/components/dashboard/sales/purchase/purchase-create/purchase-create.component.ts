import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../../services/common.service';
import { ApiConfigService } from '../../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../../services/api.service';
import { isNullOrUndefined } from 'util';
import { MatTableDataSource } from '@angular/material';
import { SnackBar, StatusCodes } from '../../../../../enums/common/common';
import { AlertService } from '../../../../../services/alert.service';
import { Static } from '../../../../../enums/common/static';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
var curValue = require("multilingual-number-to-words");
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../../directives/format-datepicker';
@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class PurchaseCreateComponent implements OnInit {
  setFocus: any;
  branchFormData: FormGroup;
  GetBranchesListArray = [];
  getCashPartyAccountListArray = [];
  myControl = new FormControl();
  getStateListArray = [];
  getProductByProductCodeArray = [];
  getProductByProductNameArray = [];
  getPupmsArray = [];
  getSalesBranchListArray = [];
  memberNamesList = [];
  branchesList = [];
  itemsLength = [];
  calculateLiters: any;
  displayedColumns: string[] = ['SlNo', 'productCode', 'productName', 'hsnNo', 'unitName', 'qty',
    'fQty', 'totalLiters', 'tankNo', 'rate', 'discount', 'grossAmount', 'delete'
  ];
  dataSource: MatTableDataSource<any>;

  date = new Date((new Date().getTime() - 3888000000));
  modelFormData: FormGroup;
  tableFormData: FormGroup;
  printBill = false;
  routeUrl = '';
  taxPercentage: any;
  // tableLength = 6;
  isPurchaseReturnInvoice: any;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {

    this.formDataGroup();
  }

  formDataGroup() {
    this.branchFormData = this.formBuilder.group({
      purchaseInvId: [null],
      branchCode: [null],
      branchName: [null],
      voucherNo: [null],
      voucherTypeId: [null],
      purchaseInvNo: [null],
      supplierInvNo: [null],
      purchaseInvDate: [(new Date()).toISOString()],
      serverDateTime: [null],
      ledgerId: [null],
      ledgerName: [null],
      ledgerCode: [null],
      paymentMode: [null],
      stateCode: [null],
      stateName: [null],
      gstin: [null],
      shiftId: [null],
      userId: [null],
      userName: [null],
      employeeId: [null],
      discount: [null],
      grandTotal: [null],
      totalCgst: [null],
      totalSgst: [null],
      totalIgst: [null],
      totaltaxAmount: [null],
      otherAmount1: [null],
      otherAmount2: [null],
      roundOffPlus: [null],
      roundOffMinus: [null],
      totalAmount: [null],
      amountInWords: [null],
      narration: [null],
      isPurchaseReturned: [null]
    });
  }

  ngOnInit() {
    this.loadData();
    this.getperchaseData();
    // this.getperchaseBranchData();
  }

  getperchaseBranchData() {
    const getSlipListUrl = String.Join('/', '../../../../../../assets/settings/perchase-branch.json');
    this.apiService.apiGetRequest(getSlipListUrl).subscribe(
      response => {
        this.itemsLength = response.body;
        this.spinner.hide();
      });
  }

  getperchaseData() {
    const getSlipListUrl = String.Join('/', '../../../../../../assets/settings/perchase.json');
    this.apiService.apiGetRequest(getSlipListUrl).subscribe(
      response => {
        this.calculateLiters = response.body;
        this.spinner.hide();
      });
  }

  loadData() {
    this.GetBranchesList();
    this.getCashPartyAccountList('100');
    this.getStateList();
    this.activatedRoute.params.subscribe(params => {
      if (!isNullOrUndefined(params.id1)) {
        this.routeUrl = params.id1;
        this.disableForm(params.id1);
        this.getPurchaseInvoiceDeatilList(params.id2);
        const billHeader = JSON.parse(localStorage.getItem('purchase'));
        this.branchFormData.setValue(billHeader);
        if (this.routeUrl == 'return') {
          const user = JSON.parse(localStorage.getItem('user'));
          this.getPurchasePurchaseReturnInvNo(user.branchCode);
        }
      } else {
        this.disableForm();
        this.addTableRow();
        const user = JSON.parse(localStorage.getItem('user'));
        if (!isNullOrUndefined(user.branchCode)) {
          this.branchFormData.patchValue({
            branchCode: user.branchCode,
            userId: user.seqId,
            userName: user.userName,
            ledgerCode: "100"
          });
          this.getCashPartyAccount();
          this.setBranchCode();
          this.genarateBillNo(user.branchCode);
          this.formGroup();
        }
      }
    });
  }


  getPurchaseInvoiceDeatilList(id) {
    const getPurchaseInvoiceDeatilListUrl = String.Join('/', this.apiConfigService.getPurchaseInvoiceDeatilList, id);
    this.apiService.apiGetRequest(getPurchaseInvoiceDeatilListUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response['InvoiceDetailList']) && res.response['InvoiceDetailList'].length) {
            this.dataSource = new MatTableDataSource(res.response['InvoiceDetailList']);
            this.spinner.hide();
          }
        }
      });
  }

  disableForm(route?) {
    if (!isNullOrUndefined(route)) {
      this.branchFormData.controls['branchCode'].disable();
      this.branchFormData.controls['purchaseInvDate'].disable();
      this.branchFormData.controls['ledgerCode'].disable();
      this.branchFormData.controls['purchaseInvDate'].disable();
      this.branchFormData.controls['stateCode'].disable();
      this.branchFormData.controls['supplierInvNo'].disable();
      this.branchFormData.controls['gstin'].disable();
      this.branchFormData.controls['narration'].disable();
      this.branchFormData.controls['roundOffPlus'].disable();
      this.branchFormData.controls['roundOffMinus'].disable();
    }
    this.branchFormData.controls['paymentMode'].disable();
    this.branchFormData.controls['purchaseInvNo'].disable();
    this.branchFormData.controls['totalAmount'].disable();
    this.branchFormData.controls['totaltaxAmount'].disable();
    this.branchFormData.controls['grandTotal'].disable();
    this.branchFormData.controls['totalCgst'].disable();
    this.branchFormData.controls['totalSgst'].disable();
    this.branchFormData.controls['totalIgst'].disable();
    this.branchFormData.controls['amountInWords'].disable();
    this.branchFormData.controls['userName'].disable();
    this.branchFormData.controls['ledgerName'].disable();
  }

  getPurchasePurchaseReturnInvNo(branch) {
    const generateBillUrl = String.Join('/', this.apiConfigService.getPurchasePurchaseReturnInvNo, branch)
    this.apiService.apiGetRequest(generateBillUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['PurchaseInvoiceNo'])) {
              this.isPurchaseReturnInvoice = res.response['PurchaseInvoiceNo'];
              this.spinner.hide();
            }
          }
        } else if (res.status === StatusCodes.fail) {
          this.branchFormData.patchValue({
            purchaseInvNo: null
          });
        }
      });
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

  // setBranchLenght() {
  //   let flag = true;
  //   for (let b = 0; b < this.itemsLength.length; b++) {
  //     if (this.branchFormData.get('branchCode').value == this.itemsLength[b]) {
  //       this.tableLength = 3;
  //       flag = false;
  //       break;
  //     }
  //   }
  //   if (flag) {
  //     this.tableLength = 6;
  //   }
  // }

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
        purchaseInvNo: null
      });
    } else {
      this.setBranchCode();
      // this.setBranchLenght();
      let generateBillUrl;
      if (!isNullOrUndefined(branch)) {
        generateBillUrl = String.Join('/', this.apiConfigService.generatePurchaseInvNo, branch);
      } else {
        generateBillUrl = String.Join('/', this.apiConfigService.generatePurchaseInvNo, this.branchFormData.get('branchCode').value);
      }
      this.apiService.apiGetRequest(generateBillUrl).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['PurchaseInvoiceNo'])) {
                this.branchFormData.patchValue({
                  purchaseInvNo: res.response['PurchaseInvoiceNo']
                });
                this.spinner.hide();
              }
            }
          } else if (res.status === StatusCodes.fail) {
            this.branchFormData.patchValue({
              purchaseInvNo: null
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
    this.commonService.setFocus('productCode0');
  }


  setBackGroundColor(value, prop) {
    if (!isNullOrUndefined(this.calculateLiters)) {
      if (isNullOrUndefined(value) && this.calculateLiters.length) {
        let flag = true;
        for (let s = 0; s < this.calculateLiters.length; s++) {
          if (this.calculateLiters[s] == prop) {
            flag = false;
          }
        }
        if (flag) {
          return '';
        } else {
          return 'flashLight';
        }
      } else {
        return '';
      }
    }
  }

  getTankas(no, index) {
    if (!isNullOrUndefined(no)) {
      const getTankasUrl = String.Join('/', this.apiConfigService.getTankas, no, this.branchFormData.get('branchCode').value);
      this.apiService.apiGetRequest(getTankasUrl).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['TankList']) && res.response['TankList'].length) {
                this.dataSource.data[index].TankId = res.response['TankList'][0].id;
                this.dataSource.data[index].TankNo = res.response['TankList'][0].text;
                this.dataSource = new MatTableDataSource(this.dataSource.data);
              } else {
                // this.dataSource.data[index].TankId = null;
                this.dataSource.data[index].TankNo = null;
                this.dataSource = new MatTableDataSource(this.dataSource.data);
              }
            }
          }
          this.spinner.hide();
        });
    } else {
      this.dataSource.data[index].TankId = null;
      this.dataSource.data[index].TankNo = null;
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    }
  }

  getCashPartyAccount() {
    const getCashPartyAccountUrl = String.Join('/', this.apiConfigService.getPurchaseCashPartyAccount,
      this.branchFormData.get('ledgerCode').value);
    this.apiService.apiGetRequest(getCashPartyAccountUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['CashPartyAccount'])) {
              this.branchFormData.patchValue({
                ledgerName: res.response['CashPartyAccount']['ledgerName'],
                ledgerId: res.response['CashPartyAccount']['ledgerId'],
                paymentMode: res.response['CashPartyAccount']['crOrDr'],
                gstin: res.response['CashPartyAccount']['tin']
              });
              this.spinner.hide();
            }
          }
        }
      });
  }

  getStateList() {
    const getStateListUrl = String.Join('/', this.apiConfigService.getPurchaseStateList);
    this.apiService.apiGetRequest(getStateListUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['StateList']) && res.response['StateList'].length) {
              this.getStateListArray = res.response['StateList'];
              this.branchFormData.patchValue({
                stateCode: '37',
                stateName: 'ANDHRA PRADESH'
              });
              this.getSelectedState();
            }
          }
        }
        this.spinner.hide();
      });
  }

  getSelectedState() {
    const getSelectedStateUrl = String.Join('/', this.apiConfigService.getPurchaseSelectedState,
      this.branchFormData.get('stateCode').value);
    this.apiService.apiGetRequest(getSelectedStateUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['StateList']) && res.response['StateList'].length) {
              const taxP = res.response['StateList'][0];
              this.branchFormData.patchValue({
                stateCode: taxP.stateCode,
                stateName: taxP.stateName
              });
              if (taxP.igst == 0) {
                this.taxPercentage = true;
              } else {
                this.taxPercentage = false;
              }
            }
          }
        }
        this.spinner.hide();
      });
  }


  addTableRow() {
    const tableObj = {
      productCode: '', productName: '', hsnNo: '', unitName: '', qty: '', fQty: '', totalLiters: '', tankNo: null,
      rate: '', discount: 0.00, grossAmount: '', delete: '', text: 'obj'
    };
    if (!isNullOrUndefined(this.dataSource)) {
      this.dataSource.data.push(tableObj);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    } else {
      this.dataSource = new MatTableDataSource([tableObj]);
    }
    this.commonService.setFocus(this.setFocus);
  }

  formGroup() {
    this.tableFormData = this.formBuilder.group({
      purchaseInvDetailId: [null],
      purchaseInvId: [null],
      voucherNo: [null],
      purchaseNo: [null],
      purchaseDate: [null],
      stateCode: [null],
      serverDateTime: [null],
      shiftId: [null],
      userId: [null],
      employeeId: [null],
      productId: [null],
      productCode: [null, [Validators.required]],
      productName: [null, [Validators.required]],
      hsnNo: [null],
      unitId: [null],
      unitName: [null],
      qty: [null],
      fQty: [null],
      barrel: [null],
      batchNo: [null],
      tankId: [null],
      tankNo: [null],
      totalLiters: [null],
      rate: [null],
      discount: [null],
      grossAmount: [null],
      taxGroupId: [null],
      taxGroupCode: [null],
      taxStructureId: [null],
      taxStructureCode: [null],
      cgst: [null],
      sgst: [null],
      igst: [null],
      totalGst: [null],
      totalAmount: [null],
    });
  }

  setToFormModel(text, column, value) {
    if (text == 'obj') {
      this.tableFormData.patchValue({
        [column]: value
      });
    }
    if (this.tableFormData.valid) {
      // if (this.dataSource.data.length) {
      if (this.dataSource.data[this.dataSource.data.length - 1].productCode != '') {
        this.addTableRow();
      }
      this.formGroup();
      // }
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

  setLiters(index, value, column, row) {
    for (let l = 0; l < this.calculateLiters.length; l++) {
      if (this.calculateLiters[l] == column) {
        this.dataSource.data[index]['totalLiters'] = value * 1000;
      }
    }
  }

  deleteRow(i) {
    if (this.dataSource.data.length == 1) {
      return;
    }
    this.dataSource.data = this.dataSource.data.filter((value, index, array) => {
      return index !== i;
    });
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.calculateAmount();
  }

  getProductByProductCode(value) {
    if (!isNullOrUndefined(value) && value != '') {
      const getProductByProductCodeUrl = String.Join('/', this.apiConfigService.getProductByProductCode);
      this.apiService.apiPostRequest(getProductByProductCodeUrl, { productCode: value }).subscribe(
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
  
  calculateLiter(code) {
    if (!isNullOrUndefined(this.calculateLiters)) {
      for (let p = 0; p < this.calculateLiters.length; p++) {
        if (this.calculateLiters[p] == code) {
          return false;
        }
      }
      return true;
    }
    return true;
  }
  
  calculateAmount(row?, index?) {
    if(!isNullOrUndefined(row)) {
      if (!isNullOrUndefined(row.qty) && (row.qty != '')) {
        this.dataSource.data[index].grossAmount = (this.calculateLiter(row.productCode)) ? (row.qty * row.rate).toFixed(2) : (row.rate * row.qty).toFixed(2);
      } else if (!isNullOrUndefined(row.fQty) && (row.fQty != '')) {
        this.dataSource.data[index].grossAmount = (this.calculateLiter(row.productCode)) ? (0 * row.rate).toFixed(2) : (0 * row.rate).toFixed(2);
      }
    }
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    let totaltaxAmount = 0;
    let totalAmount = 0;
    for (let a = 0; a < this.dataSource.data.length; a++) {
      if (this.dataSource.data[a].grossAmount) {
        let tax = (this.taxPercentage) ? (this.dataSource.data[a].cgst + this.dataSource.data[a].sgst) : this.dataSource.data[a].igst;
        let amountTax = (+this.dataSource.data[a].grossAmount * (tax + 100)) / 100;
        let totalTax = (amountTax - (+this.dataSource.data[a].grossAmount));
        totalAmount = totalAmount + (+this.dataSource.data[a].grossAmount);
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
    })
    this.branchFormData.patchValue({
      amountInWords: curValue.lakhWord(this.branchFormData.get('grandTotal').value)[0],
    });
  }

  getProductDeatilsSectionRcd(productCode, index, id) {
    this.setFocus = id + index;
    this.commonService.setFocus(id + index)
    // if (this.checkProductCode(productCode, index)) {
    if (!isNullOrUndefined(this.branchFormData.get('branchCode').value) && this.branchFormData.get('branchCode').value != '' &&
      !isNullOrUndefined(productCode.value) && productCode.value != '') {
      const getProductDeatilsSectionRcdUrl = String.Join('/', this.apiConfigService.getProductDeatilsSectionRcd);
      this.apiService.apiPostRequest(getProductDeatilsSectionRcdUrl, {
        branchCode:
          this.branchFormData.get('branchCode').value, productCode: productCode.value
      }).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['ProductDeatilsSectionRcd'])) {
                this.billingDetailsSection(res.response['ProductDeatilsSectionRcd'], index);
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
    // if (isNullOrUndefined(obj.availStock) || (obj.availStock == 0)) {
    //   this.alertService.openSnackBar(`This Product(${obj.productCode}) available stock is 0`, Static.Close, SnackBar.error);
    // }
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
    this.setToFormModel(null, null, null);
  }



  getProductByProductName(value) {
    if (!isNullOrUndefined(value) && value != '') {
      const getProductByProductNameUrl = String.Join('/', this.apiConfigService.getProductByProductName);
      this.apiService.apiPostRequest(getProductByProductNameUrl, { productName: value }).subscribe(
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

  setProductName(name) {
    this.tableFormData.patchValue({
      productName: name.value
    });
    this.setToFormModel(null, null, null);
  }

  roundOff(prop) {
    if (!isNullOrUndefined(this.branchFormData.get('totalAmount').value) && this.branchFormData.get('totalAmount').value > 0) {
      if (prop == 'roundOffPlus') {
        this.branchFormData.patchValue({
          grandTotal: ((+this.branchFormData.get('totalAmount').value) + (+this.branchFormData.get('totaltaxAmount').value) + (+this.branchFormData.get('roundOffPlus').value)).toFixed(2),
          roundOffMinus: null
        })
      } else if (prop == 'roundOffMinus') {
        this.branchFormData.patchValue({
          grandTotal: ((+this.branchFormData.get('totalAmount').value) + (+this.branchFormData.get('totaltaxAmount').value) - (+this.branchFormData.get('roundOffMinus').value)).toFixed(2),
          roundOffPlus: null
        })
      }
    }
  }

  print() {

  }


  save() {
    if (this.routeUrl == 'return') {
      this.registerReturnPurchase();
      return;
    }
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
      // if (stock.availStock == 0) {
      //   content = '0 Availablilty Stock';
      //   return stock;
      // }
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
    this.registerPurchase(tableData);
  }

  registerReturnPurchase() {
    this.branchFormData.patchValue({
      paymentMode: 0,
      purchaseInvDate:this.commonService.formatDate(this.branchFormData.get('purchaseInvDate').value)
    });
    const registerPurchaseUrl = String.Join('/', this.apiConfigService.getPurchaseRegisterPurchaseReturn, this.isPurchaseReturnInvoice, this.branchFormData.get('purchaseInvId').value);
    this.apiService.apiGetRequest(registerPurchaseUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Purchase Created Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }

  enableFileds() {
    this.branchFormData.controls['purchaseInvNo'].enable();
    this.branchFormData.controls['totalAmount'].enable();
    this.branchFormData.controls['totaltaxAmount'].enable();
    this.branchFormData.controls['grandTotal'].enable();
    this.branchFormData.controls['totalCgst'].enable();
    this.branchFormData.controls['totalSgst'].enable();
    this.branchFormData.controls['totalIgst'].enable();
    this.branchFormData.controls['paymentMode'].enable();
    this.branchFormData.controls['amountInWords'].enable();
    this.branchFormData.controls['userName'].enable();
    this.branchFormData.controls['ledgerName'].enable();
  }

  reset() {
    this.branchFormData.reset();
    this.dataSource = new MatTableDataSource();
    this.formDataGroup();
    this.loadData();
  }

  registerPurchase(data) {
    this.branchFormData.patchValue({
      paymentMode: 0
    });
    const registerPurchaseUrl = String.Join('/', this.apiConfigService.registerPurchase);
    const requestObj = { purchaseHdr: this.branchFormData.value, purchaseDetail: data };
    this.apiService.apiPostRequest(registerPurchaseUrl, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Purchase Created Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }

}

