import {Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, OnInit, Input} from '@angular/core';
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


  @ViewChild('appDrawer', {static: false}) appDrawer: ElementRef;
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
          displayName: 'Designation',
          iconName: 'speaker_notes',
          route: 'designation'
        },
        {
          displayName: 'PartnerType',
          iconName: 'speaker_notes',
          route: 'partnerType'
        },
        {
          displayName: 'PartnerCreation',
          iconName: 'speaker_notes',
          route: 'partnerCreation'
        },
        {
          displayName: 'EmployeeInBranch',
          iconName: 'speaker_notes',
          route: 'employeeInBranch'
        },
        {
          displayName: 'NoSeries',
          iconName: 'speaker_notes',
          route: 'noSeries'
        },
        
        {
          displayName: 'Division',
          iconName: 'speaker_notes',
          route: 'division'
        },
        {
          displayName: 'Segment',
          iconName: 'speaker_notes',
          route: 'segment'
        },
        {
          displayName: 'CostCenter',
          iconName: 'speaker_notes',
          route: 'costcenter'
        },
        {
          displayName: 'ProfitCenter',
          iconName: 'speaker_notes',
          route: 'profitCenter'
        },
        {
          displayName: 'Employee',
          iconName: 'feedback',
          route: 'employee'
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
        {
        displayName: 'MSHSD Rates',
        iconName: 'recent_actors',
        route: 'mshsdrates'
        },
        {
          displayName:'Product',
          iconName:'recent_actors',
          route:'product'
        },
     	 {
          displayName: 'MemberMaster',
          iconName: 'feedback',
          route: 'membermaster'
        }
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
          displayName: 'GL',
          iconName: 'group',
          route: 'undersubgroup'
        },
        {
          displayName: 'CashAccBranch',
          iconName: 'group',
          route: 'cashacctobranches'
        },
        {
          displayName: 'AsigAcctoAccclass',
          iconName: 'group',
          route: 'acctoaccclass'
        },
        
        {
          displayName: 'Taxintigration',
          iconName: 'group',
          route: 'taxintegration'
        },
        
        {
          displayName: 'Account Ledger',
          iconName: 'group',
          route: 'glaccounts'
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
      ]
    },

    {
      displayName: 'SelfServices',
      iconName: 'recent_actors',
      route: 'selfservice',
      children: [
        {
          displayName: 'Leaveopeningbalances',
          iconName: 'speaker_notes',
          route: 'leaveopeningbalance'
        },
        {
          displayName: 'LeaveType',
          iconName: 'speaker_notes',
          route: 'leavetype'
        },
        {
          displayName: 'Applyod',
          iconName: 'speaker_notes',
          route: 'applyod'
        },
        {
          displayName: 'LeaveRequest',
          iconName: 'speaker_notes',
          route: 'Leaverequest'
        },
        {
          displayName: 'Leave Approval',
          iconName: 'account_balance',
          route: 'leaveApproval'
        }
      ]
    },
    {
      displayName: 'Payroll',
      iconName: 'recent_actors',
      route: 'payroll',
      children: [
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
        },
        {
          displayName: 'Bank Receipt',
          iconName: 'account_balance',
          route: 'bankreceipt'
        },
        {
          displayName: 'Journal Voucher',
          iconName: 'account_balance',
          route: 'journalvoucher'
        },
	  {
          displayName: 'OP Stock Issues',
          iconName: 'account_balance',
          route: 'stockissues'
        },
        {
          displayName: 'OP Stock Receipt',
          iconName: 'account_balance',
          route: 'stockreceipt'
        },
        {
          displayName: 'Stock Short',
          iconName: 'account_balance',
          route: 'stockshort'
        },
        {
          displayName: 'Oil  Convertion',
          iconName: 'account_balance',
          route: 'oilconversion'
        },
       {
          displayName: 'Package Conversion',
          iconName: 'account_balance',
          route: 'packageconversion'
        },
        {
          displayName: 'Stock Excess',
          iconName: 'account_balance',
          route: 'stockexcess'
        },
        {
          displayName: 'Meter Reading',
          iconName: 'account_balance',
          route: 'meterreading'
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
    {
      displayName: 'Reports',
      iconName: 'recent_actors',
      route: 'reports',
      children: [
        {
          displayName:"Account Ledger",
          iconName:'account_balance',
          route:'AccountLedger'
        },
        {
          displayName:"24Hrs Sale Value",
          iconName:'monetization_on',
          route:'24HrsSaleValue'
        },
        {
          displayName:"24Hrs sales stock",
          iconName:"timeline",
          route:"24HrsSalesStock"
        },
        {
          displayName:"Shift Reports",
          iconName:'schedule',
          route:'Shift'
        },
        {
          displayName:"Vehical Enquiry Report",
          iconName:'commute',
          route:'Vehical Enquiry'
        },
        {
          displayName:"Intimate Sale Report",
          iconName:"euro_symbol",
          route:"Intimate Sale"
        },
        // {
        //   displayName:"Sales GST Report",
        //   iconName:"account_balance",
        //   route:"Sales GST"
        // },
        // {
        //   displayName:"Daily Sales Report",
        //   iconName:"account_balance",
        //   route:"Daily Sales"
        // },
        {
          displayName:"Stock Verification Report",
          iconName:"ev_station",
          route:"Stock Verification"
        },
        {
          displayName:"Stock Ledger For All Products",
          iconName:"track_changes",
          route:"Stock Ledger"
        },
        {
          displayName:"Sales analysis by branch",
          iconName:"score",
          route:"Sales_Analysis_By_Branch"
        },
        {
          displayName:"Product Wise Monthly Purchase",
          iconName:"category",
          route:"Product Wise Monthly Purchase"
        },
        {
          displayName:"Daily Sales",
          iconName:"score",
          route:"Daily Sales"
        },
        {
          displayName:"Product Price List",
          iconName:"category",
          route:"Product Price List"
        },
        {
          displayName:"Receipts And Payments Detailed",
          iconName:"track_changes",
          route:"Receipts And Payments Detailed"
        },
        {
          displayName:"Receipts And Payments Summary",
          iconName:"category",
          route:"Receipts And Payments Summary"
        },
        {
          displayName:"SMS Summary",
          iconName:"category",
          route:"SMS Summary"
        },
        {
          displayName:"Sales GST",
          iconName:"category",
          route:"Sales GST"
        },
        {
          displayName:"24Hrs Sale Value 6Am To 6Am",
          iconName:"category",
          route:"24Hrs Sale Value 6Am To 6Am"
        },
      ]
    }
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
