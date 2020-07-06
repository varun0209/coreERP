import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { String } from 'typescript-string-operations';
import { ApiConfigService } from '../../../../services/api-config.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ApiService } from '../../../../services/api.service';
import { isNullOrUndefined } from 'util';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBar, StatusCodes } from '../../../../enums/common/common';
import { Static } from '../../../../enums/common/static';
import { AlertService } from '../../../../services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.scss']
})
export class SalesInvoiceComponent implements OnInit {
  selectedDate = {start : moment().add(0, 'day'), end: moment().add(0, 'day')};

  dateForm: FormGroup;
  // table
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['invoiceNo', 'invoiceDate', 'branchCode', 'branchName', 'ledgerCode',
    'ledgerName', 'grandTotal', 'stateCode', 'vehicleRegNo', 'userId', 'salesInvoice', 'isManualEntry', 'shiftId',
    'customerGstin', 
  ];
  branchCode: any;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.dateForm = this.formBuilder.group({
      selected: [null],
      fromDate: [null],
      toDate: [null],
      invoiceNo: [null],
      Role:[null]
    });
  }

  ngOnInit() {
    this.branchCode = JSON.parse(localStorage.getItem('user'));
    this.dateForm.patchValue({
      Role: this.branchCode.role
    })
    this.getInvoiceList();
  }

  getInvoiceList() {
    const getInvoiceListUrl = String.Join('/', this.apiConfigService.getInvoiceList, this.branchCode.branchCode);
    this.apiService.apiPostRequest(getInvoiceListUrl, this.dateForm.value).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response['InvoiceList']) && res.response['InvoiceList'].length) {
            this.dataSource = new MatTableDataSource(res.response['InvoiceList']);
            this.dataSource.paginator = this.paginator;
            this.spinner.hide();
          }
        }
      });
  }

  openSale(row) {
    localStorage.setItem('selectedBill', JSON.stringify(row));
    this.router.navigate(['dashboard/sales/salesInvoice/viewSaleInvoice','create', row.invoiceNo ]);
  }

  returnSale(row) {
    localStorage.setItem('selectedBill', JSON.stringify(row));
    this.router.navigate(['dashboard/sales/salesInvoice/viewSaleInvoice', 'return',  row.invoiceNo]);
  }

  search() {
    if (isNullOrUndefined(this.dateForm.value.invoiceNo)) {
      if (isNullOrUndefined(this.dateForm.value.selected)) {
        this.alertService.openSnackBar('Select Invoice or Date', Static.Close, SnackBar.error);
        return;
      } else {
        this.dateForm.patchValue({
          fromDate: this.commonService.formatDate(this.dateForm.value.selected.start._d),
          toDate: this.commonService.formatDate(this.dateForm.value.selected.end._d),
          role:this.branchCode.role
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
