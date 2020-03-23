import { Component, Inject, Optional, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { CommonService } from '../../../../services/common.service';

interface affectGrossProfit {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-undersubgroup',
  templateUrl: './undersubgroup.component.html',
  styleUrls: ['./undersubgroup.component.scss']
})

export class UndersubGroupComponent  implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
  glAccgrpList:any;
  getAccSubGrpList:any;
  glAccNameList:any;

  affectGrossProfit : affectGrossProfit[]=
  [
    { value: 'Yes', viewValue: 'Yes' },
    { value: 'No', viewValue: 'No' }
  ];

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UndersubGroupComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private commonService:CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
        accountGroupId: 0,
        accountGroupName: [null, [Validators.required]],
        nature: [null, [Validators.required]],
        narration: [null],
        affectGrossProfit: [null],
        extraDate: [null],
        extra1: [null],
        extra2:[null],
        groupUnder:[null, [Validators.required]]
      });


      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
       this.modelFormData.controls['accountGroupId'].disable();
      }

  }

  ngOnInit() {
this.getglAccgrpList();
this.getAccountNamelist();
  }

  getglAccgrpList() {
    const getglAccgrpList = String.Join('/', this.apiConfigService.getglAccgrpList);
    this.apiService.apiGetRequest(getglAccgrpList)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.glAccgrpList = res.response['GLAccGroupList'];
          }
        }
        this.spinner.hide();
      });
  }

  getAccountNamelist() {
    const getAccountNamelist = String.Join('/', this.apiConfigService.getAccountNamelist);
    this.apiService.apiGetRequest(getAccountNamelist)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.glAccNameList = res.response['GetAccountNamelist'];
          }
        }
        this.spinner.hide();
      });
  }

  getAccountSubGrouplist() {
    const getAccountSubGrouplist = String.Join('/', this.apiConfigService.getAccountSubGrouplist,
    this.modelFormData.get('groupName').value);
    this.apiService.apiGetRequest(getAccountSubGrouplist)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.getAccSubGrpList = res.response['GLAccSubGroupList'];
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
    this.modelFormData.controls['accountGroupId'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
