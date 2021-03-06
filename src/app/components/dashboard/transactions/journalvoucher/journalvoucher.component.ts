import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { String } from 'typescript-string-operations';
import { ApiConfigService } from '../../../../services/api-config.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ApiService } from '../../../../services/api.service';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { SnackBar, StatusCodes } from '../../../../enums/common/common';
import { Static } from '../../../../enums/common/static';
import { AlertService } from '../../../../services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

@Component({
  selector: 'app-journalvoucher',
  templateUrl: './journalvoucher.component.html',
  styleUrls: ['./journalvoucher.component.scss']
})
export class JournalVoucherComponent implements OnInit {
  selectedDate = {start : moment().add(-1, 'day'), end: moment().add(0, 'day')};
  GetBranchesListArray:any;
  dateForm: FormGroup;
  // table
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['journalVoucherMasterId', 'journalVoucherDate', 'branchCode', 'branchName', 'fromLedgerCode',
  'fromLedgerName', 'totalAmount','voucherNo'
];
branchCode:any;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,

  ) {
    this.dateForm = this.formBuilder.group({
      selected: [null],
      fromDate: [null],
      toDate: [null],
      voucherNo: [null],
      role:[null],
      branchCode:[null]
    });
  }

  ngOnInit() {
    this.branchCode = JSON.parse(localStorage.getItem('user'));
      
      this.dateForm.patchValue({role:this.branchCode.role})
      this.getJournalvoucherList();
      this.getJournalVoucherBranchesList();
  }

  getJournalVoucherBranchesList() {
    const getJournalVoucherBranchesListUrl = String.Join('/', this.apiConfigService.getJournalVoucherBranchesList);
    this.apiService.apiGetRequest(getJournalVoucherBranchesListUrl).subscribe(
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

  getJournalvoucherList() {
    const getJournalvoucherListUrl = String.Join('/', this.apiConfigService.getJournalvoucherList, this.branchCode.branchCode);
    this.apiService.apiPostRequest(getJournalvoucherListUrl, this.dateForm.value).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
        if (!isNullOrUndefined(res.response['JournalVoucherList']) && res.response['JournalVoucherList'].length) {
          this.dataSource = new MatTableDataSource( res.response['JournalVoucherList']);
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
        }
      }
      });
  }

  openSale(row) {
    localStorage.setItem('selectedBill', JSON.stringify(row));
    this.router.navigate(['dashboard/transactions/bankpayment/createJournalvoucher', row.journalVoucherMasterId]);
  }

  search() {
    if (isNullOrUndefined(this.dateForm.value.voucherNo)) {
      if (isNullOrUndefined(this.dateForm.value.branchCode)) {
        if (isNullOrUndefined(this.dateForm.value.selected)) {
          this.alertService.openSnackBar('Select VoucherNo or Date', Static.Close, SnackBar.error);
          return;
        } else {
          this.dateForm.patchValue({
            fromDate:  this.commonService.formatDate(this.dateForm.value.selected.start._d),
            toDate:  this.commonService.formatDate(this.dateForm.value.selected.end._d),
            voucherNo:this.dateForm.value.voucherNo,
            role:this.branchCode.role,
            branchCode:this.dateForm.value.branchCode
          });
        }
      }
    }

    this.getJournalvoucherList();
  }

  reset() {
    this.dateForm.reset();
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

}
