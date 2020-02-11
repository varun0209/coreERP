import { Injectable } from '@angular/core';
import { ApiConfigService } from '../../../services/api-config.service';
import { LeaveopeningbalancesComponent } from './leaveopeningbalances/leaveopeningbalances.component';
import { LeavetypesComponent } from './leavetypes/leavetypes.component';
import { LeaverequestComponent } from './leaverequest/leaverequest.component';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  dynamicData = { url: '', component: null, registerUrl: '', listName: '', updateUrl: '', primaryKey: '', deleteUrl: '' };


  constructor(
    private apiConfigService: ApiConfigService
  ) { }

  getRouteUrls(data) {
    //debugger;
    switch (data) {
      case 'leaveopeningbalances':
        this.dynamicData.url = this.apiConfigService.getLeaveopeningbalanceList;
        this.dynamicData.component = LeaveopeningbalancesComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerLeaveopeningbalance;
        this.dynamicData.updateUrl = this.apiConfigService.updateLeaveopeningbalance;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteLeaveopeningbalance;
        this.dynamicData.listName = 'companiesList';
        this.dynamicData.primaryKey = 'companyCode';
        return this.dynamicData;
        break;
      case 'leavetype':
        this.dynamicData.url = this.apiConfigService.getLeaveTypesList;
        this.dynamicData.component = LeavetypesComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerLeaveTypes;
        this.dynamicData.updateUrl = this.apiConfigService.updateLeaveTypes;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteLeaveTypes;
        this.dynamicData.listName = 'branchesList';
        this.dynamicData.primaryKey = 'branchCode';
        return this.dynamicData;
        break;
      case 'Leaverequest':
        this.dynamicData.url = this.apiConfigService.getLeaveTypesList;
        this.dynamicData.component = LeaverequestComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerLeaveTypes;
        //this.dynamicData.updateUrl = this.apiConfigService.updateLeaveTypes;
        //this.dynamicData.deleteUrl = this.apiConfigService.deleteLeaveTypes;
        //this.dynamicData.listName = 'branchesList';
        // this.dynamicData.primaryKey = 'branchCode';
        return this.dynamicData;
        break;
     
      default:
    }
  }

}
