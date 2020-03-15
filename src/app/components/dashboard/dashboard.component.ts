import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, OnInit, Input } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import { ApiConfigService } from '../../services/api-config.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {


  @ViewChild('appDrawer', { static: false }) appDrawer: ElementRef;
  navItems = [
    {
      displayName: 'Master',
      iconName: 'recent_actors',
      route: 'master',
      children: [
        {
          displayName: 'Company',
          iconName: 'group',
          route: 'company'
        },
        {
          displayName: 'Branches',
          iconName: 'speaker_notes',
          route: 'branches'
        },
        {
          displayName: 'Division',
          iconName: 'feedback',
          route: 'division'
        },
        {
          displayName: 'Segment',
          iconName: 'feedback',
          route: 'segment'
        },
        {
          displayName: 'ProfitCenter',
          iconName: 'feedback',
          route: 'profitCenter'
        },
        {
          displayName: 'PartnerCreation',
          iconName: 'feedback',
          route: 'partnerCreation'
        },
        {
          displayName: 'CostCenter',
          iconName: 'feedback',
          route: 'costCenter'
        },
        {
          displayName: 'NoSeries',
          iconName: 'feedback',
          route: 'noSeries'
        },
        {
          displayName: 'PartnerType',
          iconName: 'feedback',
          route: 'partnerType'
        },
        {
          displayName: 'EmployeeInBranch',
          iconName: 'feedback',
          route: 'employeeInBranch'
        },
        {
          displayName: 'Employee',
          iconName: 'feedback',
          route: 'employee'
        },
        {
          displayName: 'TaxMaster',
          iconName: 'feedback',
          route: 'taxMaster'
        },

        {
          displayName: 'ProductPacking',
          iconName: 'feedback',
          route: 'productpacking'
        },
        {
          displayName: 'TaxGroup',
          iconName: 'feedback',
          route: 'taxgroup'
        },
        {
          displayName: 'TaxStructure',
          iconName: 'feedback',
          route: 'taxstructure'
        },
        {
          displayName: 'Tank',
          iconName: 'feedback',
          route: 'tank'
        },
        {
          displayName: 'Unit',
          iconName: 'feedback',
          route: 'unit'
        },
        {
          displayName: 'Pump',
          iconName: 'feedback',
          route: 'pump'
        },
      ]
    },
    {
      displayName: 'GeneralLedger',
      iconName: 'recent_actors',
      route: 'generalledger',
      children: [
        {
          displayName: 'AccountsGroup',
          iconName: 'account_balance',
          route: 'accountsgroup'
        },
        {
          displayName: 'SubGroup',
          iconName: 'group',
          route: 'subgroup'
        },
        {
          displayName: 'UnderSubgroup',
          iconName: 'group',
          route: 'undersubgroup'
        },
        {
          displayName: 'GLAccounts',
          iconName: 'group',
          route: 'glaccounts'
        },
        {
          displayName: 'GLSubcode',
          iconName: 'group',
          route: 'glsubcode'
        },
        {
          displayName: 'TaxIntegration',
          iconName: 'group',
          route: 'taxintegration'
        },
        {
          displayName: 'CashAccToBranches',
          iconName: 'group',
          route: 'cashacctobranches'
        },
        {
          displayName: 'AccToAccClass',
          iconName: 'group',
          route: 'acctoaccclass'
        },
        {
          displayName: 'VoucherTypes',
          iconName: 'group',
          route: 'vouchertypes'
        }
      ]
    },
    {
      displayName: 'Inventory',
      iconName: 'recent_actors',
      route: 'inventory',
      children: [
        {
          displayName: 'BrandModel',
          iconName: 'speaker_notes',
          route: 'brandmodel'
        },
        {
          displayName: 'Sizes',
          iconName: 'speaker_notes',
          route: 'sizes'
        },
        {
          displayName: 'AccountingClass',
          iconName: 'speaker_notes',
          route: 'accountingclass'
        },
        {
          displayName: 'Brand',
          iconName: 'speaker_notes',
          route: 'brand'
        },
        {
          displayName: 'NoAssignment',
          iconName: 'speaker_notes',
          route: 'numberassignment'
        },
        {
          displayName: 'MaterialGroups',
          iconName: 'speaker_notes',
          route: 'materialgroups'
        },
        {
          displayName: 'Payroll',
          iconName: 'recent_actors',
          route: 'payroll',
          children: [
            {
              displayName: 'Leavebalances',
              iconName: 'speaker_notes',
              route: 'leaveopeningbalances'
            },
            {
              displayName: 'LeaveType',
              iconName: 'speaker_notes',
              route: 'leavetype'
            },
            {
              displayName: 'LeaveRequest',
              iconName: 'speaker_notes',
              route: 'Leaverequest'
            },
            {
              displayName: 'Component Master',
              iconName: 'speaker_notes',
              route: 'componentmaster'
            },
            {
              displayName: 'PT Master',
              iconName: 'speaker_notes',
              route: 'ptmaster'

            },
            {
              displayName: 'CTCBreakup',
              iconName: 'account_balance',
              route: 'CTCBreakup'
            },
            {
              displayName: 'Structure Creation',
              iconName: 'account_balance',
              route: 'structureCreation'
            },
            {
              displayName: 'Leave Approval',
              iconName: 'account_balance',
              route: 'leaveApproval'
            },
            {
              displayName: 'PF Master',
              iconName: 'account_balance',
              route: 'pfmaster'
            },
            {
              displayName: 'Salary Process',
              iconName: 'account_balance',
              route: 'salaryprocess'
            }

          ]
        },
        {
          displayName: 'Sales',
          iconName: 'videocam',
          route: 'sales',
          children: [
            {
              displayName: 'Sales Invoice',
              iconName: 'videocam',
              route: 'salesInvoice',
            },
            {
              displayName: 'Sales Return',
              iconName: 'videocam',
              route: 'salesReturn',
            }
          ]
        },
      ]
    },
    {
      displayName: 'Payroll',
      iconName: 'recent_actors',
      route: 'payroll',
      children: [
        {
          displayName: 'Leavebalances',
          iconName: 'speaker_notes',
          route: 'leaveopeningbalances'
        },
        {
          displayName: 'LeaveType',
          iconName: 'speaker_notes',
          route: 'leavetype'
        },
        {
          displayName: 'LeaveRequest',
          iconName: 'speaker_notes',
          route: 'Leaverequest'
        },
        {
          displayName: 'Component Master',
          iconName: 'speaker_notes',
          route: 'componentmaster'
        },
        {
          displayName: 'PT Master',
          iconName: 'speaker_notes',
          route: 'ptmaster'

        },
        {
          displayName: 'CTCBreakup',
          iconName: 'account_balance',
          route: 'CTCBreakup'
        },
        {
          displayName: 'Structure Creation',
          iconName: 'account_balance',
          route: 'structureCreation'
        },
        {
          displayName: 'Leave Approval',
          iconName: 'account_balance',
          route: 'leaveApproval'
        },
        {
          displayName: 'PF Master',
          iconName: 'account_balance',
          route: 'pfmaster'
        },
        {
          displayName: 'Salary Process',
          iconName: 'account_balance',
          route: 'salaryprocess'
        }

      ]
    },
    {
      displayName: 'Sales',
      iconName: 'videocam',
      route: 'sales',
      children: [
        {
          displayName: 'Sales Invoice',
          iconName: 'videocam',
          route: 'salesInvoice',
        },
        {
          displayName: 'Sales Return',
          iconName: 'videocam',
          route: 'salesReturn',
        },
        {
          displayName: 'Stock Transfer',
          iconName: 'videocam',
          route: 'stockTransfer',
        },
        {
          displayName: 'Purchase Invoice',
          iconName: 'videocam',
          route: 'purchaseInvoice',
        },
        {
          displayName: 'Purchase Return',
          iconName: 'videocam',
          route: 'purchaseReturn',
        }
      ]
    },
    {
      displayName: 'Transactions',
      iconName: 'account_balance',
      route: 'transactions',
      children: [
        {
          displayName: 'Cash Payment',
          iconName: 'account_balance',
          route: 'cashpayment'
        },
        {
          displayName: 'Cash Receipt',
          iconName: 'account_balance',
          route: 'cashreceipt'
        },
        {
          displayName: 'Bank Payment',
          iconName: 'account_balance',
          route: 'bankpayment'
        }
      ]
    },
    {
      displayName: 'Settings',
      iconName: 'settings',
      route: 'settings',
      children: [
        {
          displayName: 'Role Previlages',
          iconName: 'account_balance',
          route: 'rolePrevilages',
        }
      ]
    },
  ];

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
  ) {
    commonService.showNavbar.next(true);
  }

  ngOnInit() {
    // this.getMenuList();
  }

  getMenuList() {
    const getMenuUrl = String.Join('/', this.apiConfigService.getMenuUrl);
    this.apiService.apiGetRequest(getMenuUrl)
      .subscribe(
        menu => {
          console.log(menu);
          this.spinner.hide();
          // this.navItems = menu.body;
        });
  }

  ngAfterViewInit() {
    this.commonService.appDrawer = this.appDrawer;
    // console.log(this.navItems);
  }


}
