import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent, DashboardComponent, NotFoundComponent } from './components/index';
import { GeneralledgerComponent } from './components/dashboard/generalledger/index';
import { InventoryComponent } from './components/dashboard/Inventory/index';
import { SalesComponent, CreateBillComponent , SalesReturnViewComponent, CreateStockTransferComponent , PurchaseCreateComponent} from './components/dashboard/sales/index';
import { MastersComponent } from './components/dashboard/masters/index';
import { PayrollComponent } from './components/dashboard/payroll/index';
// import { TransactionsComponent } from './components/dashboard/transactions';
import { TransactionsComponent,CreateCashpaymentComponent,CreateCashreceiptComponent,CreateBankpaymentComponent,CreateStockissuesComponent, CreateStockreceiptsComponent, CreateStockshortsComponent, CreateOilconversionsComponent, } from './components/dashboard/transactions';

import {
  SettingsComponent
} from './components/dashboard/settings/index';

import { ReportsComponent } from './components/dashboard/reports/index';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  {
    path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' }, canActivate: [AuthGuard],
    children: [
      { path: 'master/:id', component: MastersComponent, data: { title: 'Master' }, canActivate: [AuthGuard] },
      { path: 'sales/:id', component: SalesComponent, data: { title: 'Sales' }, canActivate: [AuthGuard] },
      { path: 'sales/:id/createSale', component: CreateBillComponent, data: { title: 'Create Sale' }, canActivate: [AuthGuard] },
      { path: 'sales/:id/viewSaleInvoice/:id1', component: CreateBillComponent, data: { title: 'Create Sale' }, canActivate: [AuthGuard] },
      { path: 'sales/:id/salesReturnView', component: SalesReturnViewComponent, data: { title: 'Create Sale' }, canActivate: [AuthGuard] },
      { path: 'sales/:id/salesReturnView/:id1', component: SalesReturnViewComponent, data: { title: 'Create Sale' }, canActivate: [AuthGuard] },
      { path: 'sales/:id/createStockTransfer', component: CreateStockTransferComponent, data: { title: 'Create Sale' }, canActivate: [AuthGuard] },
      { path: 'sales/:id/createStockTransfer/:id1', component: CreateStockTransferComponent, data: { title: 'Create Sale' }, canActivate: [AuthGuard] },
      { path: 'sales/:id/CreatePurchase', component: PurchaseCreateComponent, data: { title: 'Create Sale' }, canActivate: [AuthGuard] },
      { path: 'sales/:id/CreatePurchase/:id1', component: PurchaseCreateComponent, data: { title: 'Create Sale' }, canActivate: [AuthGuard] },
      { path: 'sales/:id/purchaseReturnView', component: PurchaseCreateComponent, data: { title: 'Create Sale' }, canActivate: [AuthGuard] },
      { path: 'sales/:id/purchaseReturnView/:id1', component: PurchaseCreateComponent, data: { title: 'Create Sale' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id', component: TransactionsComponent, data: { title: 'Transactions' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/createCashpayment', component: CreateCashpaymentComponent, data: { title: 'Create CashPayment' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/createCashpayment/:id1', component: CreateCashpaymentComponent, data: { title: 'Create CashPayment' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/createCashreceipt', component: CreateCashreceiptComponent, data: { title: 'Create CashReceipt' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/createCashreceipt/:id1', component: CreateCashreceiptComponent, data: { title: 'Create CashReceipt' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/createBankpayment', component: CreateBankpaymentComponent, data: { title: 'Create BankPayment' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/createBankpayment/:id1', component: CreateBankpaymentComponent, data: { title: 'Create BankPayment' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/CreateStockissues', component: CreateStockissuesComponent, data: { title: 'Create Stockissues' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/CreateStockissues/:id1', component: CreateStockissuesComponent, data: { title: 'Create Stockissues' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/CreateStockreceipts', component: CreateStockreceiptsComponent, data: { title: 'Create Stockreceipt' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/CreateStockreceipts/:id1', component: CreateStockreceiptsComponent, data: { title: 'Create Stockreceipt' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/CreateStocshorts', component: CreateStockshortsComponent, data: { title: 'Create Stockshort' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/CreateStocshorts/:id1', component: CreateStockshortsComponent, data: { title: 'Create Stockshort' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/CreateOilconversions', component: CreateOilconversionsComponent, data: { title: 'Create Oilconversions' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/CreateOilconversions/:id1', component: CreateOilconversionsComponent, data: { title: 'Create Oilconversions' }, canActivate: [AuthGuard] },
      { path: 'generalledger/:id', component: GeneralledgerComponent, data: { title: 'Generalledger' }, canActivate: [AuthGuard] },
      { path: 'inventory/:id', component: InventoryComponent, data: { title: 'Inventory' }, canActivate: [AuthGuard] },
      { path: 'payroll/:id', component: PayrollComponent, data: { title: 'Payroll' }, canActivate: [AuthGuard] },
      { path: 'settings/:id', component: SettingsComponent, data: { title: 'Payroll' }, canActivate: [AuthGuard] },
      { path: 'reports/:id', component: ReportsComponent, data: { title: 'Report' }, canActivate: [AuthGuard]  }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, data: { title: 'Page Not Found' } },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
