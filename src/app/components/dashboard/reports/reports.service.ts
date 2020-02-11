import { Injectable } from '@angular/core';
import { ApiConfigService } from '../../../services/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  dynamicData = { url: '', component: null, registerUrl: '', listName: '', updateUrl: '' , primaryKey: '', deleteUrl: ''};


  constructor(
    private apiConfigService: ApiConfigService
  ) { }

  
  getRouteUrls(data) {
    switch (data) {
     case 'bonus':
      this.dynamicData.url = this.apiConfigService.getCompanysList;
      this.dynamicData.listName = 'companiesList';
      return this.dynamicData;
      break;
     default:
    }
   }


}
