import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { isNullOrUndefined } from 'util';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';
import { StatusCodes } from '../enums/common/common';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  appDrawer: any;
  parentItem: any;
  currentUrl = new BehaviorSubject<string>(undefined);
  selectedInput: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  showNavbar = new BehaviorSubject<boolean>(null);

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    public translate: TranslateService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  getLangConfig(): any {
    this.http.get('../../assets/app-lang-config.json').subscribe(
      data => {
        const langConfig = data;
        localStorage.setItem('langConfig', JSON.stringify(langConfig));
        this.languageConfig();
      },
      (error: HttpErrorResponse) => {
        // this.toastr.error("Failed to load language config data");
      }
    );
  }

  languageConfig() {
    const languageConfiguration: any = JSON.parse(localStorage.getItem('langConfig'));
    if (!isNullOrUndefined(languageConfiguration)) {
      this.translate.addLangs(languageConfiguration.langagues);
      this.translate.setDefaultLang('english');
      if (localStorage.getItem('defaultLang')) {
        this.translate.use(localStorage.getItem('defaultLang'));
      } else {
        const browserLang = this.translate.getBrowserLang();
        const defaultLang = browserLang.match(/english|telugu|hindi/) ? browserLang : 'english';
        localStorage.setItem('defaultLang', defaultLang);
        this.translate.use(localStorage.getItem('defaultLang'));
      }
    }

  }


  formatDate(event) {
    var time = new Date();
    var date = new Date(event),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2),
      hours = ("0" + time.getHours()).slice(-2),
      minutes = ("0" + time.getMinutes()).slice(-2),
      seconds = ("0" + time.getSeconds()).slice(-2);
    return `${[day, mnth, date.getFullYear()].join("/")} ${[seconds, minutes, hours].join(":")}`
  }


  apiCall(url, callback) {
    this.showSpinner();
    this.apiService.apiGetRequest(url)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              callback(res.response);
            }
          }
          this.hideSpinner();
        });
  }


  public closeNav() {
    if (!isNullOrUndefined(this.appDrawer)) {
      this.appDrawer.close();
    }
  }

  public openNav() {
    if (!isNullOrUndefined(this.appDrawer)) {
      this.appDrawer.open();
    }
  }

  showSpinner() {
    setTimeout(() => this.spinner.show());
  }

  hideSpinner() {
    setTimeout(() => this.spinner.hide());
  }
}
