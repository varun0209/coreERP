import { Injectable } from '@angular/core';
import { ApiConfigService } from '../../../services/api-config.service';
import { CompanyComponent } from './company/company.component';
import { BranchesComponent } from './branches/branches.component';
import { DivisionComponent } from './division/division.component';
import { SegmentComponent } from './segment/segment.component';
import { ProfitCenterComponent } from './profit-center/profit-center.component';
import { PartnerCreationComponent } from './partner-creation/partner-creation.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { NoSeriesComponent } from './no-series/no-series.component';
import { PartnerTypeComponent } from './partner-type/partner-type.component';
import { EmployeeInBranchComponent } from './employee-in-branch/employee-in-branch.component';
import { EmployeeComponent } from './employee/employee.component';
import { TaxMasterComponent } from './tax-master/tax-master.component';
import { UnitComponent } from './unit/unit.component';
import { TanksComponent } from './tank/tank.componet';
import { PumpComponent } from './pump/pump.component';
import { ProductpackingComponent } from './productpacking/productpacking.component';
import { TaxgroupsComponent } from './taxgroup/taxgroup.component';
import { TaxstructuresComponent } from './taxstructure/taxstructure.component';
@Injectable({
  providedIn: 'root'
})
export class MastersService {
  dynamicData = { url: '', component: null, registerUrl: '', listName: '', updateUrl: '' , primaryKey: '', deleteUrl: ''};


  constructor(
    private apiConfigService: ApiConfigService
  ) { }

