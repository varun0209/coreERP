import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { String } from 'typescript-string-operations';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiConfigService } from '../../services/api-config.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackBar, StatusCodes } from '../../enums/common/common';
import { Static } from '../../enums/common/static';
import { NgxSpinnerService } from 'ngx-spinner';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  userProfile: FormGroup;
  isSubmitted = false;

  constructor(
    private alertService: AlertService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiConfigService: ApiConfigService,
    public translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {

  }

  // form model
  ngOnInit() {
    this.userProfile  =  this.formBuilder.group({
      companyCode: [''],
      branchCode: ['']
    });

    const user = JSON.parse(localStorage.getItem('user'));
    if (!isNullOrUndefined(user)) {
      this.userProfile.patchValue(user);
    }
  }

  // Language Preference
  setLang(lang) {
    localStorage.setItem( Static.DefaultLang , lang.toLowerCase());
    this.translate.use(lang.toLowerCase());
    this.translate.currentLang = lang;
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.userProfile.invalid) {
      return;
    }
    // this.loginAPICall();
  }

// loginAPICall() {
//   this.spinner.show();
//   this.alertService.openSnackBar(Static.AttemptingLogin, Static.Close, SnackBar.normal);
//   const requestObj = { UserName: this.loginForm.get('username').value, Password: this.loginForm.get('password').value };
//   const getLoginUrl = String.Join('/', this.apiConfigService.loginUrl);

//   this.apiService.apiPostRequest(getLoginUrl, requestObj)
//       .subscribe(
//       response => {
//         const res = response.body;
//         if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
//           if (!isNullOrUndefined(res.response)) {
//             this.authService.login(res.response);
//             this.alertService.openSnackBar(Static.LoginSussfull, Static.Close, SnackBar.success);
//             this.router.navigate(['dashboard']);
//           }
//         }
//         this.spinner.hide();
//       },
//       error => {
//         this.alertService.openSnackBar(Static.LoginFailed, Static.Close, SnackBar.error);
//       });
// }


get formControls() { return this.userProfile.controls; }

}
