import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { String } from 'typescript-string-operations';
import { ApiConfigService } from '../../../../services/api-config.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-leaveapproval',
  templateUrl: './leaveapproval.component.html',
  styleUrls: ['./leaveapproval.component.scss']
})

export class LeaveApprovalComponent implements OnInit {

  leaveApprovalList: any;

  leaveRequestForm: FormGroup;
  displayedColumns: string[] = ['select', 'empCode', 'empName', 'sno', 'leaveCode', 'leaveDays', 'leaveRemarks', 'status', 'approvedId', 'reason'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;



  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,  ) {

    this.leaveRequestForm = this.formBuilder.group({
      accept: [null],
      reject: [null],
      reason: [null]
    });

  }

  ngOnInit() {
    this.getLeaveApplDetailsList();
  }

  approveOrReject(event) {
    if (event) {
      this.leaveRequestForm.patchValue({
        accept: "Accept",
        reject: null
      });
    } else {
      this.leaveRequestForm.patchValue({
        accept: null,
        reject: "Reject"
      });
    }
  }

  singleChecked(flag, column, row) {
    console.log(flag, row, column)
    this.leaveRequestForm
    if (this.leaveApprovalList.length == 0) {
      this.leaveApprovalList.push(row);
    } else {
      for (let l = 0; l < this.leaveApprovalList.length; l++) {
        if (this.leaveApprovalList[l]['sno'] == column) {
          if (!flag) {
            if (this.leaveApprovalList.length == 1) {
              this.leaveApprovalList = [];
            } else {
              delete this.leaveApprovalList[l];
            }
          }
          if (flag) {
            this.leaveApprovalList.push(row);
          }
        }
      }
    }
  }

  checkAll(flag, checkAll?) {
    for (let l = 0; l < this.dataSource.data.length; l++) {
      this.dataSource.data[l]['select'] = flag;
    }
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    if (flag && checkAll) {
      this.leaveApprovalList = this.dataSource.data;
    } else {
      this.leaveApprovalList = [];
    }
  }

  getLeaveApplDetailsList() {
    const getLeaveApplDetailsListUrl = String.Join('/', this.apiConfigService.getLeaveApplDetailsList);
    this.apiService.apiGetRequest(getLeaveApplDetailsListUrl)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.dataSource = new MatTableDataSource(res.response['LeaveApplDetailsList']);
            this.dataSource.paginator = this.paginator;
            this.checkAll(false);
          }
        }
        this.spinner.hide();
      });
  }

  save() {
    console.log(this.leaveApprovalList);
  }


}