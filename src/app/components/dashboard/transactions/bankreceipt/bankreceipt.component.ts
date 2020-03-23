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

@Component({
  selector: 'app-bankreceipt',
  templateUrl: './bankreceipt.component.html',
  styleUrls: ['./bankreceipt.component.scss']
})
export class BankReceiptComponent implements OnInit {

  dateForm: FormGroup;
  // table
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['bankReceiptMasterId', 'bankReceiptDate', 'branchCode', 'branchName', 'bankLedgerCode',
  'bankLedgerName', 'totalAmount','voucherNo'
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
      voucherNo: [null]
    });
  }

  ngOnInit() {
    this.branchCode = JSON.parse(localStorage.getItem('user'));
    this.search();
  }
  

  getBankreceiptList() {
    const getBankreceiptListUrl = String.Join('/', this.apiConfigService.getBankreceiptList, this.branchCode.branchCode);
    this.apiService.apiPostRequest(getBankreceiptListUrl, this.dateForm.value).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
        if (!isNullOrUndefined(res.response['BankReceiptList']) && res.response['BankReceiptList'].length) {
          this.dataSource = new MatTableDataSource( res.response['BankReceiptList']);
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
        }
      }
      });
  }

  openSale(row) {
    localStorage.setItem('selectedBill', JSON.stringify(row));
    this.router.navigate(['dashboard/transactions/bankreceipt/createBankreceipt', row.voucherNo]);
  }

  search() {
    if (isNullOrUndefined(this.dateForm.value.voucherNo)) {
        if (isNullOrUndefined(this.dateForm.value.selected)) {
          this.alertService.openSnackBar('Select VoucherNo or Date', Static.Close, SnackBar.error);
          return;
        } else {
          this.dateForm.patchValue({
            fromDate:  this.commonService.formatDate(this.dateForm.value.selected.start._d),
            toDate:  this.commonService.formatDate(this.dateForm.value.selected.end._d)
          });
        }
    }

    this.getBankreceiptList();
  }

  reset() {
    this.dateForm.reset();
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

}
