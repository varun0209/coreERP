import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    localStorage.clear();
    this.router.navigateByUrl('/login');
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
