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
  selector: 'app-stockreceipt',
  templateUrl: './stockreceipt.component.html',
  styleUrls: ['./stockreceipt.component.scss']
})
export class StockreceiptsComponent implements OnInit {

  dateForm: FormGroup;
  // table
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['operatorStockReceiptId', 'receiptNo', 'receiptDate', 'fromBranchCode', 'fromBranchName',
    'toBranchCode', 'toBranchName', 'shiftId', 'userId'
  ];
    receiptNo: any;
    fromBranchCode: any;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,

  )
  {
    this.dateForm = this.formBuilder.group({
      selected: [null],
      fromDate: [null],
      toDate: [null],
      receiptNo: [null]
    });
  }

  ngOnInit()
  {
    this.fromBranchCode = JSON.parse(localStorage.getItem('user'));
    this.receiptNo = JSON.parse(localStorage.getItem('user'));
  }



  openStockreceipt(row)
  {
    debugger;
    localStorage.setItem('selectedStockreceipt', JSON.stringify(row));
    this.router.navigate(['dashboard/transactions/stockreceipt/CreateStockreceipts', row.receiptNo]);
  }

  //Search and datadisplay code
  search() {
    if (isNullOrUndefined(this.dateForm.value.receiptNo)) {
      if (isNullOrUndefined(this.dateForm.value.selected)) {
        this.alertService.openSnackBar('Select Stockreceipt or Date', Static.Close, SnackBar.error);
        return;
      } else {
        this.dateForm.patchValue
        ({
          fromDate: this.commonService.formatDate(this.dateForm.value.selected.start._d),
          toDate: this.commonService.formatDate(this.dateForm.value.selected.end._d)
        });
      }
    }

    this.getStockreceiptList();
  }
  getStockreceiptList() {
    const getInvoiceListUrl = String.Join('/', this.apiConfigService.getStockreceiptsList);

    const date = {
      'fromDate': '3/7/2020 1:10:57 PM',
      'toDate': '1/7/2020 1:10:57 PM',
      'receiptNo': null
    }
    this.apiService.apiPostRequest(getInvoiceListUrl, date).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response['StockreceiptList']) && res.response['StockreceiptList'].length) {
            this.dataSource = new MatTableDataSource(res.response['StockreceiptList']);
            this.dataSource.paginator = this.paginator;
            this.spinner.hide();
          }
        }
      });
  }

  reset() {
    this.dateForm.reset();
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

}
