import { Component, Inject, Optional, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AlertService } from '../../../../services/alert.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { StatusCodes } from '../../../../enums/common/common';
import { ApiConfigService } from '../../../../services/api-config.service';


@Component({
  selector: 'app-leavetypes',
  templateUrl: './leavetypes.component.html',
  styleUrls: ['./leavetypes.component.scss']
})
export class LeavetypesComponent implements OnInit {

  isSubmitted = false;
  formData: any;
  tableData: any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService
    ) {

    this.formData = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      name: ['', [Validators.required, Validators.minLength(2)]]
    });



  }

  ngOnInit() {
    this.getcashAcctobranchAccountsList();
  }

  
  getcashAcctobranchAccountsList() {
    const getcashAcctobranchAccountsListUrl = String.Join('/', this.apiConfigService.getBranchesBranchList);
     this.commonService.apiCall(getcashAcctobranchAccountsListUrl, (data) => {
       console.log(data);
       this.tableData = data['branchesList'];
     });
   }


  showErrorAlert(caption: string, message: string) {
    // this.alertService.openSnackBar(caption, message);
  }

  get formControls() { return this.formData.controls; }


 
}
