import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { String } from 'typescript-string-operations';

import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ReportsService } from './reports.service';
import { isNullOrUndefined } from 'util';
import { NgxSpinnerService } from 'ngx-spinner';
import { StatusCodes } from '../../../enums/common/common';
import { DeleteItemComponent } from '../../../reuse-components/delete-item/delete-item.component';
import { TableComponent } from '../../../reuse-components/table/table.component';
import { AlertService } from '../../../services/alert.service';
import { SnackBar } from '../../../enums/common/common';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  tableData: any;
  tableUrl: any;


  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private reportsService: ReportsService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
  ) { 
    activatedRoute.params.subscribe(params => {
      this.tableUrl = reportsService.getRouteUrls(params.id);
      if (!isNullOrUndefined(this.tableUrl)) {
        this.getTableData();
      }

    });
  }

  ngOnInit() {
  }

  getTableData() {
    this.spinner.show();
    const getUrl = String.Join('/', this.tableUrl.url);

    this.apiService.apiGetRequest(getUrl)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.tableData = res.response[this.tableUrl.listName];
          }
        }
        this.spinner.hide();
      }, error => {

      });
  }

}
