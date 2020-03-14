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
        underSubGroupCode: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        groupName: [null, [Validators.required]],
        underSubGroupName: [null,[Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        numberRange: [null],
        active: [null],
        ext1: [null],
        ext2: [null],
        subGroupName: [null, [Validators.required]]
      });


      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        this.modelFormData.controls['underSubGroupCode'].disable();
      }

  }

  ngOnInit() {
this.getglAccgrpList();
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
    this.modelFormData.controls['underSubGroupCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
