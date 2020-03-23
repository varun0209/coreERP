import { String } from 'typescript-string-operations';
import {
  Component, OnInit, ViewChild, Input, OnChanges,
  ChangeDetectorRef, Output, EventEmitter, AfterViewInit, OnDestroy
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatTable } from '@angular/material';
import { CommonService } from '../../services/common.service';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';
import { DeleteItemComponent } from '../delete-item/delete-item.component';
import { SearchFilterTableComponent } from '../search-filter-table/search-filter-table.component';
// search

import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ReplaySubject, Subject, pipe } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect } from '@angular/material';
import { User } from '../../models/common/user';
import { TranslateService } from '@ngx-translate/core';
import { HttpParams } from '@angular/common/http';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { ReportsInnerTableComponent } from '../reports-inner-table/reports-inner-table.component';
import { ApiService } from 'src/app/services/api.service';
import { ApiConfigService } from 'src/app/services/api-config.service';
import { runInThisContext } from 'vm';
import { ReportsService } from 'src/app/components/dashboard/reports/reports.service';
import { StatusCodes } from 'src/app/enums/common/common';
@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {

  public tableMultiCtrl: FormControl = new FormControl();
  public filteredTableMulti: ReplaySubject<any> = new ReplaySubject<any>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;
  protected onDestroy = new Subject<void>();

  dateForm: FormGroup;
  params = new HttpParams();
  @Input() tableData: any;
  @Input() headerData: any;
  @Input() footerData: any;
  @Output() generateTable = new EventEmitter();

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  highlightedRows = [];
  columnDefinitions = [];
  filterColData = [];

  keys = [];
  index: any;
  user: User;
  routeParam: any;
  excelUrl: any;
  Reports = [
    // { id: '1', reportName: 'Shift Report' },
    { id: '2', reportName: 'Shift wise sale value' },
    { id: '3', reportName: 'Shift wise sales stock' },
    { id: '4', reportName: 'Shift wise hdfc bank account' },
    { id: '5', reportName: 'Shift wise  fleet card account' },
    { id: '6', reportName: 'Shift wise daily sales report' }
  ];
  AccountLedgers = [];
  ReportBranches = [];
  Products = [];
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private reportsService: ReportsService,
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    activatedRoute.params.subscribe(params => {
      this.routeParam = params.id;
    });
    this.dateForm = this.formBuilder.group({
      formDate: [''],
      toDate: [''],
      selectedReport: [''],
      selectedAccountLedger: [''],
      selectedBranch: [],
      selectedProduct: []
    }, { validator: this.checkDates });
  }
  checkDates(group: FormGroup) {
    if (group.controls.formDate.value < group.controls.toDate.value) {
      return { notValid: true }
    }
    return null;
  }
  defaultValues() {
    this.params = new HttpParams();
    this.dataSource = new MatTableDataSource();
    this.highlightedRows = [];
    this.columnDefinitions = [];
    this.keys = [];
    this.index = null;
    this.filterColData = [];
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  checkboxCheck(index) {

    this.filterColData[index] = {
      def: this.filterColData[index].def,
      label: this.filterColData[index].label, hide: !this.filterColData[index].hide
    };

  }
  saveChanges() {
    this.columnDefinitions = this.filterColData.slice(0);
    this.filterColData = [];
  }
  getDisplayedColumns(): string[] {
    if (!isNullOrUndefined(this.tableData)) {
      return this.columnDefinitions.filter(cd => cd.hide).map(cd => cd.def);
    }
  }
  toggleSelectAll(selectAllValue: boolean) {
    this.filteredTableMulti.pipe(take(1), takeUntil(this.onDestroy))
      .subscribe(val => {
        if (selectAllValue) {
          this.tableMultiCtrl.patchValue(val);
        } else {
          this.tableMultiCtrl.patchValue([]);
        }
      });
  }

  getAccountLedgersList() {
    const getLoginUrl = String.Join('/', this.apiConfigService.getAccountLedgersList);
    this.apiService.apiGetRequest(getLoginUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === 'PASS') {
            if (!isNullOrUndefined(res.response['accountLedgerList'])) {
              this.AccountLedgers = res.response['accountLedgerList'];
            }
          }
        });
  }
  getReportBranchesList() {
    const getLoginUrl = String.Join('/', this.apiConfigService.getReportBranchList);
    this.apiService.apiGetRequest(getLoginUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === 'PASS') {
            if (!isNullOrUndefined(res.response['reportBranchesList'])) {
              this.ReportBranches = res.response['reportBranchesList'];
            }
          }
        });
  }
  getProductsList() {
    const getLoginUrl = String.Join('/', this.apiConfigService.getStockProducts);
    this.apiService.apiGetRequest(getLoginUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === 'PASS') {
            if (!isNullOrUndefined(res.response['productList'])) {
              this.Products = res.response['productList'];
            }
          }
        });
  }

  GenerateReport() {
    this.dateForm.patchValue({
      formDate: this.commonService.formatReportDate(this.dateForm.get('formDate').value),
      toDate: this.commonService.formatReportDate(this.dateForm.get('toDate').value),
      selectedReport: this.dateForm.get('selectedReport').value,
      selectedAccountLedger: this.dateForm.get('selectedAccountLedger').value,
      selectedBranch: this.dateForm.get('selectedBranch').value,
      selectedProduct: this.dateForm.get('selectedProduct').value
    })
    this.params = new HttpParams();
    this.params = this.params.append('UserID', 'admin');//this.user.userName);
    this.params = this.params.append('fromDate', this.dateForm.value.formDate);
    this.params = this.params.append('toDate', this.dateForm.value.toDate);
    this.params = this.params.append('reportID', this.dateForm.value.selectedReport);
    this.params = this.params.append('ledgerCode', this.dateForm.value.selectedAccountLedger);
    this.params = this.params.append('branchCode', this.dateForm.value.selectedBranch);
    this.params = this.params.append('productCode', this.dateForm.value.selectedProduct);
    this.generateTable.emit(this.params)
  }

  exportToExcel(): void {
    let columns = [];
    for (const key in this.tableData[0]) {
      columns.push(key);
    }
    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report', {
      pageSetup: { fitToPage: true, paperSize: 9, orientation: 'landscape' }
    });
    //Add Row and formatting
    let titleRow = worksheet.addRow([this.routeParam + ' Report']);
    titleRow.font = { name: 'Calibri', family: 4, size: 16, underline: 'single', bold: true }
    titleRow.alignment = { horizontal: 'center' }
    worksheet.mergeCells(1, 1, 2, columns.length);
    worksheet.addRow([]);

    let headerRows = [];
    for (var i: number = 0; i < this.headerData.length; i++) {
      headerRows[i] = [];
      let j = 0;
      for (const key in this.headerData[0]) {
        headerRows[i][j] = this.headerData[i][key];
        j++;
      }
    }

    headerRows.forEach(d => {
      let row = worksheet.addRow(d);
    });

    //Blank Row 
    worksheet.addRow([]);
    //Add Header Row

    let headerRow = worksheet.addRow(columns);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
        cell.font = { bold: true }
    })
    worksheet.columns.forEach(col => {
      col.width = 20;
    }

    )
    let rows = [];
    for (var i: number = 0; i < this.dataSource.filteredData.length; i++) {
      rows[i] = [];
      let j = 0;
      for (const key in this.tableData[0]) {
        rows[i][j] = this.dataSource.filteredData[i][key];
        j++;
      }
    }
    rows.forEach(d => {
      let row = worksheet.addRow(d);
    });
    worksheet.addRow([]);
    //Adding fooer Rows
    let footerRows = [];
    for (var i: number = 0; i < this.footerData.length; i++) {
      footerRows[i] = [];
      let j = 0;
      for (const key in this.footerData[0]) {
        footerRows[i][j] = this.footerData[i][key];
        j++;
      }
    }

    footerRows.forEach(d => {
      let row = worksheet.addRow(d);
    });
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, this.routeParam + 'Report.xlsx');
    });
  }
  exportToPdf() {
    let doc = new jsPDF('p', 'mm', 'a4');
    let columns = []; //["ID", "Name", "Country"];
    for (const key in this.tableData[0]) {
      columns.push(key);
    }
    let rows = [];
    for (var i: number = 0; i < this.dataSource.filteredData.length; i++) {
      rows[i] = [];
      let j = 0;
      for (const key in this.tableData[0]) {
        rows[i][j] = this.dataSource.filteredData[i][key];
        j++;
      }
    }
    doc.autoTable({
      body: [
        [{ content: this.routeParam + ' Report', colSpan: 2, rowSpan: 2, styles: { halign: 'center', fontStyle: 'bold' } }],
      ],
      theme: 'plain'
    });
    let pipe = new DatePipe('en-US');
    let currentDate = new Date();

    let headerRows = [];
    for (var i: number = 0; i < this.headerData.length; i++) {
      headerRows[i] = [];
      let j = 0;
      for (const key in this.headerData[0]) {
        headerRows[i][j] = this.headerData[i][key];
        j++;
      }
    }
    doc.autoTable({
      margin: { top: 10 },
      body: headerRows,
      theme: 'plain'
    })
    doc.autoTable(columns, rows, { startY: doc.autoTable.previous.finalY + 5 });
    let footerRows = [];
    for (var i: number = 0; i < this.footerData.length; i++) {
      footerRows[i] = [];
      let j = 0;
      for (const key in this.footerData[0]) {
        footerRows[i][j] = this.footerData[i][key];
        j++;
      }
    }
    doc.autoTable({
      body: footerRows,
      theme: 'plain',
      startY: doc.autoTable.previous.finalY + 10
    })
    doc.save(this.routeParam + 'Report.pdf');
  }
  openDialog(val, row?) {
    if (this.routeParam == 'Shift') {
      this.dateForm.patchValue({
        formDate: this.commonService.formatReportDate(this.dateForm.get('formDate').value),
        toDate: this.commonService.formatReportDate(this.dateForm.get('toDate').value),
        selectedReport: this.dateForm.get('selectedReport').value,
        selectedAccountLedger: this.dateForm.get('selectedAccountLedger').value
      })
      if (this.dateForm.value.selectedReport == "") {
        alert("Please select a shift report type");
        return false;
      }
      else {
        if (this.dateForm.value.fromDate == "") {
          alert("Please select From Date");
          return false;
        }
        else {
          if (this.dateForm.value.toDate == "") {
            alert("Please select To Date");
            return false;
          }
          else {
            let data;
            if (!isNullOrUndefined(row)) {
              data = { action: val, item: row };
              this.highlightedRows = [row];
            } else {
              data = { action: val, item: this.highlightedRows[0] };
            }
            if (data.action === 'Edit' && this.highlightedRows.length) {
              this.params = new HttpParams();
              //params = params.append('UserID',this.user.userName);
              this.params = this.params.append('fromDate', this.dateForm.value.formDate);
              this.params = this.params.append('toDate', this.dateForm.value.toDate);
              this.params = this.params.append('reportID', this.dateForm.value.selectedReport);
              this.params = this.params.append('ledgerCode', this.dateForm.value.selectedAccountLedger);
              this.params = this.params.append('shiftId', data.item.ShiftID)

              let tableUrl = this.reportsService.getRouteUrls('InnerShift');
              const getUrl = String.Join('/', tableUrl.url);
              this.apiService.apiGetRequest(getUrl, this.params)
                .subscribe(
                  response => {
                    let innerReportName = this.Reports[this.dateForm.get('selectedReport').value - 2].reportName;
                    const res = response.body;
                    if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
                      if (!isNullOrUndefined(res.response)) {
                        const dialogRef = this.dialog.open(ReportsInnerTableComponent, {
                          width: '1024px',
                          height: '500px',
                          data: { gridData: res.response[tableUrl.listName], reportName: innerReportName, headerData: this.headerData, footerData: this.footerData },
                          panelClass: 'custom-dialog-container',
                          disableClose: true
                        });
                      }
                    }
                  }, error => {

                  });
            }
          }
        }
      }
    }
  }
  highlightRows(row, i) {
    if (this.highlightedRows.length) {
      if (this.index === i) {
        this.highlightedRows = [];
        this.index = null;
      } else {
        this.highlightedRows = [];
        this.highlightedRows.push(row);
        this.index = i;
      }
    } else {
      this.highlightedRows = [];
      this.highlightedRows.push(row);
      this.index = i;
    }
  }

  ngOnChanges() {
    if (!isNullOrUndefined(this.tableData)) {
      if (this.tableData.length > 0) {
        this.dataSource = new MatTableDataSource(this.tableData);
      }
    }

    if (!isNullOrUndefined(this.dataSource)) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    if (!isNullOrUndefined(this.tableData) && this.tableData.length > 0) {

      // tslint:disable-next-line:forin
      for (const key in this.tableData[0]) {
        this.keys.push({ col: key });
      }

      this.keys.forEach(cols => {
        const obj = {
          def: cols.col, label: cols.col, hide: true
        };
        this.columnDefinitions.push(obj);
      });
    }
  }
  ngAfterViewInit() {
    // this.multiSelect.open();
    this.cdr.detectChanges();
  }
  ngOnInit() {
    this.getAccountLedgersList();
    this.getReportBranchesList();
    this.getProductsList();
  }
  ngOnDestroy() {
    this.tableData = [];
  }

}