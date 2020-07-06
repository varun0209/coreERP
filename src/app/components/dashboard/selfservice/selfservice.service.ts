import { Injectable } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiConfigService } from '../../../services/api-config.service';
import { LeavetypeComponent } from './leavetype/leavetype.component';
import { LeaveopeningbalanceComponent } from './leaveopeningbalance/leaveopeningbalance.component';
import { LeaveRequestComponent } from './leaverequest/leaverequest.component';
import { LeaveApprovalComponent } from './leaveapproval/leaveapproval.component';
import { ApplyodComponent } from './applyod/applyod.component';


@Injectable({
  providedIn: 'root'
})
export class selfService {
  dynamicData = { url: '', component: null, registerUrl: '', listName: '', updateUrl: '', primaryKey: '', deleteUrl: '', coustom: true };
    apiService: any;


  constructor(
    private apiConfigService: ApiConfigService
  ) { }

  getRouteUrls(data) {
    //debugger;
    //alert("hi");
    const user = JSON.parse(localStorage.getItem('user'));
    switch (data) {
      case 'leaveopeningbalance':
        
        this.dynamicData.url = this.apiConfigService.getLeaveopeningbalanceList;
        this.dynamicData.component = LeaveopeningbalanceComponent;
        this.dynamicData.registerUrl = String.Join('/', this.apiConfigService.registerLeaveopeningbalance, user.userName, user.companyCode ? user.companyCode : "0");
        this.dynamicData.updateUrl = String.Join('/', this.apiConfigService.updateLeaveopeningbalance, user.userName, user.companyCode ? user.companyCode : "0");
        //this.dynamicData.registerUrl = this.apiConfigService.registerLeaveopeningbalance;
        //this.dynamicData.updateUrl = this.apiConfigService.updateLeaveopeningbalance;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteLeaveopeningbalance;
        this.dynamicData.listName = 'lopList';
        this.dynamicData.primaryKey = 'empCode';
        this.dynamicData.coustom = true;
        return this.dynamicData;
        break;
      case 'Leaverequest':
        this.dynamicData.url = String.Join('/', this.apiConfigService.getLeaveRequestList,user.userName);
        this.dynamicData.component = LeaveRequestComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerLeaveRequests;
        this.dynamicData.updateUrl = this.apiConfigService.updateLeaveRequests;
        //this.dynamicData.deleteUrl = this.apiConfigService.deleteLeaveTypes;
        this.dynamicData.listName = 'LeaveApplDetailsList';
        this.dynamicData.primaryKey = 'empCode';
        this.dynamicData.coustom = true;
        return this.dynamicData;
        break;
      case 'applyod':
        this.dynamicData.url = String.Join('/', this.apiConfigService.applyodRequestList, user.userName);
        this.dynamicData.component = ApplyodComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerodRequest;
        this.dynamicData.updateUrl = this.apiConfigService.updateapplyodRequest;
        //this.dynamicData.deleteUrl = this.apiConfigService.deleteLeaveTypes;
        this.dynamicData.listName = 'ApplyodDetailsList';
        this.dynamicData.primaryKey = 'empCode';
        this.dynamicData.coustom = true;
        return this.dynamicData;
        break;
      case 'leaveApproval':
        this.dynamicData.url = this.apiConfigService.getStructuresList;
        this.dynamicData.component = LeaveApprovalComponent;
        // this.dynamicData.registerUrl = this.apiConfigService.registerStructure;
        // this.dynamicData.updateUrl = this.apiConfigService.updateStructure;
        // this.dynamicData.deleteUrl = this.apiConfigService.deleteStructure;
        this.dynamicData.listName = 'structuresList';
        this.dynamicData.primaryKey = 'structureCode';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'leavetype':
        this.dynamicData.url = this.apiConfigService.getLeaveTypeatLists;
        this.dynamicData.component = LeavetypeComponent;
        this.dynamicData.registerUrl = String.Join('/', this.apiConfigService.registerLeaveTypes, user.companyCode ? user.companyCode : "0");
        this.dynamicData.updateUrl = String.Join('/', this.apiConfigService.updateLeaveTypes, user.companyCode ? user.companyCode : "0");
        //this.dynamicData.updateUrl = this.apiConfigService.updateLeaveTypes;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteLeaveTypes;
        this.dynamicData.listName = 'leavetypeList';
        this.dynamicData.primaryKey = 'id';
        this.dynamicData.coustom = true;
        
        return this.dynamicData;
        break;
      default:
    }
  }

}
