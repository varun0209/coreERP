import { Injectable } from '@angular/core';
import { ApiConfigService } from '../../../services/api-config.service'
import { BrandModelComponent } from './brandmodel/brandmodel.component'
import { SizesComponent } from './sizes/sizes.component'
import { AccountingClassComponent } from './accountingclass/accountingclass.component'
import { BrandComponent } from './brand/brand.component'
import { NumberAssignmentComponent } from './numberassignment/numberassignment.component'
import { MaterialGroupsComponent } from './materialgroups/materialgroups.component'

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  dynamicData = { url: '', component: null, registerUrl: '', listName: '', updateUrl: '', primaryKey: '', deleteUrl: '' };

  constructor(
    private apiConfigService: ApiConfigService
  ) { }

  getRouteUrls(data)
  {
   // debugger;
    switch (data) {
      case 'brandmodel':
        this.dynamicData.url = this.apiConfigService.getBrandModelList;
        this.dynamicData.component = BrandModelComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerBrandModelList;
        this.dynamicData.updateUrl = this.apiConfigService.updateBrandModelList;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteBrandModelList;
        this.dynamicData.listName = 'brandModelList';
        this.dynamicData.primaryKey = 'code';
        return this.dynamicData;
        break;

      case 'sizes':
        this.dynamicData.url = this.apiConfigService.getSizesList;
        this.dynamicData.component = SizesComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerSizesList;
        this.dynamicData.updateUrl = this.apiConfigService.updateSizesList;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteSizesList;
        this.dynamicData.listName = 'sizesList';
        this.dynamicData.primaryKey = 'code';
        return this.dynamicData;
        break;
      case 'accountingclass':
        this.dynamicData.url = this.apiConfigService.getAccountingClassList;
        this.dynamicData.component = AccountingClassComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerAccountingClassList;
        this.dynamicData.updateUrl = this.apiConfigService.updateAccountingClassList;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteAccountingClassList;
        this.dynamicData.listName = 'AccountingClassList';
        this.dynamicData.primaryKey = 'code';
        return this.dynamicData;
        break;
      case 'brand':
        this.dynamicData.url = this.apiConfigService.getBrandList;
        this.dynamicData.component = BrandComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerBrandList;
        this.dynamicData.updateUrl = this.apiConfigService.updateBrandList;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteBrandList;
        this.dynamicData.listName = 'BrandList';
        this.dynamicData.primaryKey = 'code';
        return this.dynamicData;
        break;
      case 'numberassignment':
        this.dynamicData.url = this.apiConfigService.getNoAssignmentList;
        this.dynamicData.component = NumberAssignmentComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerNoAssignmentList;
        this.dynamicData.updateUrl = this.apiConfigService.updateNoAssignmentList;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteNoAssignmentList;
        this.dynamicData.listName = 'NoAssignmentList';
        this.dynamicData.primaryKey = 'code';
        return this.dynamicData;
        break;
      case 'materialgroups':
        this.dynamicData.url = this.apiConfigService.getMaterialGroupsList;
        this.dynamicData.component = MaterialGroupsComponent;
        this.dynamicData.registerUrl = this.apiConfigService.registerMaterialGroupsList;
        this.dynamicData.updateUrl = this.apiConfigService.updateMaterialGroupsList;
        this.dynamicData.deleteUrl = this.apiConfigService.deleteMaterialGroupsList;
        this.dynamicData.listName = 'materialGroupList';
        this.dynamicData.primaryKey = 'code';
        return this.dynamicData;
        break;

      default:
    }
  }

}


