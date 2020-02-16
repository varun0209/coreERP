import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { String } from 'typescript-string-operations';
import { ApiConfigService } from '../../../../services/api-config.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  dateForm: FormGroup;
  
  displayedColumns: string[] = ['branchCode'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,

  ) {

    this.dateForm = this.formBuilder.group({
      formDate: [''],
      toDate: ['']
    }, {validator: this.checkDates});
  }

  checkDates(group: FormGroup) {
    if(group.controls.formDate.value < group.controls.toDate.value) {
      return { notValid:true }
    }
    return null;
  }

  ngOnInit() {
    this.getTableData();
  }

  search() {
    this.dateForm.patchValue({
      formDate: this.commonService.formatDate(this.dateForm.get('formDate').value),
      toDate: this.commonService.formatDate(this.dateForm.get('toDate').value)
    })
    console.log(this.dateForm.value);

  }

  
  getTableData() {
    const getcashAcctobranchAccountsListUrl = String.Join('/', this.apiConfigService.getBranchesBranchList);
    this.commonService.apiCall(getcashAcctobranchAccountsListUrl, (data) => {
      this.dataSource = new MatTableDataSource(data['branchesList']);
      this.dataSource.paginator = this.paginator;
    });
  }

  cancel() {
    this.dateForm.reset();
    console.log(this.dateForm.value)

  }

}
