import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { String } from 'typescript-string-operations';
import { ApiConfigService } from '../../../../services/api-config.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ApiService } from '../../../../services/api.service';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-ctcbreakup',
  templateUrl: './ctcbreakup.component.html',
  styleUrls: ['./ctcbreakup.component.scss']
})
export class CTCBreakupComponent implements OnInit {
  modelFormData: FormGroup;
  structureList:any;
  filteredOptions:any;
  displayedColumns: string[] = ['componentCode','componentName','amount','duration','specificMonth'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
  ) {
    this.modelFormData = this.formBuilder.group({
      myControl: [null],
      effectFrom: [null],
      structureName: [null],
      ctc: [null]
    });

   }

  ngOnInit() {
    this.getStructureList();
    this.getctcComponentsList();
  }

  getStructureList() {
    this.commonService.showSpinner();
    const getStructureList = String.Join('/', this.apiConfigService.getStructureList);
    this.apiService.apiGetRequest(getStructureList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.structureList = res.response['ComponentsList'];
          }
        }
        this.commonService.hideSpinner();
      }, error => {

      });
  }

  getctcComponentsList() {
    const getctcComponentsListUrl = String.Join('/', this.apiConfigService.getctcComponentsList);
    this.commonService.apiCall(getctcComponentsListUrl, (data) => {
      this.dataSource = new MatTableDataSource(data['componentsList']);
      this.dataSource.paginator = this.paginator;
    });
  }

  save() {
    
  }
}
