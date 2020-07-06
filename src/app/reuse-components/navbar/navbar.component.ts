import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { String } from 'typescript-string-operations';
import { ApiConfigService } from '../../services/api-config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../services/alert.service';
import { Static } from '../../enums/common/static';
import { SnackBar, StatusCodes } from '../../enums/common/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  openMenu = false;
  loginUser: any;
  showExpandButtons: any;
  @Input() set showExpandButton(val: string) {
    this.loginUser = JSON.parse(localStorage.getItem('user'));
    this.showExpandButtons = val;
  }

  constructor(
    public commonService: CommonService,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,

  ) { }

  ngOnInit() {
  }

  logout() {
    const logoutUrl = String.Join('/', this.apiConfigService.logoutUrl, this.loginUser.seqId);
    this.apiService.apiGetRequest(logoutUrl).subscribe(
      res => {
        this.alertService.openSnackBar(res.Response, Static.Close, SnackBar.success);
        this.authService.logout();
        localStorage.clear();
        this.router.navigateByUrl('/login');
        this.spinner.hide();
      });


  }

  openSetting() {
    this.router.navigateByUrl('/dashboard/setting');
  }

  openCloseMemu() {
    if(this.openMenu) {
      this.commonService.closeNav();
      this.openMenu = false;
    } else { 
      this.commonService.openNav();
      this.openMenu = true;
    }
  }
}
