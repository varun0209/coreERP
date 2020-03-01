import { Component, Inject, AfterViewInit } from '@angular/core';
import { CommonService } from './services/common.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  showNavbar : any;

  constructor(
    private commonService: CommonService,
    ) {
    this.commonService.getLangConfig();
    commonService.showNavbar.subscribe(res => {
      this.showNavbar = res;
      console.log(this.showNavbar)
    })

  }

  ngAfterViewInit() {
    // console.log(this.activatedRoute)
    // this.activatedRoute._routerState
  }

 }
