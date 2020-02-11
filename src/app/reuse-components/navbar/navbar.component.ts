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
  @Input() showExpandButton = true;
  @Input() showInfoIcon = false;
  loginUser: any;

  constructor(
    public commonService: CommonService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.authService.logout();
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
