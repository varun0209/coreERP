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
  selector: 'app-create-bankpayment',
  templateUrl: './create-bankpayment.component.html',
  styleUrls: ['./create-bankpayment.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class CreateBankpaymentComponent implements OnInit {

  branchFormData: FormGroup;
  GetBranchesListArray = [];
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  getAccountLedgerListArray = [];
  getAccountLedgerListNameArray = [];
  getSalesBranchListArray = [];
  branchesList = [];
  getmemberNamesArray=[];
  GetBPAccountLedgerListArray=[];
  GetBankPAccountLedgerListArray=[];

  displayedColumns: string[] = ['SlNo','toLedgerCode', 'toLedgerName', 'amount', 'delete'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  date = new Date((new Date().getTime() - 3888000000));
  modelFormData: FormGroup;
  tableFormData: FormGroup;
  printBill: any;
  tableFormObj = false;
  routeUrl = '';

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
      voucherNo: [null],
      bankPaymentDate: [(new Date()).toISOString()],
      branchId:[null],
      branchCode: [null],
      branchName: [null],
      shiftId: [null],
      userId: [null],
      userName: [null],
      employeeId: [null],
      totalAmount: [null],
      narration: [null],
      //printBill: [false],
      realized:[null],
      postingDate:[null],
      chequeNo:[null],
      bankLedgerCode:[null],
      bankPaymentMasterId:[null],
      bankPaymentVchNo:[null],
      bankLedgerId:[null],
      bankLedgerName:[null],
      serverDate:[null]
    });

  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.getBankPaymentBranchesList();
   // this.getBankPAccountLedgerList();
    this.activatedRoute.params.subscribe(params => {
      console.log(params.id1);
      if (!isNullOrUndefined(params.id1)) {
        this.routeUrl = params.id1;
        this.disableForm(params.id1);
        this.getBankPaymentDetailsList(params.id1);
        let billHeader = JSON.parse(localStorage.getItem('selectedBill'));
        this.branchFormData.setValue(billHeader);
        console.log(billHeader);
      } else {
        this.disableForm();
        this.addTableRow();
        const user = JSON.parse(localStorage.getItem('user'));
        if (!isNullOrUndefined(user.branchCode)) {
          this.branchFormData.patchValue({
            branchCode: user.branchCode,
            userId: user.seqId,
            userName: user.userName
          });
          this.setBranchCode();
          this.genarateVoucherNo(user.branchCode);
          this.formGroup();
        }
      }
    });
  }
  getBankPaymentDetailsList(id) {
    const getBankPaymentDetailsListUrl = String.Join('/', this.apiConfigService.getBankPaymentDetailsList, id);
    this.apiService.apiGetRequest(getBankPaymentDetailsListUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response['BankPaymentDetails']) && res.response['BankPaymentDetails'].length) {
            this.dataSource = new MatTableDataSource(res.response['BankPaymentDetails']);
            this.dataSource.paginator = this.paginator;
            this.spinner.hide();
          }
        }
      });
  }

  disableForm(route?) {
    if (!isNullOrUndefined(route)) {
      this.branchFormData.controls['voucherNo'].disable();
      this.branchFormData.controls['bankLedgerCode'].disable();
      this.branchFormData.controls['branchCode'].disable();
      this.branchFormData.controls['bankPaymentDate'].disable();
      this.branchFormData.controls['postingDate'].disable();
      this.branchFormData.controls['narration'].disable();
      this.branchFormData.controls['userName'].disable();
      this.branchFormData.controls['totalAmount'].disable();
      this.branchFormData.controls['chequeNo'].disable();
      this.branchFormData.controls['realized'].disable();
    }

    // this.branchFormData.controls['voucherNo'].disable();
    // this.branchFormData.controls['totalAmount'].disable();
  }


  getBankPaymentBranchesList() {
    const getBankPaymentBranchesListUrl = String.Join('/', this.apiConfigService.getBankPaymentBranchesList);
    this.apiService.apiGetRequest(getBankPaymentBranchesListUrl).subscribe(
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

  getBPAccountLedgerList() {
    const getBPAccountLedgerListUrl = String.Join('/', this.apiConfigService.getBPAccountLedgerList);
    this.apiService.apiGetRequest(getBPAccountLedgerListUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['BranchesList']) && res.response['BranchesList'].length) {
              this.GetBPAccountLedgerListArray = res.response['BranchesList'];
              this.spinner.hide();
            }
          }
        }
      });
  }

  // getBankPAccountLedgerList() {
  //   const getBankPAccountLedgerListUrl = String.Join('/', this.apiConfigService.getBankPAccountLedgerList);
  //   this.apiService.apiGetRequest(getBankPAccountLedgerListUrl).subscribe(
  //     response => {
  //       const res = response.body;
  //       if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //         if (!isNullOrUndefined(res.response)) {
  //           if (!isNullOrUndefined(res.response['AccountLedgerList']) && res.response['AccountLedgerList'].length) {
  //             this.GetBankPAccountLedgerListArray = res.response['AccountLedgerList'];
  //             this.spinner.hide();
  //           }
  //         }
  //       }
  //     });
  // }

  getBankPAccountLedgerList(value) {
    if (!isNullOrUndefined(value) && value != '') {
      const getBankPAccountLedgerListUrl = String.Join('/', this.apiConfigService.getBPAccountLedgerList, value);
      this.apiService.apiGetRequest(getBankPAccountLedgerListUrl).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['AccountLedgerList']) && res.response['AccountLedgerList'].length) {
                this.GetBankPAccountLedgerListArray = res.response['AccountLedgerList'];
                //this.getCashPartyAccount();
              } else {
                this.GetBankPAccountLedgerListArray = [];
              }
            }
            this.spinner.hide();
          }
        });
    } else {
      this.GetBankPAccountLedgerListArray = [];
    }
  }

  setLedgerName(value) {
    const lname = this.GetBankPAccountLedgerListArray.filter(lCode => {
      if (lCode.id == this.branchFormData.get('bankLedgerCode').value) {
        return lCode;
      }
    });
    this.branchFormData.patchValue({
      bankLedgerName: !isNullOrUndefined(lname[0]) ? lname[0].text : null
    });
  }

  
  genarateVoucherNo(branch?) {
    let genarateVoucherNoUrl;
    if (!isNullOrUndefined(branch)) {
      genarateVoucherNoUrl = String.Join('/', this.apiConfigService.getBankPaymentVoucherNo, branch);
    } else {
      genarateVoucherNoUrl = String.Join('/', this.apiConfigService.getBankPaymentVoucherNo, this.branchFormData.get('branchCode').value);
    }
    this.apiService.apiGetRequest(genarateVoucherNoUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['BranchesList'])) {
              this.branchFormData.patchValue({
                voucherNo: res.response['BranchesList']
              });
              this.spinner.hide();
            }
          }
        }
      });
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

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.getmemberNamesArray.filter(option => option.text.toLowerCase().includes(filterValue));
  }
  
  addTableRow() {
    const tableObj = {
      toLedgerCode: '', toLedgerName: '', amount: '', delete: '', text: 'obj'
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
      voucherNo: [null],
      cashPaymentDate: [null],
      shiftId: [null],
      userId: [null],
      employeeId: [null],
      toLedgerCode: [null, [Validators.required]],
      toLedgerName: [null, [Validators.required]],
      amount: [null],
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
    this.calculateAmount();
  }

  getAccountByAccountCode(value) {
    if (!isNullOrUndefined(value) && value != '') {
      const getAccountLedgerListUrl = String.Join('/', this.apiConfigService.getBPAccountLedgerList, value);
      this.apiService.apiGetRequest(getAccountLedgerListUrl).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['AccountLedgerList'])) {
                this.getAccountLedgerListArray = res.response['AccountLedgerList'];
                this.spinner.hide();
              }
            }
          }
        });
    } else {
      this.getAccountLedgerListArray = [];
    }
  }

  getAccountByAccountName(value) {
    if (!isNullOrUndefined(value) && value != '') {
      const getAccountLedgerListUrl = String.Join('/', this.apiConfigService.getBPAccountLedgerListByName, value);
      this.apiService.apiGetRequest(getAccountLedgerListUrl).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['AccountLedgerList'])) {
                this.getAccountLedgerListArray = res.response['AccountLedgerList'];
                this.spinner.hide();
              }
            }
          }
        });
    } else {
      this.getAccountLedgerListArray = [];
    }
  }

  calculateAmount(row?, index?) {
    let amount = 0;
    for (let a = 0; a < this.dataSource.data.length; a++) {
      if (this.dataSource.data[a].amount) {
        amount = amount + this.dataSource.data[a].amount;
      }
    }
    this.branchFormData.patchValue({
      totalAmount : amount
    });
  }

  
  setAccountCode(value) {
    let flag = true;
    for (let t = 0; t < this.getAccountLedgerListArray.length; t++) {
      if (this.getAccountLedgerListArray[t]['text'] == value.value) {
        for (let d = 0; d < this.dataSource.data.length; d++) {
          if (this.dataSource.data[d]['toLedgerName'] == this.getAccountLedgerListArray[t]['text']) {
            this.dataSource.data[d]['toLedgerCode'] = this.getAccountLedgerListArray[t]['id'];
            this.tableFormData.patchValue({
              toLedgerCode : this.getAccountLedgerListArray[t].id,
              toLedgerName : this.getAccountLedgerListArray[t].text
            });
            flag = false;
            break;
          }
        }
      }
    }
    if(flag) {
        this.dataSource.data[this.dataSource.data.length - 1].toLedgerName = value.value;
        for (let t = 0; t < this.getAccountLedgerListArray.length; t++) {
          if (this.getAccountLedgerListArray[t]['text'] == value.value) {
            for (let d = 0; d < this.dataSource.data.length; d++) {
              if (this.dataSource.data[d]['toLedgerName'] == this.getAccountLedgerListArray[t]['text']) {
                this.dataSource.data[d]['toLedgerCode'] = this.getAccountLedgerListArray[t]['id'];
                this.tableFormData.patchValue({
                  toLedgerCode : this.getAccountLedgerListArray[t].id,
                  toLedgerName : this.getAccountLedgerListArray[t].text
                        });
                break;
              }
            }
          }
        }
    }
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  setAccountName(value) {
    let flag = true;
    for (let t = 0; t < this.getAccountLedgerListArray.length; t++) {
      if (this.getAccountLedgerListArray[t]['id'] == value.value) {
        for (let d = 0; d < this.dataSource.data.length; d++) {
          if (this.dataSource.data[d]['toLedgerCode'] == this.getAccountLedgerListArray[t]['id']) {
            this.dataSource.data[d]['toLedgerName'] = this.getAccountLedgerListArray[t]['text'];
            this.tableFormData.patchValue({
              toLedgerCode : this.getAccountLedgerListArray[t].id,
              toLedgerName : this.getAccountLedgerListArray[t].text
            });
            flag = false;
            break;
          }
        }
      }
    }
    if(flag) {
        this.dataSource.data[this.dataSource.data.length - 1].toLedgerCode = value.value;
        for (let t = 0; t < this.getAccountLedgerListArray.length; t++) {
          if (this.getAccountLedgerListArray[t]['id'] == value.value) {
            for (let d = 0; d < this.dataSource.data.length; d++) {
              if (this.dataSource.data[d]['toLedgerCode'] == this.getAccountLedgerListArray[t]['id']) {
                this.dataSource.data[d]['toLedgerName'] = this.getAccountLedgerListArray[t]['text'];
                this.tableFormData.patchValue({
                  toLedgerCode : this.getAccountLedgerListArray[t].id,
                  toLedgerName : this.getAccountLedgerListArray[t].text
                        });
                break;
              }
            }
          }
        }
    }
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.data,this.tableFormData);
    //this.setToFormModel();

  }
  save() {
    // if (!this.tableFormObj) {
    //   this.dataSource.data.pop();
    //   console.log(this.dataSource.data);
    // }
    if (this.routeUrl != '' || this.dataSource.data.length == 0) {
      return;
    }
    let tableData = [];
    for (let d = 0; d < this.dataSource.data.length; d++) {
      if (this.dataSource.data[d]['toLedgerCode'] != '') {
        tableData.push(this.dataSource.data[d]);
      }
    }
    let content = '';
    let totalAmount = null;
    this.dataSource.data.forEach(element => {
      totalAmount = element.amount + totalAmount;
    });

    console.log(this.branchFormData, this.dataSource.data);

    this.registerBankPayment(tableData);
  }

  reset() {
    this.branchFormData.reset();
    this.dataSource = new MatTableDataSource();
    this.formGroup();
    this.loadData();
  }

  registerBankPayment(data) {
    this.branchFormData.patchValue({
      bankPaymentMasterId: 0,
      bankPaymentDate: this.commonService.formatDate(this.branchFormData.get('bankPaymentDate').value),
      postingDate: this.commonService.formatDate(this.branchFormData.get('postingDate').value),
    });
    const registerBankPaymentUrl = String.Join('/', this.apiConfigService.registerBankPayment);
    const requestObj = { BankpaymentHdr: this.branchFormData.value, BankpaymentDetail: data };
    this.apiService.apiPostRequest(registerBankPaymentUrl, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Bank Payment Created Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }

}
