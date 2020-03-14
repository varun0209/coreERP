import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent, DashboardComponent, NotFoundComponent } from './components/index';
import { GeneralledgerComponent } from './components/dashboard/generalledger/index';
import { InventoryComponent } from './components/dashboard/Inventory/index';
import { SalesComponent, CreateBillComponent } from './components/dashboard/sales/index';
import { MastersComponent } from './components/dashboard/masters/index';
// import { ReportsComponent } from './components/dashboard/reports/index';
import { PayrollComponent } from './components/dashboard/payroll/index';
// import { TransactionsComponent } from './components/dashboard/transactions';
// import { SettingsComponent } from './components/dashboard/settings/index';
import { TransactionsComponent,CreateCashpaymentComponent,CreateCashreceiptComponent,CreateBankpaymentComponent } from './components/dashboard/transactions';


const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  {
    path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' }, canActivate: [AuthGuard],
    children: [
      { path: 'master/:id', component: MastersComponent, data: { title: 'Master' }, canActivate: [AuthGuard] },
      { path: 'sales/:id', component: SalesComponent, data: { title: 'Sales' }, canActivate: [AuthGuard] },
      { path: 'sales/:id/createSale', component: CreateBillComponent, data: { title: 'Create Sale' }, canActivate: [AuthGuard] },
      { path: 'sales/:id/createSale/:id1', component: CreateBillComponent, data: { title: 'Create Sale' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id', component: TransactionsComponent, data: { title: 'Transactions' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/createCashpayment', component: CreateCashpaymentComponent, data: { title: 'Create CashPayment' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/createCashpayment/:id1', component: CreateCashpaymentComponent, data: { title: 'Create CashPayment' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/createCashreceipt', component: CreateCashreceiptComponent, data: { title: 'Create CashReceipt' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/createCashreceipt/:id1', component: CreateCashreceiptComponent, data: { title: 'Create CashReceipt' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/createBankpayment', component: CreateBankpaymentComponent, data: { title: 'Create BankPayment' }, canActivate: [AuthGuard] },
      { path: 'transactions/:id/createBankpayment/:id1', component: CreateBankpaymentComponent, data: { title: 'Create BankPayment' }, canActivate: [AuthGuard] },
      { path: 'generalledger/:id', component: GeneralledgerComponent, data: { title: 'Generalledger' }, canActivate: [AuthGuard] },
      { path: 'inventory/:id', component: InventoryComponent, data: { title: 'Inventory' }, canActivate: [AuthGuard] },
      { path: 'payroll/:id', component: PayrollComponent, data: { title: 'Payroll' }, canActivate: [AuthGuard] },
      // { path: 'reports/:id', component: ReportsComponent, data: { title: 'Report' }, canActivate: [AuthGuard] },
      // { path: 'transactions/:id', component: TransactionsComponent, data: { title: 'Transactions' }, canActivate: [AuthGuard] },
      // { path: 'settings/:id', component: SettingsComponent, data: { title: 'Generalledger' }, canActivate: [AuthGuard] }
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
