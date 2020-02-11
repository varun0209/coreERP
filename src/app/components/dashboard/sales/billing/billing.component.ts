import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { ApiConfigService } from '../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { isNullOrUndefined, callbackify } from 'util';
import { StatusCodes } from '../../../../enums/common/common';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  formData: FormGroup;
  tableForm: FormGroup;
  getSalesBranchListArray: any;


  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,

  ) {

   this.formData  =  this.formBuilder.group({
      branch: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      billNo: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      address1: [null],
      address2: [null],
      address3: [null],
      address4: [null],
      advanceAmount: [null],
      bankAccountNumber: [null],
      bankBranch: [null],
      bankName: [null],
      building: [null],
      companyCode: [null],
      email: [null],
      ext1: [null],
      ext2: [null],
      gstNo: [null],
      ifsccode: [null],
      leaseAmount: [null],
      leaseExpiryDate: [null],
      leaseStartDate: [null],
      ownerName: [null],
      phoneNo: [null],
      phone1: [null],
      phone2: [null],
      phone3: [null],
      active: ['Y'],
      place: [null],
      state: [null],
      pinCode: [null],
      companyCodeNavigation: [null]
    });

   this.formData.controls['billNo'].disable();

  }

  ngOnInit() {
    const getSalesBranchListUrl = String.Join('/', this.apiConfigService.getSalesBranchList);
    this.apiCall(getSalesBranchListUrl, (data) => {
      this.getSalesBranchListArray = data.BranchesList;
    });
  }

  apiCall(url, callback) {
    this.commonService.showSpinner();
    this.apiService.apiGetRequest(url)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            callback(res.response);
          }
        }
        this.commonService.hideSpinner();
      }, error => {

      });
  }

  genarateBillNo() {
    const generateBillUrl = String.Join('/', this.apiConfigService.generateBillNo, this.formData.get('branch').value);
    this.apiCall(generateBillUrl, (data) => {
      console.log(data);
    });
  }


}
