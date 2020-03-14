import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RuntimeSettings } from '../models/common/RuntimeSettings';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class RuntimeConfigService {
  runtimeConfig: any = null;

  constructor(private injector: Injector, private httpClient: HttpClient) { }

  public loadRuntimeConfig(): Promise<any> {
    return this.httpClient.get(`../../assets/settings/runtime-config.json`)
      .pipe(tap((res) => this.runtimeConfig = res)).toPromise();
  }


}
