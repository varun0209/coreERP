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
  selector: 'app-bankpayment',
  templateUrl: './bankpayment.component.html',
  styleUrls: ['./bankpayment.component.scss']
})
export class BankPaymentComponent implements OnInit {

  dateForm: FormGroup;
  // table
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['bankPaymentMasterId', 'bankPaymentDate', 'branchCode', 'branchName', 'fromLedgerCode',
  'fromLedgerName', 'totalAmount','voucherNo'
];

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
  }

  getInvoiceList() {
    const getInvoiceListUrl = String.Join('/', this.apiConfigService.getInvoiceList);
    // this.apiService.apiPostRequest(getInvoiceListUrl, this.dateForm.value).subscribe(

    const date = {
        'fromDate':'3/7/2020 1:10:57 PM',
          'toDate':'1/7/2020 1:10:57 PM',
          'voucherNo':null
      }
    this.apiService.apiPostRequest(getInvoiceListUrl, date).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
        if (!isNullOrUndefined(res.response['InvoiceList']) && res.response['InvoiceList'].length) {
          this.dataSource = new MatTableDataSource( res.response['InvoiceList']);
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
        }
      }
      });
  }

  openSale(row) {
    localStorage.setItem('selectedBill', JSON.stringify(row));
    this.router.navigate(['dashboard/transactions/bankpayment/createBankpayment', row.voucherNo]);
  }

  search() {
    if (isNullOrUndefined(this.dateForm.value.voucherNo)) {
        if (isNullOrUndefined(this.dateForm.value.selected)) {
          this.alertService.openSnackBar('Select Invoice or Date', Static.Close, SnackBar.error);
          return;
        } else {
          this.dateForm.patchValue({
            fromDate:  this.commonService.formatDate(this.dateForm.value.selected.start._d),
            toDate:  this.commonService.formatDate(this.dateForm.value.selected.end._d)
          });
        }
    }

    this.getInvoiceList();
  }

  reset() {
    this.dateForm.reset();
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

}
