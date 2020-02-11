import { Injectable } from '@angular/core';
import { Observable, of  } from 'rxjs';

import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { StatusCodes } from '../enums/common/common';
import { AlertService } from './alert.service';
import { SnackBar } from '../enums/common/common';
import { Static } from '../enums/common/static';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public options;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,

    ) {
      this.options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    }


  // get API requests
  public apiGetRequest(url: any): Observable<any> {
    return this.http.get(url, { headers: this.options, observe: 'response' })
      .pipe((tap<any>(response => {
        console.log(response.body);
        if (!isNullOrUndefined(response) && response.status === StatusCodes.fail) {
          return;
        }
        return response.body;
      })),
        catchError(this.handleError('apiGetRequest')));
  }

  // Post API request
  public apiPostRequest(url: any, obj?: any): Observable<any> {
    return this.http.post(url, obj, { headers: this.options, observe: 'response' })
      .pipe((tap<any>(res => {
        if (!isNullOrUndefined(res.body) && res.body.status === StatusCodes.fail) {
          this.alertService.openSnackBar(res.body.response, Static.Close, SnackBar.error);
          return;
        }
        return res.body;
      })),
        catchError(this.handleError('apiPostRequest')));
  }

  // Delete API request
  public apiDeleteRequest(url: any, obj?: any): Observable<any> {
    return this.http.delete(url, { headers: this.options, observe: 'response' })
      .pipe((tap<any>(res => {
        if (!isNullOrUndefined(res) && res.body.status === StatusCodes.fail) {
          this.alertService.openSnackBar(res.body.response, Static.Close, SnackBar.error);
          return;
        }
        return res;
      })),
        catchError(this.handleError('apiPostRequest')));
  }

  // Update API request
  public apiUpdateRequest(url: any, obj?: any): Observable<any> {
    return this.http.put(url, obj , { headers: this.options, observe: 'response' })
      .pipe((tap<any>(res => {
        if (!isNullOrUndefined(res) && res.body.status === StatusCodes.fail) {
          this.alertService.openSnackBar(res.body.response, Static.Close, SnackBar.error);
          return;
        }
        return res;
      })),
        catchError(this.handleError('apiPostRequest')));
  }

   // API error handling
   private handleError(operation: string) {
    return (err: HttpErrorResponse) => {
      const errMsg = `error in ${operation}()  status: ${err.status}, ${err.statusText || ''}, ${err} `;
      if (err instanceof HttpErrorResponse) {
        console.log(`status: ${err.status}, ${err.statusText}, ${errMsg}`);
        this.alertService.openSnackBar(`${err.statusText}`, Static.Close, SnackBar.error);
      }
      // tslint:disable-next-line: deprecation
      return of(err);
    };
  }

}
