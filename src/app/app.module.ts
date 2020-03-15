import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedImportModule } from './shared/shared-import';

import { NavbarComponent, TableComponent, DeleteItemComponent } from './reuse-components/index';
import {
  DashboardComponent, LoginComponent, SidebarComponent, NotFoundComponent
} from './components/index';
import {
  GeneralledgerComponent, AccountsGroupComponent,
  SubGroupComponent, UndersubGroupComponent,
  GlAccountsComponent, GlSubcodeComponent, TaxIntegrationComponent, CashAccToBranchesComponent,
  AccToAccClassComponent, VoucherTypesComponent
} from './components/dashboard/generalledger/index';
import {
  InventoryComponent, BrandModelComponent, SizesComponent, AccountingClassComponent,
  BrandComponent, NumberAssignmentComponent, MaterialGroupsComponent
}
  from './components/dashboard/Inventory/index';

import {
  CompanyComponent, MastersComponent, BranchesComponent, DivisionComponent,
  SegmentComponent, ProfitCenterComponent, PartnerCreationComponent, CostCenterComponent,
  NoSeriesComponent, PartnerTypeComponent, EmployeeInBranchComponent, EmployeeComponent,
  TaxMasterComponent, UnitComponent, TanksComponent, PumpComponent, ProductpackingComponent,
  TaxgroupsComponent, TaxstructuresComponent
} from './components/dashboard/masters/index';

import {
  PayrollComponent, LeaveopeningbalancesComponent, LeavetypesComponent,
  LeaveRequestComponent, PTMasterComponent, ComponentMasterComponent,
  StructureCreationComponent, LeaveApprovalComponent,
  PFMasterComponent, CTCBreakupComponent, SalaryProcessComponent
} from './components/dashboard/payroll/index';

import {
  SalesComponent, SalesInvoiceComponent, SalesReturnComponent,StocktransferComponent , SalesReturnViewComponent, CreateBillComponent, CreateStockTransferComponent, PurchaseComponent, PurchaseCreateComponent
} from './components/dashboard/sales/index';

import {
  TransactionsComponent, CashPaymentComponent, CreateCashpaymentComponent, CashReceiptComponent,
  CreateCashreceiptComponent, BankPaymentComponent, CreateBankpaymentComponent
} from './components/dashboard/transactions/index';

import {
  RolesprevilagesComponent,  SettingsComponent
} from './components/dashboard/settings/index';

import { RuntimeConfigService } from './services/runtime-config.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FocusOnEnterDirective } from './directives/focus-on-enter.directive';

import { BsDropdownModule, TypeaheadModule } from 'ngx-bootstrap';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { PurchaseReturnComponent } from './components/dashboard/sales/purchase-return/purchase-return.component';
import { PurchaseReturnViewComponent } from './components/dashboard/sales/purchase-return/purchase-return-view/purchase-return-view.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FocusOnEnterDirective,
    DashboardComponent,
    LoginComponent,
    SidebarComponent,
    NotFoundComponent,
    TableComponent, DeleteItemComponent,
    GeneralledgerComponent, AccountsGroupComponent,
    SubGroupComponent, UndersubGroupComponent,
    GlAccountsComponent, GlSubcodeComponent, TaxIntegrationComponent, CashAccToBranchesComponent,
    AccToAccClassComponent, VoucherTypesComponent,
    InventoryComponent, BrandModelComponent, SizesComponent, AccountingClassComponent,
    BrandComponent, NumberAssignmentComponent, MaterialGroupsComponent,
    CompanyComponent, MastersComponent, BranchesComponent, DivisionComponent,
    SegmentComponent, ProfitCenterComponent, PartnerCreationComponent, CostCenterComponent,
    NoSeriesComponent, PartnerTypeComponent, EmployeeInBranchComponent, EmployeeComponent,
    TaxMasterComponent, UnitComponent, TanksComponent, PumpComponent, ProductpackingComponent,
    TaxgroupsComponent, TaxstructuresComponent,
    PayrollComponent, LeaveopeningbalancesComponent, LeavetypesComponent,
    LeaveRequestComponent, PTMasterComponent, ComponentMasterComponent,
    StructureCreationComponent, LeaveApprovalComponent,
    PFMasterComponent, CTCBreakupComponent, SalaryProcessComponent,
    SalesComponent, SalesInvoiceComponent, SalesReturnComponent, CreateBillComponent, SalesReturnViewComponent,
    TransactionsComponent, CashPaymentComponent, CreateCashpaymentComponent, CashReceiptComponent,
    CreateCashreceiptComponent, BankPaymentComponent, CreateBankpaymentComponent, 
    RolesprevilagesComponent, SettingsComponent, StocktransferComponent, CreateStockTransferComponent, PurchaseComponent, PurchaseCreateComponent, PurchaseReturnComponent, PurchaseReturnViewComponent
  ],
  imports: [
    AppRoutingModule,
    SharedImportModule,
    NgxDaterangepickerMd.forRoot(),
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
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
  entryComponents: [
    GeneralledgerComponent, AccountsGroupComponent,
    SubGroupComponent, UndersubGroupComponent,
    GlAccountsComponent, GlSubcodeComponent, TaxIntegrationComponent, CashAccToBranchesComponent,
    AccToAccClassComponent, VoucherTypesComponent,
    DeleteItemComponent, InventoryComponent, BrandModelComponent, SizesComponent, AccountingClassComponent,
    BrandComponent, NumberAssignmentComponent, MaterialGroupsComponent,
    CompanyComponent, BranchesComponent, DivisionComponent,
    SegmentComponent, ProfitCenterComponent, PartnerCreationComponent, CostCenterComponent,
    NoSeriesComponent, PartnerTypeComponent, EmployeeInBranchComponent, EmployeeComponent,
    TaxMasterComponent, UnitComponent, TanksComponent, PumpComponent, ProductpackingComponent,
    TaxgroupsComponent, TaxstructuresComponent,
    LeaveopeningbalancesComponent, LeavetypesComponent,
    LeaveRequestComponent, PTMasterComponent, ComponentMasterComponent,
    StructureCreationComponent, LeaveApprovalComponent,
    PFMasterComponent, CTCBreakupComponent, SalaryProcessComponent
  ]
})
export class AppModule { }
