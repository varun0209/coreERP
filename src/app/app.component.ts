import { Component } from '@angular/core';
import { CommonService } from './services/common.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private commonService: CommonService) {
    this.commonService.getLangConfig();
  }
 }
