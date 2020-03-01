import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent , NotFoundComponent , DashboardComponent, SettingComponent} from './components/index';
import { MastersComponent } from './components/dashboard/masters/index';
import { SalesComponent, CreateBillComponent } from './components/dashboard/sales/index';
import { AuthGuard } from './auth.guard';
import { GeneralledgerComponent } from './components/dashboard/generalledger/index';
import { ReportsComponent } from './components/dashboard/reports/index';
import { InventoryComponent } from './components/dashboard/Inventory/index';
import { PayrollComponent } from './components/dashboard/payroll/index';


const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' }, canActivate: [AuthGuard] ,
    children : [
    { path: 'master/:id', component: MastersComponent, data: { title: 'Master' }, canActivate: [AuthGuard]    },
    { path: 'sales/:id', component: SalesComponent, data: { title: 'Sales' }, canActivate: [AuthGuard]  },
    { path: 'sales/:id/createSale', component: CreateBillComponent, data: { title: 'Create Sale' }, canActivate: [AuthGuard]  },
    { path: 'generalledger/:id', component: GeneralledgerComponent, data: { title: 'Generalledger' }, canActivate: [AuthGuard]  },
    { path: 'inventory/:id', component: InventoryComponent, data: { title: 'Inventory' }, canActivate: [AuthGuard] },
    { path: 'payroll/:id', component: PayrollComponent, data: { title: 'Payroll' }, canActivate: [AuthGuard] },
    { path: 'reports/:id', component: ReportsComponent, data: { title: 'Report' }, canActivate: [AuthGuard]  },
    { path: 'setting', component: SettingComponent, data: { title: 'Generalledger' }, canActivate: [AuthGuard]  }
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
