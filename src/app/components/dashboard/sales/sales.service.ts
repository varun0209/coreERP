import { Injectable } from '@angular/core';
import { ApiConfigService } from '../../../services/api-config.service';
import { CardTypeComponent } from '../sales/card-type/card-type.component';
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  dynamicData = { url: '', component: null, registerUrl: '', listName: '', updateUrl: '' , primaryKey: '', deleteUrl: '', coustom: true};

  constructor(
    private apiConfigService: ApiConfigService

  ) { }

  getRouteUrls(data) {
    switch (data) {
     case 'cardType':
      this.dynamicData.url = this.apiConfigService.getcardtypeList;
      this.dynamicData.component = CardTypeComponent;
      this.dynamicData.registerUrl = this.apiConfigService.registerCardType;
      this.dynamicData.updateUrl = this.apiConfigService.updateCardType;
      this.dynamicData.deleteUrl = this.apiConfigService.deleteCardType;
      this.dynamicData.listName = 'cardtype';
      this.dynamicData.primaryKey = 'code';
      return this.dynamicData;
      break;
      case 'billing':
        this.dynamicData.coustom = false;
        return this.dynamicData;
        break;
     default:
    }
   }
}