  getRouteUrls(data) {
    //debugger;
    switch (data) {
     case 'company':
      this.dynamicData.url = this.apiConfigService.getCompanysList;
      this.dynamicData.component = CompanyComponent;
      this.dynamicData.registerUrl = this.apiConfigService.registerCompany;
      this.dynamicData.updateUrl = this.apiConfigService.updateCompany;
      this.dynamicData.deleteUrl = this.apiConfigService.deleteCompany;
      this.dynamicData.listName = 'companiesList';
      this.dynamicData.primaryKey = 'companyCode';
      return this.dynamicData;
      break;
     case 'branches':
      this.dynamicData.url = this.apiConfigService.getBranchesList;
      this.dynamicData.component = BranchesComponent;
      this.dynamicData.registerUrl = this.apiConfigService.registerBranch;
      this.dynamicData.updateUrl = this.apiConfigService.updateBranch;
      this.dynamicData.deleteUrl = this.apiConfigService.deleteBranches;
      this.dynamicData.listName = 'branchesList';
        this.dynamicData.primaryKey = 'branchCode';
      return this.dynamicData;
      break;
     case 'division':
      this.dynamicData.url = this.apiConfigService.getDivisionsList;
      this.dynamicData.component = DivisionComponent;
      this.dynamicData.registerUrl = this.apiConfigService.registerDivision;
      this.dynamicData.updateUrl = this.apiConfigService.updateDivision;
      this.dynamicData.deleteUrl = this.apiConfigService.deleteDivision;
      this.dynamicData.listName = 'divisionsList';
      this.dynamicData.primaryKey = 'code';
      return this.dynamicData;
      break;
     case 'segment':
      this.dynamicData.url = this.apiConfigService.getSegmentList;
      this.dynamicData.component = SegmentComponent;
      this.dynamicData.registerUrl = this.apiConfigService.registerSegment;
      this.dynamicData.updateUrl = this.apiConfigService.updateSegment;
      this.dynamicData.deleteUrl = this.apiConfigService.deleteSegment;
      this.dynamicData.listName = 'segmentList';
      this.dynamicData.primaryKey = 'seqId';
      return this.dynamicData;
      break;
     case 'profitCenter':
      this.dynamicData.url = this.apiConfigService.getProfitCenterList;
      this.dynamicData.component = ProfitCenterComponent;
      this.dynamicData.registerUrl = this.apiConfigService.registerProfitCenters;
      this.dynamicData.updateUrl = this.apiConfigService.updateProfitCenters;
      this.dynamicData.deleteUrl = this.apiConfigService.deleteProfitCenters;
      this.dynamicData.listName = 'profitCenterList';
        this.dynamicData.primaryKey = 'seqId';
      return this.dynamicData;
      break;
     case 'partnerCreation':
      this.dynamicData.url = this.apiConfigService.getPartnerCreationList;
      this.dynamicData.component = PartnerCreationComponent;
      this.dynamicData.registerUrl = this.apiConfigService.registerPartnerCreation;
      this.dynamicData.updateUrl = this.apiConfigService.updatePartnerCreation;
      this.dynamicData.deleteUrl = this.apiConfigService.deletePartnerCreation;
      this.dynamicData.listName = 'partnerCreationList';
      this.dynamicData.primaryKey = 'code';
      return this.dynamicData;
      break;
     case 'costCenter':
      this.dynamicData.url = this.apiConfigService.GetCostCenterList;
      this.dynamicData.component = CostCenterComponent;
      this.dynamicData.registerUrl = this.apiConfigService.registerCostCenter;
      this.dynamicData.updateUrl = this.apiConfigService.updateCostCenter;
      this.dynamicData.deleteUrl = this.apiConfigService.deleteCostCenter;
        this.dynamicData.listName = 'costcenterList';
      this.dynamicData.primaryKey = 'code';
      return this.dynamicData;
      break;
     case 'noSeries':
      this.dynamicData.url = this.apiConfigService.getNoSeriesList;
      this.dynamicData.component = NoSeriesComponent;
      this.dynamicData.registerUrl = this.apiConfigService.registerNoSeries;
      this.dynamicData.updateUrl = this.apiConfigService.updateNoSeries;
      this.dynamicData.deleteUrl = this.apiConfigService.deleteNoSeries;
      this.dynamicData.listName = 'noSeriesList';
      this.dynamicData.primaryKey = 'code';
      return this.dynamicData;
      break;
     case 'partnerType':
      this.dynamicData.url = this.apiConfigService.getPartnerTypesList;
      this.dynamicData.component = PartnerTypeComponent;
      this.dynamicData.registerUrl = this.apiConfigService.registerPartnerType;
      this.dynamicData.updateUrl = this.apiConfigService.updatePartnerType;
      this.dynamicData.deleteUrl = this.apiConfigService.deletePartnerType;
      this.dynamicData.listName = 'partnerTypeList';
      this.dynamicData.primaryKey = 'code';
      return this.dynamicData;
      break;
     case 'employeeInBranch':
      this.dynamicData.url = this.apiConfigService.getAllEmployeesInBranch;
      this.dynamicData.component = EmployeeInBranchComponent;
      this.dynamicData.registerUrl = this.apiConfigService.registerEmployeeInBranch;
      this.dynamicData.updateUrl = this.apiConfigService.updateEmployeeInBranch;
      this.dynamicData.deleteUrl = this.apiConfigService.deleteEmployeeInBranch;
        this.dynamicData.listName = 'employeesList';
      this.dynamicData.primaryKey = 'code';
      return this.dynamicData;
      break;
     case 'employee':
      this.dynamicData.url = this.apiConfigService.getEmployeeList;
      this.dynamicData.component = EmployeeComponent;
      this.dynamicData.registerUrl = this.apiConfigService.registerEmployee;
      this.dynamicData.updateUrl = this.apiConfigService.updateEmployee;
      this.dynamicData.deleteUrl = this.apiConfigService.deleteEmployee;
      this.dynamicData.listName = 'employeesList';
      this.dynamicData.primaryKey = 'code';
      return this.dynamicData;
      break;
     case 'taxMaster':
      this.dynamicData.url = this.apiConfigService.getTaxmastersList;
      this.dynamicData.component = TaxMasterComponent;
      this.dynamicData.registerUrl = this.apiConfigService.registerTaxMasters;
      this.dynamicData.updateUrl = this.apiConfigService.updateTaxMaster;
      this.dynamicData.deleteUrl = this.apiConfigService.deleteTaxMaster;
      this.dynamicData.listName = 'TaxmasterList';
      this.dynamicData.primaryKey = 'code';
      return this.dynamicData;
        break;
      case 'unit':
        this.dynamicData.url = this.apiConfigService.getunitList;
        this.dynamicData.component = UnitComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerunit;
        this.dynamicData.updateUrl = this.apiConfigService.updateunit;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteunit;
        this.dynamicData.listName = 'unitList';
        this.dynamicData.primaryKey = 'unitId';
        return this.dynamicData;
        break;
      case 'tank':
        this.dynamicData.url = this.apiConfigService.gettankList;
        this.dynamicData.component = TanksComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registertank;
        this.dynamicData.updateUrl = this.apiConfigService.updatetank;
        this.dynamicData.deleteUrl = this.apiConfigService.deletetank;
        this.dynamicData.listName = 'tankList';
        this.dynamicData.primaryKey = 'tankId';
        return this.dynamicData;
        break;
      case 'pump':
        this.dynamicData.url = this.apiConfigService.getpumpList;
        this.dynamicData.component = PumpComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerpump;
        this.dynamicData.updateUrl = this.apiConfigService.updatepump;
        this.dynamicData.deleteUrl = this.apiConfigService.deletepump;
        this.dynamicData.listName = 'pumplist';
        this.dynamicData.primaryKey = 'pumpId';
        return this.dynamicData;
        break;
      case 'productpacking':
        this.dynamicData.url = this.apiConfigService.getproductpackingList;
        this.dynamicData.component = ProductpackingComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerproductpacking;
        this.dynamicData.updateUrl = this.apiConfigService.updateproductpacking;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteproductpacking;
        this.dynamicData.listName = 'ProductpackingList';
        this.dynamicData.primaryKey = 'packingId';
        return this.dynamicData;
        break;
      case 'taxgroup':
        this.dynamicData.url = this.apiConfigService.getTaxGroupList;
        this.dynamicData.component = TaxgroupsComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerTaxGroup;
        this.dynamicData.updateUrl = this.apiConfigService.updateTaxGroup;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteTaxGroup;
        this.dynamicData.listName = 'TaxgroupList';
        this.dynamicData.primaryKey = 'taxGroupId';
        return this.dynamicData;
        break;
      case 'taxstructure':
        this.dynamicData.url = this.apiConfigService.getTaxStructureList;
        this.dynamicData.component = TaxstructuresComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerTaxStructure;
        this.dynamicData.updateUrl = this.apiConfigService.updateTaxStructure;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteTaxStructure;
        this.dynamicData.listName = 'TaxStructureList';
        this.dynamicData.primaryKey = 'taxStructureId';
        return this.dynamicData;
        break;
     default:
    }
   }

}
