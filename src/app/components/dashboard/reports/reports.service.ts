import { Injectable } from '@angular/core';
import { ApiConfigService } from '../../../services/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  dynamicData = { url: '', component: null, coustom: null, registerUrl: '', listName: '', updateUrl: '', primaryKey: '', deleteUrl: '' };


  constructor(
    private apiConfigService: ApiConfigService
  ) { }


  getRouteUrls(data) {
    switch (data) {
      case 'bonus':
        this.dynamicData.url = this.apiConfigService.getCompanysList;
        this.dynamicData.listName = 'companiesList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
        break;
      case 'membermaster':
        this.dynamicData.url = this.apiConfigService.getMemberMaster;
        this.dynamicData.listName = 'memberMasterList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
        break;
      case 'employeeregister':
        this.dynamicData.url = this.apiConfigService.getEmployeeRegister;
        this.dynamicData.listName = 'employeeRegisterList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'AccountLedger':
        this.dynamicData.url = this.apiConfigService.getAccountLedger;
        this.dynamicData.listName = 'accountLedgerList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case '24HrsSaleValue':
        this.dynamicData.url = this.apiConfigService.getSaleValueReport;
        this.dynamicData.listName = 'savleValueList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'Shift':
        this.dynamicData.url = this.apiConfigService.getDefaultShiftReport;
        this.dynamicData.listName = 'shiftViewList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'InnerShift':
        this.dynamicData.url = this.apiConfigService.getShiftViewReport;
        this.dynamicData.listName = 'shiftViewList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'Vehical Enquiry':
        this.dynamicData.url = this.apiConfigService.getVehicalReport;
        this.dynamicData.listName = 'VehicalList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'Intimate Sale':
        this.dynamicData.url = this.apiConfigService.getIntimateSaleReport;
        this.dynamicData.listName = 'IntimateSaleList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'Sales GST':
        this.dynamicData.url = this.apiConfigService.getSalesGSTReport;
        this.dynamicData.listName = 'salesGst';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'Daily Sales':
        this.dynamicData.url = this.apiConfigService.getDailySalesReport;
        this.dynamicData.listName = 'dailySalesList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'Stock Verification':
        this.dynamicData.url = this.apiConfigService.getStockVerificationReport;
        this.dynamicData.listName = 'StockVerificationList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'Stock Ledger':
        this.dynamicData.url = this.apiConfigService.getStockLedgerForAllProducts;
        this.dynamicData.listName = 'StockLedgerList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case '24HrsSalesStock':
        this.dynamicData.url = this.apiConfigService.getTwoFourehrsSalesStockReport;
        this.dynamicData.listName = 'shrsSalesStockListhiftViewList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'Sales_Analysis_By_Branch':
        this.dynamicData.url = this.apiConfigService.getSalesAnalysisByBranch;
        this.dynamicData.listName = 'SalesAnalysisByBranchrList';
        this.dynamicData.coustom = true;
        return this.dynamicData;
      case 'Product Wise Monthly Purchase':
        this.dynamicData.url = this.apiConfigService.getProductWiseMonthlyPurchaseReport;
        this.dynamicData.listName = 'ProductWiseMonthlyPurchaseList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'Product Price List':
        this.dynamicData.url = this.apiConfigService.getProductPriceListReport;
        this.dynamicData.listName = 'productPriceList';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'Receipts And Payments Detailed':
        this.dynamicData.url = this.apiConfigService.getReceiptsAndPyamentDetailedReportData;
        this.dynamicData.listName = 'receiptsAndPayment';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'Receipts And Payments Summary':
        this.dynamicData.url = this.apiConfigService.getReceiptsAndPaymentSummaryReportData;
        this.dynamicData.listName = 'receiptsAndPayment';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case 'SMS Summary':
        this.dynamicData.url = this.apiConfigService.getSMSSummaryReportData;
        this.dynamicData.listName = 'smsSummary';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      case '24Hrs Sale Value 6Am To 6Am':
        this.dynamicData.url = this.apiConfigService.getOneDaySaleValueReportData;
        this.dynamicData.listName = 'saleValue';
        this.dynamicData.coustom = false;
        return this.dynamicData;
      default:
    }
  }
}
