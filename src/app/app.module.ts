import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedImportModule } from './shared/shared-import';

import { NavbarComponent , TableComponent, DeleteItemComponent, ReportTableComponent, TableNewComponent, NormalTableComponent, BillingTableComponent } from './reuse-components/index';
import { CompanyComponent , MastersComponent, BranchesComponent, DivisionComponent, SegmentComponent, ProfitCenterComponent,PartnerCreationComponent, CostCenterComponent, NoSeriesComponent, PartnerTypeComponent,EmployeeInBranchComponent ,EmployeeComponent, TaxMasterComponent } from './components/dashboard/masters/index';
import { SalesComponent, CardTypeComponent, BillingComponent } from './components/dashboard/sales/index';
import {GeneralledgerComponent,AccountsGroupComponent,SubGroupComponent,UndersubGroupComponent,GlAccountsComponent,GlSubcodeComponent,TaxIntegrationComponent,
CashAccToBranchesComponent,AccToAccClassComponent,VoucherTypesComponent} from './components/dashboard/generalledger/index';
import { ReportsComponent } from './components/dashboard/reports/index';
import { LoginComponent, NotFoundComponent, SidebarComponent, DashboardComponent, SettingComponent } from './components/index';

import { InventoryComponent, BrandModelComponent, SizesComponent, AccountingClassComponent, BrandComponent, NumberAssignmentComponent, MaterialGroupsComponent } from './components/dashboard/Inventory/index';

import { PayrollComponent, LeaveopeningbalancesComponent, LeavetypesComponent, LeaverequestComponent } from './components/dashboard/payroll/index';

import { RuntimeConfigService } from './services/runtime-config.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { FocusOnEnterDirective } from './directives/focus-on-enter.directive';

import { BsDropdownModule } from 'ngx-bootstrap';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    NotFoundComponent,
    SidebarComponent,
    MastersComponent,
    CompanyComponent,
    TableComponent,
    DeleteItemComponent,
    DashboardComponent,
    FocusOnEnterDirective,
    TableNewComponent,
    BranchesComponent,
    DivisionComponent,
    SalesComponent,
    SegmentComponent,
    ProfitCenterComponent,
    PartnerCreationComponent,
    CostCenterComponent,
    NoSeriesComponent,
    PartnerTypeComponent,
    EmployeeInBranchComponent,
    EmployeeComponent,
    TaxMasterComponent,
    CardTypeComponent,
    GeneralledgerComponent,
    AccountsGroupComponent,
    SubGroupComponent,
    UndersubGroupComponent,
    GlAccountsComponent,
    SettingComponent,
    ReportsComponent,
    ReportTableComponent,
    GlSubcodeComponent,
    TaxIntegrationComponent,
    CashAccToBranchesComponent,
    AccToAccClassComponent,
    VoucherTypesComponent,
    InventoryComponent,
    BrandModelComponent, SizesComponent, AccountingClassComponent, BrandComponent, NumberAssignmentComponent, MaterialGroupsComponent,
    PayrollComponent, LeaveopeningbalancesComponent, LeavetypesComponent, LeaverequestComponent, BillingComponent, NormalTableComponent, BillingTableComponent
  ],
  imports: [
    AppRoutingModule,
    SharedImportModule,
    BsDropdownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    RuntimeConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (environment: RuntimeConfigService) => () => environment.loadRuntimeConfig(),
      multi: true,
      deps: [RuntimeConfigService, HttpClientModule]
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ DeleteItemComponent, CompanyComponent, BranchesComponent,DivisionComponent, SegmentComponent,ProfitCenterComponent, PartnerCreationComponent, CostCenterComponent, NoSeriesComponent, PartnerTypeComponent, EmployeeInBranchComponent , EmployeeComponent,
    TaxMasterComponent, CardTypeComponent, AccountsGroupComponent, SubGroupComponent, UndersubGroupComponent, GlAccountsComponent, GlSubcodeComponent, TaxIntegrationComponent, CashAccToBranchesComponent, AccToAccClassComponent, VoucherTypesComponent, BrandModelComponent, SizesComponent, AccountingClassComponent, BrandComponent, NumberAssignmentComponent, MaterialGroupsComponent, LeaveopeningbalancesComponent, LeavetypesComponent
  ,LeaverequestComponent]
})
export class AppModule { }
