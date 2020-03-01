import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { String } from 'typescript-string-operations';
import { ApiConfigService } from '../../../../services/api-config.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

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
  ) {

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
    this.commonService.apiCall(getLeaveApplDetailsListUrl, (data) => {
      this.dataSource = new MatTableDataSource(data['LeaveApplDetailsList']);
      this.dataSource.paginator = this.paginator;
      this.checkAll(false);
    });
  }

  save() {
    console.log(this.leaveApprovalList);
  }


}