import { Component, Inject, Optional, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ApiConfigService } from '../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { CommonService } from '../../../../services/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { ApiService } from '../../../../services/api.service';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-structure-creation',
  templateUrl: './structure-creation.component.html',
  styleUrls: ['./structure-creation.component.scss']
})
export class StructureCreationComponent implements OnInit {

  isSaveDisabled = false;
  structionName: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', "text", "amount", "percentage", "select"];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private apiConfigService: ApiConfigService,
    private commonService: CommonService,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<StructureCreationComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  ngOnInit() {
    this.getComponentsList();
  }

  getComponentsList() {
    const getComponentsListUrl = String.Join('/', this.apiConfigService.getStructureComponentsList);
    this.apiService.apiGetRequest(getComponentsListUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.dataSource = new MatTableDataSource(res.response['ComponentsList']);
              this.dataSource.paginator = this.paginator;
            }
          }
          this.spinner.hide();
        });
  }

  enableCheckBox(column, data, index) {
    console.log(column, data, index, this.dataSource.data);
    this.dataSource.data[index]['amount'] = null;
    this.dataSource.data[index]['percentage'] = null;
    if (data == '') {
      this.dataSource.data[index]['select'] = true;
    } else {
      this.dataSource.data[index]['select'] = false;
    }
    this.dataSource.data[index][column] = data;
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }

  save() {
    this.isSaveDisabled = false;
    if (isNullOrUndefined(this.structionName) && this.structionName == '') {
      return;
    }

    let select = false;
    for (let s = 0; s < this.dataSource.data.length; s++) {
      if (this.dataSource.data[s]['select']) {
        select = true;
      }
    }
    if (select) {
      console.log(this.structionName, this.dataSource);
    }
  }


  cancel() {
    this.dialogRef.close();
  }


}
