import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ApiConfigService } from '../../../../services/api-config.service';
import { ApiService } from '../../../../services/api.service';
import { AlertService } from '../../../../services/alert.service';
import { isNullOrUndefined } from 'util';
import { SnackBar, StatusCodes } from '../../../../enums/common/common';
import { Static } from '../../../../enums/common/static';

@Component({
  selector: 'app-rolesprevilages',
  templateUrl: './rolesprevilages.component.html',
  styleUrls: ['./rolesprevilages.component.scss']
})
export class RolesprevilagesComponent implements OnInit {

  formData: FormGroup;
  roleArray = [ { id : '1' , text : 'admin' }, { id : '1' , text : 'emp' } ];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['menuName', 'active', 'add', 'edit', 'delete'  ];

  constructor(
    private formBuilder: FormBuilder,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private alertService: AlertService,

  ) { 
    this.formData = this.formBuilder.group({
      role: [null]
    });
  }

  ngOnInit() {
    let data = [
      { menuName : 'test', active : false, add : false, edit : false, delete : false },
      { menuName : 'test2', active : false, add : false, edit : false, delete : false },
      { menuName : 'test3', active : false, add : false, edit : false, delete : false },
      { menuName : 'test4', active : false, add : false, edit : false, delete : false },
      { menuName : 'test5', active : false, add : false, edit : false, delete : false },
    ];
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  // asa() {
  //   const registerInvoiceUrl = String.Join('/', this.apiConfigService.registerInvoice);
  //   this.apiService.apiPostRequest(registerInvoiceUrl, requestObj).subscribe(
  //     response => {
  //       const res = response.body;
  //       if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //         if (!isNullOrUndefined(res.response)) {
  //           this.alertService.openSnackBar(Static.LoginSussfull, Static.Close, SnackBar.success);
  //         }
  //       }
  //     });
  // }

  // adasd() {
  //   const registerInvoiceUrl = String.Join('/', this.apiConfigService.registerInvoice);
  //   const requestObj = { InvoiceHdr: this.branchFormData, InvoiceDetail: this.dataSource.data };
  //   this.apiService.apiPostRequest(registerInvoiceUrl, requestObj).subscribe(
  //     response => {
  //       const res = response.body;
  //       if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //         if (!isNullOrUndefined(res.response)) {
  //           this.alertService.openSnackBar(Static.LoginSussfull, Static.Close, SnackBar.success);
  //         }
  //       }
  //     });
  // }

  checkboxCheck(event , column) {
    console.log(event.checked , column)
    this.dataSource.data = this.dataSource.data.map(val => {
      val[column] = event.checked;
      return val;
    } );
  }

  update() {
    console.log(this.dataSource.data)
  }

}

