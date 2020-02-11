import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { String } from 'typescript-string-operations';

import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { NgxSpinnerService } from 'ngx-spinner';
import { StatusCodes } from '../../../enums/common/common';
import { DeleteItemComponent } from '../../../reuse-components/delete-item/delete-item.component';
import { TableComponent } from '../../../reuse-components/table/table.component';
import { AlertService } from '../../../services/alert.service';
import { SnackBar } from '../../../enums/common/common';
import { SalesService } from './sales.service';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  tableData: any;
  addOrUpdateData: any;
  tableUrl: any;

  @ViewChild(TableComponent, { static: false }) tableComponent: TableComponent;


  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private salesService: SalesService
  ) { 
    activatedRoute.params.subscribe(params => {
      this.tableUrl = salesService.getRouteUrls(params.id);
      if (!isNullOrUndefined(this.tableUrl)) {
        this.getTableData();
        if (!isNullOrUndefined(this.tableComponent)) {
          this.tableComponent.defaultValues();
        }
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

  deleteRecord(value) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '1024px',
      data: value,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrUndefined(result)) {
      this.spinner.show();
      const deleteCompanyUrl = String.Join('/', this.tableUrl.deleteCompany, result.item[this.tableUrl.primaryKey]);
      this.apiService.apiDeleteRequest(deleteCompanyUrl, result.item)
        .subscribe(
          response => {
            const res = response.body;
            if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
              if (!isNullOrUndefined(res.response)) {
                this.addOrUpdateData = result;
                this.alertService.openSnackBar('Delected Record...', 'close', SnackBar.success);
              }
            }
            this.spinner.hide();
          },
          error => {
            console.log('error');
          });
        }
    });
  }

  addOrUpdateEvent(value) {
      if (value.action === 'Delete') {
       this.deleteRecord(value);
      } else {
    const dialogRef = this.dialog.open(this.tableUrl.component, {
      width: '1024px',
      height: '500px',
      data: value,
      panelClass: 'custom-dialog-container',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrUndefined(result)) {
        this.spinner.show();
        if (result.action === 'Add') {
         const addCompanyUrl = String.Join('/', this.tableUrl.registerUrl);
         this.apiService.apiPostRequest(addCompanyUrl, result.item)
          .subscribe(
            response => {
              const res = response.body;
              if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
                if (!isNullOrUndefined(res.response)) {
                  this.addOrUpdateData = result;
                  this.alertService.openSnackBar('Record Added...', 'close', SnackBar.success);
                }
              }
              this.spinner.hide();
            },
            error => {
              console.log('error');
            });
        } else if (result.action === 'Edit') {
         const updateCompanyUrl = String.Join('/', this.tableUrl.updateCompany);
         this.apiService.apiUpdateRequest(updateCompanyUrl, result.item)
          .subscribe(
            response => {
              const res = response.body;
              this.spinner.hide();
              if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
                if (!isNullOrUndefined(res.response)) {
                  result.item = res.response;
                  this.addOrUpdateData = result;
                  this.alertService.openSnackBar('Record Updated...', 'close', SnackBar.success);
                }
              }
            },
            error => {
              console.log('error');
            });
          }
      }
    });
  }
  }


}
