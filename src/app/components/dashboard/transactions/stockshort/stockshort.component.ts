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
  selector: 'app-stockshort',
  templateUrl: './stockshort.component.html',
  styleUrls: ['./stockshort.component.scss']
})
export class StockshortComponent  implements OnInit {
  selectedDate = { start: moment().add(-1, 'day'), end: moment().add(0, 'day') };
  dateForm: FormGroup;
  // table
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['stockshortMasterId', 'stockshortNo', 'stockshortDate', 'branchCode', 'branchName',
    'shiftId', 'userId','costCenter'
  ];
    stockshortNo: any;
    branchCode: any;

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
      selected: [this.selectedDate],
      fromDate: [null],
      toDate: [null],
      stockshortNo: [null],
      role: [null]
    });
  }

  ngOnInit()
  {
    this.branchCode = JSON.parse(localStorage.getItem('user'));
    this.dateForm.patchValue({ role: this.branchCode.role })
    this.getInvoiceDetails();
  }

  getInvoiceDetails() {
    //debugger;
    const getInvoiceDetailstUrl = String.Join('/', this.apiConfigService.getStockshortDeatilListLoad, this.branchCode.branchCode);
    this.apiService.apiPostRequest(getInvoiceDetailstUrl, this.dateForm.value).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response['StockshortsList']) && res.response['StockshortsList'].length) {
            this.dataSource = new MatTableDataSource(res.response['StockshortsList']);
            this.dataSource.paginator = this.paginator;
            this.spinner.hide();
          }
        }
      });
  }

  openStockissues(row) {
    // debugger;
    localStorage.setItem('selectedStockshort', JSON.stringify(row));
    this.router.navigate(['dashboard/transactions/stockshort/CreateStocshorts', row.stockshortMasterId]);
  }

  returnSdeale() {
    this.router.navigate(['dashboard/transactions/stockshort/CreateStocshorts', 'return']);
  }

  
  //Search and datadisplay code
  search() {
    if (isNullOrUndefined(this.dateForm.value.stockshortNo)) {
      if (isNullOrUndefined(this.dateForm.value.selected)) {
        this.alertService.openSnackBar('Select issueNo or Date', Static.Close, SnackBar.error);
        return;
      }
      else {
        this.dateForm.patchValue({
          fromDate: this.commonService.formatDate(this.dateForm.value.selected.start._d),
          toDate: this.commonService.formatDate(this.dateForm.value.selected.end._d),
          stockshortNo: this.dateForm.value.stockshortNo
        });
      }
    }
    this.getStockshortList();
  }
  getStockshortList() {
    const getInvoiceListUrl = String.Join('/', this.apiConfigService.getStockshortList, this.branchCode.branchCode);

    this.apiService.apiPostRequest(getInvoiceListUrl, this.dateForm.value).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response['StockshortsList']) && res.response['StockshortsList'].length) {
            this.dataSource = new MatTableDataSource(res.response['StockshortsList']);
            console.log(this.dataSource);
            console.log(res.response['StockshortsList']);
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
