import { Injectable } from '@angular/core';
import { ApiConfigService } from '../../../services/api-config.service';
import { LeaveopeningbalancesComponent } from './leaveopeningbalances/leaveopeningbalances.component';
import { LeavetypesComponent } from './leavetypes/leavetypes.component';
import { LeaveRequestComponent } from './leaverequest/leaverequest.component';
import { PTMasterComponent } from './ptmaster/ptmaster.component';
import { StructureCreationComponent } from './structure-creation/structure-creation.component';
import { ComponentMasterComponent } from './componentmaster/componentmaster.component';
import { LeaveApprovalComponent } from './leaveapproval/leaveapproval.component';
import { PFMasterComponent} from './pfmaster/pfmaster.component';
import { CTCBreakupComponent} from './ctcbreakup/ctcbreakup.component';
import { SalaryProcessComponent} from './salaryproces/salaryprocess.component';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  dynamicData = { url: '', component: null, registerUrl: '', listName: '', updateUrl: '', primaryKey: '', deleteUrl: '', coustom: true };


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
        this.dynamicData.listName = 'lopList';
        this.dynamicData.primaryKey = 'empCode';
        this.dynamicData.coustom = true;
        return this.dynamicData;
        break;
      case 'leavetype':
        this.dynamicData.url = this.apiConfigService.getLeaveTypesList;
        this.dynamicData.component = LeavetypesComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerLeaveTypes;
        this.dynamicData.updateUrl = this.apiConfigService.updateLeaveTypes;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteLeaveTypes;
        this.dynamicData.listName = 'leavetypeList';
        this.dynamicData.primaryKey = 'leaveCode';
        this.dynamicData.coustom = true;
        return this.dynamicData;
        break;
      case 'Leaverequest':
        this.dynamicData.url = this.apiConfigService.getLeaveRequestList;
        this.dynamicData.component = LeaveRequestComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerLeaveRequests;
        //this.dynamicData.updateUrl = this.apiConfigService.updateLeaveTypes;
        //this.dynamicData.deleteUrl = this.apiConfigService.deleteLeaveTypes;
        this.dynamicData.listName = 'LeaveApplDetailsList';
        this.dynamicData.primaryKey = 'code';
        this.dynamicData.coustom = true;
        return this.dynamicData;
        break;
      case 'ptmaster':
        this.dynamicData.url = this.apiConfigService.getPTList;
        this.dynamicData.component = PTMasterComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerPT;
        this.dynamicData.updateUrl = this.apiConfigService.updatePT;
        this.dynamicData.deleteUrl = this.apiConfigService.deletePT;
        this.dynamicData.listName = 'ptList';
        this.dynamicData.primaryKey = 'id';
        this.dynamicData.coustom = true;
        return this.dynamicData;
        break;
      case 'componentmaster':
        this.dynamicData.url = this.apiConfigService.getComponentsList;
        this.dynamicData.component = ComponentMasterComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerComponent;
        this.dynamicData.updateUrl = this.apiConfigService.updateComponent;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteComponent;
        this.dynamicData.listName = 'componentsList';
        this.dynamicData.primaryKey = 'componentCode';
        this.dynamicData.coustom = true;
        return this.dynamicData;
        break;
      case 'structureCreation':
        this.dynamicData.url = this.apiConfigService.getStructuresList;
        this.dynamicData.component = StructureCreationComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerStructure;
        this.dynamicData.updateUrl = this.apiConfigService.updateStructure;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteStructure;
        this.dynamicData.listName = 'structuresList';
        this.dynamicData.primaryKey = 'structureCode';
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
        case 'pfmaster':
          this.dynamicData.url = this.apiConfigService.getPfList;
          this.dynamicData.component = PFMasterComponent;
          this.dynamicData.registerUrl = this.apiConfigService.registerPF;
          this.dynamicData.updateUrl = this.apiConfigService.updatePF;
          this.dynamicData.deleteUrl = this.apiConfigService.deletePF;
          this.dynamicData.listName = 'pfList';
          this.dynamicData.primaryKey = 'id';
          this.dynamicData.coustom = true;
          return this.dynamicData;
          break;
          case 'CTCBreakup':
        this.dynamicData.url = this.apiConfigService.getCTCList;
        this.dynamicData.component = CTCBreakupComponent;
        this.dynamicData.listName = 'structuresList';
        this.dynamicData.primaryKey = 'structureCode';
        this.dynamicData.coustom = false;
        return this.dynamicData;
        case 'salaryprocess':
          this.dynamicData.url = this.apiConfigService.getCTCList;
          this.dynamicData.component = SalaryProcessComponent;
          this.dynamicData.listName = 'structuresList';
          this.dynamicData.primaryKey = 'structureCode';
          this.dynamicData.coustom = false;
          return this.dynamicData;
      default:
    }
  }

}
