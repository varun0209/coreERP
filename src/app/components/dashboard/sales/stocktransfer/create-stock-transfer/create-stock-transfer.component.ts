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
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../../directives/format-datepicker';

@Component({
  selector: 'app-create-stock-transfer',
  templateUrl: './create-stock-transfer.component.html',
  styleUrls: ['./create-stock-transfer.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class CreateStockTransferComponent implements OnInit {
  formData: FormGroup;
  routeUrl = '';
  GetBranchesListArray = [];
  tableFormData: FormGroup;
  totalQty: any;
  totalAmount: any;
  getProductByProductCodeArray = [];
  getProductByProductNameArray = [];
  printBill = false;
  setFocus: any;

  displayedColumns: string[] = ['SlNo', 'productCode', 'productName', 'hsnNo', 'qty', 'fQty', 'unitId', 'rate', 'totalAmount', 'availStock', 'batchNo', 'delete'];
  dataSource: MatTableDataSource<any>;

  date = new Date((new Date().getTime() - 3888000000));
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
    this.formData = this.formBuilder.group({
      stockTransferMasterId: [null],
      stockTransferNo: [null],
      stockTransferDate: [(new Date()).toISOString()],
      fromBranchCode: [null],
      fromBranchName: [null],
      toBranchCode: [null],
      toBranchName: [null],
      shiftId: [null],
      userId: [null],
      userName: [null],
      employeeId: [null],
      narration: [null],
      serverDateTime: [null]
    });
  }

  ngOnInit() {
    this.loadData();
  }



  loadData() {
    this.GetBranchesList();
    this.activatedRoute.params.subscribe(params => {
      if (!isNullOrUndefined(params.id1)) {
        this.routeUrl = params.id1;
        this.disableForm(params.id1);
        this.getStockTransferDetilsaRecords(params.id1);
        const billHeader = JSON.parse(localStorage.getItem('stockTransfer'));
        this.formData.setValue(billHeader);
      } else {
        this.disableForm();
        this.addTableRow();
        this.formGroup();
        const user = JSON.parse(localStorage.getItem('user'));
        if (!isNullOrUndefined(user.branchCode)) {
          this.formData.patchValue({
            fromBranchCode: user.branchCode,
            userId: user.seqId,
            userName: user.userName
          });
        }
      }
    });
  }

  getStockTransferDetilsaRecords(id) {
    const getStockTransferDetilsaRecordsUrl = String.Join('/', this.apiConfigService.getStockTransferDetilsaRecords, id);
    this.apiService.apiGetRequest(getStockTransferDetilsaRecordsUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response['InvoiceList']) && res.response['InvoiceList'].length) {
            this.dataSource = new MatTableDataSource(res.response['InvoiceList']);
            this.spinner.hide();
          }
        }
      });
  }

  disableForm(route?) {
    if (!isNullOrUndefined(route)) {
      this.formData.controls['stockTransferMasterId'].disable();
      this.formData.controls['stockTransferDate'].disable();
      this.formData.controls['fromBranchCode'].disable();
      this.formData.controls['fromBranchName'].disable();
      this.formData.controls['toBranchCode'].disable();
      this.formData.controls['toBranchName'].disable();
      this.formData.controls['shiftId'].disable();
      this.formData.controls['userId'].disable();
      this.formData.controls['employeeId'].disable();
      this.formData.controls['narration'].disable();
      this.formData.controls['serverDateTime'].disable();
    }
    this.formData.controls['stockTransferNo'].disable();
    this.formData.controls['userName'].disable();

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
              this.setBranchCode('fromBranchCode', 'fromBranchName');
              this.spinner.hide();
            }
          }
        }
      });
  }

  setBranchCode(code, text) {
    let flag = false;
    const branchList = JSON.parse(localStorage.getItem('branchList'));
    for (let b = 0; b < branchList.length; b++) {
      if (this.formData.get('fromBranchCode').value == branchList[b]) {
        flag = true;
      }
    }
    if (!flag) {
      this.alertService.openSnackBar(`You are not eligible to use this Branch(${this.formData.get('fromBranchCode').value}) code`, Static.Close, SnackBar.error);
      this.formData.patchValue({
        fromBranchCode: null,
        fromBranchName: null,
        stockTransferNo: null
      });
    } else {
      const bname = this.GetBranchesListArray.filter(branchCode => {
        if (branchCode.id == this.formData.get(code).value) {
          return branchCode;
        }
      });
      if (bname.length) {
        this.formData.patchValue({
          [text]: !isNullOrUndefined(bname[0]) ? bname[0].text : null
        });
        if (code == 'fromBranchCode') {
          this.generateStockTranfNo();
        }
      }
    }
  }

  addTableRow() {
    const tableObj = {
      stockTransferDetailId: '', stockTransferMasterId: '', stockTransferDetailsDate: '', productId: '', STockTransferDetail: '',
      productCode: '', productName: '', hsnNo: '', rate: '', productGroupId: '', productGroupCode: '', qty: '',
      fQty: '', batchNo: '', unitId: '', unitName: '', totalAmount: '', availStock: '', text: 'obj', delete: ''
    }
    if (!isNullOrUndefined(this.dataSource)) {
      this.dataSource.data.push(tableObj);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    } else {
      this.dataSource = new MatTableDataSource([tableObj]);
    }
    this.commonService.setFocus(this.setFocus);
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
    this.calculateAmount();
  }

  formGroup() {
    this.tableFormData = this.formBuilder.group({
      stockTransferDetailId: [null],
      stockTransferMasterId: [null],
      stockTransferDetailsDate: [null],
      productId: [null],
      STockTransferDetail: [null],
      productCode: [null, [Validators.required]],
      productName: [null, [Validators.required]],
      hsnNo: [null],
      rate: [null],
      productGroupId: [null],
      productGroupCode: [null],
      qty: [null],
      fQty: [null],
      batchNo: [null],
      unitId: [null],
      unitName: [null],
      totalAmount: [null],
      availStock: [null]
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

  generateStockTranfNo() {
    const generateStockTranfNoUrl = String.Join('/', this.apiConfigService.generateStockTranfNo, this.formData.get('fromBranchCode').value);
    this.apiService.apiGetRequest(generateStockTranfNoUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['SateteList']) && res.response['SateteList'].length) {
              this.formData.patchValue({
                stockTransferNo: !isNullOrUndefined(res.response['SateteList']) ? res.response['SateteList'] : null
              });
              this.spinner.hide();
            }
          }
        }
      });
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


  getStockTransferDetailsSection(productCode, index, id) {
    this.setFocus = id + index;
    this.commonService.setFocus(id + index)
    // if (this.checkProductCode(productCode, index)) {
    if (!isNullOrUndefined(this.formData.get('fromBranchCode').value) && this.formData.get('fromBranchCode').value != '' &&
      !isNullOrUndefined(productCode.value) && productCode.value != '') {
      const getStockTransferDetailsSectionUrl = String.Join('/', this.apiConfigService.getStockTransferDetailsSection);
      this.apiService.apiPostRequest(getStockTransferDetailsSectionUrl, {branchCode: this.formData.get('fromBranchCode').value, productCode : productCode.value
    }).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['SateteList'])) {
                this.detailsSection(res.response['SateteList'], index);
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


  detailsSection(obj, index) {
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

  calculateAmount(row?, index?) {
    if(!isNullOrUndefined(row)) {
      if (!isNullOrUndefined(row.qty) && (row.qty != '')) {
        this.dataSource.data[index].totalAmount = (row.qty * row.rate).toFixed(2);
      } else if (!isNullOrUndefined(row.fQty) && (row.fQty != '')) {
        this.dataSource.data[index].totalAmount = (0 * row.rate).toFixed(2);
      }
    }
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    let amount = 0;
    let qty = 0;
    for (let a = 0; a < this.dataSource.data.length; a++) {
      if (this.dataSource.data[a].totalAmount) {
        amount = amount + (+this.dataSource.data[a].totalAmount);
      }
      if (!isNullOrUndefined(this.dataSource.data[a].qty)) {
        qty = qty + this.dataSource.data[a].qty;
      } else if (!isNullOrUndefined(this.dataSource.data[a].fQty)) {
        qty = qty + this.dataSource.data[a].fQty;
      }
    }
    this.totalQty = qty;
    this.totalAmount = !isNullOrUndefined(amount) ? amount : null
    this.formData.patchValue({
      totalAmount: !isNullOrUndefined(amount) ? amount.toFixed(2) : null,
    });
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
    this.registerStockTransfer(tableData);
  }

  enableFileds() {
    this.formData.controls['stockTransferNo'].enable();
    this.formData.controls['userName'].enable();
  }

  setProductName(name) {
    this.tableFormData.patchValue({
      productName: name.value
    });
    this.setToFormModel(null, null, null);
  }

  registerStockTransfer(data) {
    const registerStockTransferUrl = String.Join('/', this.apiConfigService.registerStockTransfer);
    const requestObj = { stockTransferMaster: this.formData.value, stockTransferDetail: data };
    this.apiService.apiPostRequest(registerStockTransferUrl, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Stock Trasfer Created Successfully..', Static.Close, SnackBar.success);
          }
          this.spinner.hide();
          this.reset();
        }
      });
  }

  reset() {
    this.formData.reset();
    this.dataSource = new MatTableDataSource();
    this.formDataGroup();
    this.loadData();
  }


}
