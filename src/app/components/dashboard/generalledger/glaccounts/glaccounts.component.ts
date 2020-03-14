import { Component, Inject, Optional, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { ApiService } from '../../../../services/api.service';
import { String } from 'typescript-string-operations';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-glaccounts',
  templateUrl: './glaccounts.component.html',
  styleUrls: ['./glaccounts.component.scss']
})

export class GlAccountsComponent  implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
  stmtTypeList:any;
  natOfAccList:any;
  glAccBalType:any;
  glaccgrpList:any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GlAccountsComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private commonService:CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
        glcode: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        glaccountName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        accGroup: [null, [Validators.required]],
        active: [null],
        accountNumber: [null],
        ext1: [null],
        ext2: [null],
        balanceType: [null],
        nactureofaccount: [null, [Validators.required]],
        statementType: [null, [Validators.required]],
        openingBalance: [null]
      });


      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        this.modelFormData.controls['glcode'].disable();
      }

  }

  ngOnInit() {
this.getStatementTypes();
this.getNaturesOfAcountsList();
this.getGLAccBalanceTypes();
this.getAccountGroupList();
  }

  getStatementTypes() {
    const getStatementTypes = String.Join('/', this.apiConfigService.getStatementTypes);
    this.apiService.apiGetRequest(getStatementTypes)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.stmtTypeList = res.response['StatementTypesList'];
          }
        }
        this.spinner.hide();
      });
  }

  getNaturesOfAcountsList() {
    const getNaturesOfAcountsList = String.Join('/', this.apiConfigService.getNaturesOfAcountsList);
    this.apiService.apiGetRequest(getNaturesOfAcountsList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.natOfAccList = res.response['BalanceTypesList'];
          }
        }
        this.spinner.hide();
      });
  }

  getGLAccBalanceTypes() {
    const getGLAccBalanceTypes = String.Join('/', this.apiConfigService.getGLAccBalanceTypes);
    this.apiService.apiGetRequest(getGLAccBalanceTypes)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.glAccBalType = res.response['BalanceTypesList'];
          }
        }
        this.spinner.hide();
      });
  }

  getAccountGroupList() {
    const getAccountGroupList = String.Join('/', this.apiConfigService.getAccountGroupList);
    this.apiService.apiGetRequest(getAccountGroupList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.glaccgrpList = res.response['GLUnderSubGroupList'];
          }
        }
        this.spinner.hide();
      });
  }



  get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['glcode'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
