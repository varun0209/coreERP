import { Injectable } from '@angular/core';
import { RuntimeConfigService } from './runtime-config.service';

@Injectable({
   providedIn: 'root'
})
export class ApiConfigService {

   constructor(private environment: RuntimeConfigService) {
      // environment.loadRuntimeConfig()
   }

   // login Url
   loginUrl = `${this.environment.runtimeConfig.serverUrl}Auth/login`;
   getMenuUrl = `${this.environment.runtimeConfig.serverUrl}Auth/getMenu/admin`;



   // ******************************** sales *********************************
   getInvoiceList = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetInvoiceList`;
   getCashPartyAccountList = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetCashPartyAccountList`;
   getBillingBranchesList = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetBranchesList`;
   getCashPartyAccount = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetCashPartyAccount`;
   getmemberNames = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetmemberNames`;
   getAccountBalance = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetAccountBalance`;
   generateBillNo = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GenerateBillNo`;
   getProductByProductCode = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetProductByProductCode`;
   getProductByProductName = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetProductByProductName`;
   getBillingDetailsRcd = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetBillingDetailsRcd`;
   registerInvoice = `${this.environment.runtimeConfig.serverUrl}sales/Billing/RegisterInvoice`;
   getStateList = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GeStateList`;
   getSelectedState = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GeSelectedState`;
   getInvoiceDeatilList = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetInvoiceDeatilList`;
   getPupms = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetPupms`;
   generateSalesReturnInvNo = `${this.environment.runtimeConfig.serverUrl}transaction/SalesReturn/GenerateSalesReturnInvNo`;
   registerInvoiceReturn = `${this.environment.runtimeConfig.serverUrl}transaction/SalesReturn/RegisterInvoiceReturn`;


   //  stock Transfer
   generateStockTranfNo = `${this.environment.runtimeConfig.serverUrl}transaction/StockTransfer/GenerateStockTranfNo`;
   geProductsByName = `${this.environment.runtimeConfig.serverUrl}transaction/StockTransfer/GeProductsByName`;
   geProductsByCode = `${this.environment.runtimeConfig.serverUrl}transaction/StockTransfer/GeProductsByCode`;
   getStockTransferDetailsSection = `${this.environment.runtimeConfig.serverUrl}transaction/StockTransfer/GetStockTransferDetailsSection`;
   registerStockTransfer = `${this.environment.runtimeConfig.serverUrl}transaction/StockTransfer/RegisterStockTransfer`;
   getStockTransferList = `${this.environment.runtimeConfig.serverUrl}transaction/StockTransfer/GetStockTransferList`;
   getStockTransferDetilsaRecords = `${this.environment.runtimeConfig.serverUrl}transaction/StockTransfer/GetStockTransferDetilsaRecords`;

   //  purchase Transfer
   getPurchasePupms = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/GetPupms`;
   generatePurchaseInvNo = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/GeneratePurchaseInvNo`;
   getProductDeatilsSectionRcd = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/GetProductDeatilsSectionRcd`;
   registerPurchase = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/RegisterPurchase`;
   getPurchaseInvoiceList = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/GetInvoiceList`;
   getPurchaseInvoiceDeatilList = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/GetInvoiceDeatilList`;
   
   // *******************************   Transaction *****************************************

   // Cash Payment
   getCashPaymentList = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetCashPaymentList`;
   // getCashPaymentBranchesList = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetBranchesList`;
   getCashPaymentBranchesList = '${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetBranchesList';
   getCashPaymentVoucherNo = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetVoucherNo`;
   // getAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetAccountLedgerList`;
   getAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetAccountLedgerList`;
   // registerCashPayment = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/RegisterCashPayment`;
   registerCashPayment = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/RegisterCashPayment`;


   // Cash Receipt
   getCashReceiptList = `${this.environment.runtimeConfig.serverUrl}transactions/CashReceipt/GetCashReceiptList`;
   getCashReceiptBranchesList = `${this.environment.runtimeConfig.serverUrl}transactions/CashReceipt/GetBranchesList`;
   //  getCashReceiptBranchesList = 'http://localhost:51414/api/transactions/CashReceipt/GetBranchesList'; 
   getCashReceiptVoucherNo = `${this.environment.runtimeConfig.serverUrl}transactions/CashReceipt/GetVoucherNo`;
   // getCashReceiptVoucherNo= '${this.environment.runtimeConfig.serverUrl}transactions/CashReceipt/GetVoucherNo';
   // // getAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetAccountLedgerList`;
   getCashRAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetAccountLedgerList`;
   // // registerCashPayment = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/RegisterCashPayment`;
   // registerCashPayment = `http://localhost:51414/api/transactions/CashPayment/RegisterCashPayment`;

   // Bank Payment
   //getCashPaymentList = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetCashPaymentList`;
   getBankPaymentBranchesList = `${this.environment.runtimeConfig.serverUrl}transactions/BankPayment/GetBranchesList`;
   // getBankPaymentBranchesList = '${this.environment.runtimeConfig.serverUrl}transactions/BankPayment/GetBranchesList';
   //getCashPaymentVoucherNo = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetVoucherNo`;
   getBankPaymentVoucherNo = `${this.environment.runtimeConfig.serverUrl}transactions/BankPayment/GetVoucherNo`;
   // getAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetAccountLedgerList`;
   getBPAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}transactions/BankPayment/GetAccountLedgerList`;
   // registerCashPayment = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/RegisterCashPayment`;
   //registerCashPayment = `http://localhost:51414/api/transactions/CashPayment/RegisterCashPayment`;


   // *******************************  End Transaction *****************************************
   

   // ******************************** GeneralLedger *********************************

   // AccountsGroup //
   getAccountsGroupList = `${this.environment.runtimeConfig.serverUrl}gl/AccGroup/GetAccountGroupList`;
   registerGlaccGroup = `${this.environment.runtimeConfig.serverUrl}gl/AccGroup/RegisterGlaccGroup`;
   updateAccountGroup = `${this.environment.runtimeConfig.serverUrl}gl/AccGroup/UpdateAccountGroup`;
   deleteAccountGroup = `${this.environment.runtimeConfig.serverUrl}gl/AccGroup/DeleteAccountGroup`;

   // SubGroup //
   getGLAccountSubGroupList = `${this.environment.runtimeConfig.serverUrl}gl/GLAccSubGroup/GetGLAccountSubGroupList`;
   registerGlaccSubGroup = `${this.environment.runtimeConfig.serverUrl}gl/GLAccSubGroup/RegisterGlaccSubGroup`;
   updateGLAccSubGroup = `${this.environment.runtimeConfig.serverUrl}gl/GLAccSubGroup/UpdateGLAccSubGroup`;
   deleteAccountSubGroup = `${this.environment.runtimeConfig.serverUrl}gl/GLAccSubGroup/DeleteAccountSubGroup`;
   getAccgrpList = `${this.environment.runtimeConfig.serverUrl}gl/GLAccSubGroup/GetGLAccountGroupList`;

   // UnderSubGroup //
   getGLUnderSubGroupList = `${this.environment.runtimeConfig.serverUrl}gl/GLAccUnderSubGroup/GetGLUnderSubGroupList`;
   registerGLUnderSubGroup = `${this.environment.runtimeConfig.serverUrl}gl/GLAccUnderSubGroup/RegisterGlaccUnderSubGroup`;
   updateGLAccUnderSubGroup = `${this.environment.runtimeConfig.serverUrl}gl/GLAccUnderSubGroup/UpdateGLAccUnderSubGroup`;
   deleteGLAccUnderSubGroup = `${this.environment.runtimeConfig.serverUrl}gl/GLAccUnderSubGroup/DeleteGLAccUnderSubGroup`;
   getglAccgrpList = `${this.environment.runtimeConfig.serverUrl}gl/GLAccUnderSubGroup/GetGLAccountGrouplist`;
   getAccountSubGrouplist = `${this.environment.runtimeConfig.serverUrl}gl/GLAccUnderSubGroup/GetAccountSubGrouplist`;

   // GL Accounts //
   getGLAccountList = `${this.environment.runtimeConfig.serverUrl}gl/GLAccounts/GetGLAccountsList`;
   registerGlaccounts = `${this.environment.runtimeConfig.serverUrl}gl/GLAccounts/RegisterGlaccounts`;
   updateGLAccounts = `${this.environment.runtimeConfig.serverUrl}gl/GLAccounts/UpdateGLAccounts`;
   deleteGlAccount = `${this.environment.runtimeConfig.serverUrl}gl/GLAccounts/DeleteGlAccount`;
   getStatementTypes = `${this.environment.runtimeConfig.serverUrl}gl/GLAccounts/GetStatementTypes`;
   getNaturesOfAcountsList = `${this.environment.runtimeConfig.serverUrl}gl/GLAccounts/GetNaturesOfAcountsList`;
   getGLAccBalanceTypes = `${this.environment.runtimeConfig.serverUrl}gl/GLAccounts/GetBalanceTypes`;
   getAccountGroupList = `${this.environment.runtimeConfig.serverUrl}gl/GLAccounts/GetAccountGroupList`;

   // GL Subcode //
   getGLSubCodeList = `${this.environment.runtimeConfig.serverUrl}gl/GLSubCode/GetGLSubCodeList`;
   registerGlsubCode = `${this.environment.runtimeConfig.serverUrl}gl/GLSubCode/RegisterGlsubCode`;
   updateGLSubCode = `${this.environment.runtimeConfig.serverUrl}gl/GLSubCode/UpdateGLSubCode`;
   deleteGLSubCode = `${this.environment.runtimeConfig.serverUrl}gl/GLSubCode/DeleteGLSubCode`;
   getGLSubCodeAccountsList = `${this.environment.runtimeConfig.serverUrl}gl/GLSubCode/GetGLAccountsList`;

   // Tax Integration //
   getTaxintigrationList = `${this.environment.runtimeConfig.serverUrl}gl/TaxIntegration/GetTaxintigrationList`;
   registerTaxIntegration = `${this.environment.runtimeConfig.serverUrl}gl/TaxIntegration/RegisterTaxIntegration`;
   updateTaxIntegration = `${this.environment.runtimeConfig.serverUrl}gl/TaxIntegration/UpdateTaxIntegration`;
   deleteTaxIntegration = `${this.environment.runtimeConfig.serverUrl}gl/TaxIntegration/DeleteTaxIntegration`;
   getTaxCodesList = `${this.environment.runtimeConfig.serverUrl}gl/TaxIntegration/GetTaxCodesList`;
   getGLTaxAccountList = `${this.environment.runtimeConfig.serverUrl}gl/TaxIntegration/GetGLTaxAccountList`;

   // Cash Acc To Branches //
   getAsignCashAccBranchList = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentCashAccBranch/GetAsignCashAccBranchList`;
   registerAsigCashAccBranch = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentCashAccBranch/RegisterAsigCashAccBranch`;
   updateaAignmentCashAccBranch = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentCashAccBranch/UpdateaAignmentCashAccBranch`;
   deleteAignmentCashAccBranch = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentCashAccBranch/DeleteAignmentCashAccBranch`;
   getCashAccBranchesList = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentCashAccBranch/GetBranchesList`;
   getBankAccounts = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentCashAccBranch/GetBankAccounts`;
   getCashAccounts = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentCashAccBranch/GetCashAccounts`;

   // Acc To Acc Class //
   getAsigAcctoAccclassList = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/GetAsigAcctoAccclassList`;
   registerAsigAcctoAccClass = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/RegisterAsigAcctoAccClass`;
   updateAccToAccClass = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/UpdateAccToAccClass`;
   deleteAccToAccClass = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/DeleteAccToAccClass`;
   getAccountingClass = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/GetAccountingClass`;
   getMatTranTypes = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/GetMatTranTypes`;
   getSalesGlAccounts = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/GetSalesGlAccounts`;
   getPurchaseGlAccounts = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/GetPurchaseGlAccounts`;
   getInventoryGlAccounts = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/GetInventoryGlAccounts`;

   // Voucher Types //
   getVoucherTypeList = `${this.environment.runtimeConfig.serverUrl}gl/VoucherType/GetVoucherTypeList`;
   registerVoucherTypes = `${this.environment.runtimeConfig.serverUrl}gl/VoucherType/RegisterVoucherTypes`;
   updateVoucherTypes = `${this.environment.runtimeConfig.serverUrl}gl/VoucherType/UpdateVoucherTypes`;
   deleteVoucherTypes = `${this.environment.runtimeConfig.serverUrl}gl/VoucherType/DeleteVoucherTypes`;
   getVoucherClassList = `${this.environment.runtimeConfig.serverUrl}gl/VoucherType/GetVoucherClassList`;
   getCompaniesList = `${this.environment.runtimeConfig.serverUrl}gl/VoucherType/GetCompaniesList`;
   getVoucherBranchesList = `${this.environment.runtimeConfig.serverUrl}gl/VoucherType/GetBranchesList`;

   // ******************************** END GeneralLedger *********************************

   // *******************************  Inventory *****************************************

   // BrandModel
   getBrandModelList = `${this.environment.runtimeConfig.serverUrl}Inventory/BrandModel/GetBrandModelList`;
   registerBrandModelList = `${this.environment.runtimeConfig.serverUrl}Inventory/BrandModel/RegisterBrandModel`;
   updateBrandModelList = `${this.environment.runtimeConfig.serverUrl}Inventory/BrandModel/UpdateBrandModel`;
   deleteBrandModelList = `${this.environment.runtimeConfig.serverUrl}Inventory/BrandModel/DeleteBrandModel`;
   getInputTypeCodeList = `${this.environment.runtimeConfig.serverUrl}Inventory/BrandModel/GetInputTaxes`;
   getOutputTypeCodeList = `${this.environment.runtimeConfig.serverUrl}Inventory/BrandModel/GetOutPutTaxes`;

   // Sizes
   getSizesList = `${this.environment.runtimeConfig.serverUrl}Inventory/Sizes/GetAllSizes`;
   registerSizesList = `${this.environment.runtimeConfig.serverUrl}Inventory/Sizes/RegisterSizes`;
   updateSizesList = `${this.environment.runtimeConfig.serverUrl}Inventory/Sizes/UpdateSize`;
   deleteSizesList = `${this.environment.runtimeConfig.serverUrl}Inventory/Sizes/DeleteSize`;

   // AccountingClass
   getAccountingClassList = `${this.environment.runtimeConfig.serverUrl}Inventory/AccountingClass/GetAllAccountingClass`;
   registerAccountingClassList = `${this.environment.runtimeConfig.serverUrl}Inventory/AccountingClass/RegisterAccountingClass`;
   updateAccountingClassList = `${this.environment.runtimeConfig.serverUrl}Inventory/AccountingClass/UpdateAccountingClass`;
   deleteAccountingClassList = `${this.environment.runtimeConfig.serverUrl}Inventory/AccountingClass/DeleteAccountingClass`;

   // Brand
   getBrandList = `${this.environment.runtimeConfig.serverUrl}Inventory/Brand/GetBbrandList`;
   registerBrandList = `${this.environment.runtimeConfig.serverUrl}Inventory/Brand/RegisterBrand`;
   updateBrandList = `${this.environment.runtimeConfig.serverUrl}Inventory/Brand/UpdateBrand`;
   deleteBrandList = `${this.environment.runtimeConfig.serverUrl}Inventory/Brand/DeleteBrand`;
   getCompanyList = `${this.environment.runtimeConfig.serverUrl}Inventory/ItemMaster/GetCompanysList`;

   // NoAssignment
   getNoAssignmentList = `${this.environment.runtimeConfig.serverUrl}Inventory/NoAssignment/GetNoAssignmentList`;
   registerNoAssignmentList = `${this.environment.runtimeConfig.serverUrl}Inventory/NoAssignment/RegisterNoAssignment`;
   updateNoAssignmentList = `${this.environment.runtimeConfig.serverUrl}Inventory/NoAssignment/UpdateNoAssignment`;
   deleteNoAssignmentList = `${this.environment.runtimeConfig.serverUrl}Inventory/NoAssignment/DeleteNoAssignment`;

   // MaterialGroups
   getMaterialGroupsList = `${this.environment.runtimeConfig.serverUrl}Inventory/MaterialGroup/GetAllMaterialGroup`;
   registerMaterialGroupsList = `${this.environment.runtimeConfig.serverUrl}Inventory/MaterialGroup/RegisterMaterialGroup`;
   updateMaterialGroupsList = `${this.environment.runtimeConfig.serverUrl}Inventory/MaterialGroup/UpdateMaterialGroup`;
   deleteMaterialGroupsList = `${this.environment.runtimeConfig.serverUrl}Inventory/MaterialGroup/DeleteMaterialGroup`;

   // ******************************* End  Inventory *****************************************


   // ******************************* Start  master *****************************************

   // company
   getCompanysList = `${this.environment.runtimeConfig.serverUrl}masters/Company/GetCompanysList`;
   registerCompany = `${this.environment.runtimeConfig.serverUrl}masters/Company/RegisterCompany`;
   updateCompany = `${this.environment.runtimeConfig.serverUrl}masters/Company/UpdateCompany`;
   deleteCompany = `${this.environment.runtimeConfig.serverUrl}masters/Company/DeleteCompany`;


   // --- Branches
   getBranchesList = `${this.environment.runtimeConfig.serverUrl}masters/Branches/GetBranchesList`;
   registerBranch = `${this.environment.runtimeConfig.serverUrl}masters/Branches/RegisterBranch`;
   updateBranch = `${this.environment.runtimeConfig.serverUrl}masters/Branches/UpdateBranch`;
   deleteBranches = `${this.environment.runtimeConfig.serverUrl}masters/Branches/DeleteBranches`;


   // --- division
   getDivisionsList = `${this.environment.runtimeConfig.serverUrl}masters/Division/GetDivisionsList`;
   registerDivision = `${this.environment.runtimeConfig.serverUrl}masters/Division/RegisterDivision`;
   updateDivision = `${this.environment.runtimeConfig.serverUrl}masters/Division/UpdateDivision`;
   deleteDivision = `${this.environment.runtimeConfig.serverUrl}masters/Division/DeleteDivision`;

   // --- Tax Master
   GetTaxTypes = `${this.environment.runtimeConfig.serverUrl}masters/TaxMaster/GetTaxTypes`;
   getTaxmastersList = `${this.environment.runtimeConfig.serverUrl}masters/TaxMaster/GetTaxmastersList`;
   registerTaxMasters = `${this.environment.runtimeConfig.serverUrl}masters/TaxMaster/RegisterTaxMasters`;
   updateTaxMaster = `${this.environment.runtimeConfig.serverUrl}masters/TaxMaster/UpdateTaxMaster`;
   deleteTaxMaster = `${this.environment.runtimeConfig.serverUrl}masters/TaxMaster/DeleteTaxMaster`;

   // --- Employee
   getEmployeeList = `${this.environment.runtimeConfig.serverUrl}masters/Employee/GetEmployeeList`;
   registerEmployee = `${this.environment.runtimeConfig.serverUrl}masters/Employee/RegisterEmployee`;
   updateEmployee = `${this.environment.runtimeConfig.serverUrl}masters/Employee/UpdateEmployee`;
   deleteEmployee = `${this.environment.runtimeConfig.serverUrl}masters/Employee/DeleteEmployee`;

   // --- EmployeeInBranch
   getAllEmployeesInBranch = `${this.environment.runtimeConfig.serverUrl}masters/EmployeeInBranch/GetAllEmployeesInBranch`;
   getEmployeeInBranchList = `${this.environment.runtimeConfig.serverUrl}masters/EmployeeInBranch/GetEmployeeList`;
   getBranchesBranchList = `${this.environment.runtimeConfig.serverUrl}masters/EmployeeInBranch/GetBranchesList`;
   registerEmployeeInBranch = `${this.environment.runtimeConfig.serverUrl}masters/EmployeeInBranch/RegisterEmployeeInBranch`;
   updateEmployeeInBranch = `${this.environment.runtimeConfig.serverUrl}masters/EmployeeInBranch/UpdateEmployeeInBranch`;
   deleteEmployeeInBranch = `${this.environment.runtimeConfig.serverUrl}masters/EmployeeInBranch/DeleteEmployeeInBranch`;

   // --- PartnerType
   getaccounttypelist = `${this.environment.runtimeConfig.serverUrl}masters/PartnerType/GetAccountTypesList`;
   getPartnerTypesList = `${this.environment.runtimeConfig.serverUrl}masters/PartnerType/GetPartnerTypeList`;
   registerPartnerType = `${this.environment.runtimeConfig.serverUrl}masters/PartnerType/RegisterPartnerType`;
   updatePartnerType = `${this.environment.runtimeConfig.serverUrl}masters/PartnerType/UpdatePartnerType`;
   deletePartnerType = `${this.environment.runtimeConfig.serverUrl}masters/PartnerType/DeletePartnerType`;

   // --- NoSeries
   getNoSeriesList = `${this.environment.runtimeConfig.serverUrl}masters/NoSeries/GetNoSeriesList`;
   registerNoSeries = `${this.environment.runtimeConfig.serverUrl}masters/NoSeries/RegisterNoSeries`;
   updateNoSeries = `${this.environment.runtimeConfig.serverUrl}masters/NoSeries/UpdateNoSeries`;
   deleteNoSeries = `${this.environment.runtimeConfig.serverUrl}masters/NoSeries/DeleteNoSeries`;


   // --- NoSeries - company
   getCompanyNoSeriesList = `${this.environment.runtimeConfig.serverUrl}masters/NoSeries/GetCompanyList`;
   getBranchesNoSeriesList = `${this.environment.runtimeConfig.serverUrl}masters/NoSeries/GetBranchesList`;
   getPartnerTypeNoSeriesList = `${this.environment.runtimeConfig.serverUrl}masters/NoSeries/GetPartnerTypeList`;


   // --- CostCenter
   GetCostCenterList = `${this.environment.runtimeConfig.serverUrl}masters/CostCenter/GetCostCenterList`;
   registerCostCenter = `${this.environment.runtimeConfig.serverUrl}masters/CostCenter/RegisterCostCenter`;
   updateCostCenter = `${this.environment.runtimeConfig.serverUrl}masters/CostCenter/UpdateCostCenter`;
   deleteCostCenter = `${this.environment.runtimeConfig.serverUrl}masters/CostCenter/DeleteCostCenter`;


   // --- PartnerCreation
   getCompaniesPartnerCreationList = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/GetCompaniesList`;
   getBranchesPartnerCreationList = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/GetBranchesList`;
   getPartnerPartnerCreationTypes = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/GetPartnerTypes`;
   getGlAccounts = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/GetGlAccounts`;
   getNatureList = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/GetNatureList`;
   getBalanceTypes = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/GetBalanceTypes`;
   getPartnerCreationList = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/GetPartnerCreationList`;


   registerPartnerCreation = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/RegisterCreation`;
   updatePartnerCreation = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/UpdatePartnerCreation`;
   deletePartnerCreation = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/DeletePartnerCreation`;

   // --- ProfitCenter
   getProfitCenterList = `${this.environment.runtimeConfig.serverUrl}masters/ProfitCenter/GetProfitCenterList`;
   registerProfitCenters = `${this.environment.runtimeConfig.serverUrl}masters/ProfitCenter/RegisterProfitCenters`;
   updateProfitCenters = `${this.environment.runtimeConfig.serverUrl}masters/ProfitCenter/UpdateProfitCenters`;
   deleteProfitCenters = `${this.environment.runtimeConfig.serverUrl}masters/ProfitCenter/DeleteProfitCenters`;


   // --- Segment
   getSegmentList = `${this.environment.runtimeConfig.serverUrl}masters/Segment/GetSegmentList`;
   registerSegment = `${this.environment.runtimeConfig.serverUrl}masters/Segment/RegisterSegment`;
   updateSegment = `${this.environment.runtimeConfig.serverUrl}masters/Segment/UpdateSegment`;
   deleteSegment = `${this.environment.runtimeConfig.serverUrl}masters/Segment/DeleteSegment`;

   // --- unit
   getunitList = `${this.environment.runtimeConfig.serverUrl}masters/Unit/GetUnitList`;
   registerunit = `${this.environment.runtimeConfig.serverUrl}masters/Unit/RegisterUnit`;
   updateunit = `${this.environment.runtimeConfig.serverUrl}masters/Unit/UpdateUnit`;
   deleteunit = `${this.environment.runtimeConfig.serverUrl}masters/Unit/DeleteUnit`;

   //tank
   Getbranchcodes = `${this.environment.runtimeConfig.serverUrl}masters/Tank/Getbranchcode`;
   GetBranches = `${this.environment.runtimeConfig.serverUrl}masters/Tank/GetBranches`;
   gettankList = `${this.environment.runtimeConfig.serverUrl}masters/Tank/GetTankList`;
   registertank = `${this.environment.runtimeConfig.serverUrl}masters/Tank/RegisterTank`;
   updatetank = `${this.environment.runtimeConfig.serverUrl}masters/Tank/UpdateTank`;
   deletetank = `${this.environment.runtimeConfig.serverUrl}masters/Tank/DeleteTank`;

   //pump
   GetProductGroupsNames = `${this.environment.runtimeConfig.serverUrl}masters/Pump/GetProductGroupsNames`;
   GetProductGroups = `${this.environment.runtimeConfig.serverUrl}masters/Pump/GetProductGroups`;
   GetBranchcodes = `${this.environment.runtimeConfig.serverUrl}masters/Pump/GetBranchcodes`;
   getpumpList = `${this.environment.runtimeConfig.serverUrl}masters/Pump/GetPumpList`;
   registerpump = `${this.environment.runtimeConfig.serverUrl}masters/Pump/RegisterPump`;
   updatepump = `${this.environment.runtimeConfig.serverUrl}masters/Pump/UpdatePump`;
   deletepump = `${this.environment.runtimeConfig.serverUrl}masters/Pump/DeletePump`;

   //productpacking
   getproductpackingList = `${this.environment.runtimeConfig.serverUrl}masters/Productpacking/GetProductpackingList`;
   registerproductpacking = `${this.environment.runtimeConfig.serverUrl}masters/Productpacking/RegisterProductpacking`;
   updateproductpacking = `${this.environment.runtimeConfig.serverUrl}masters/Productpacking/UpdateProductpacking`;
   deleteproductpacking = `${this.environment.runtimeConfig.serverUrl}masters/Productpacking/DeleteProductpacking`;

   //TaxGroup
   getTaxGroupList = `${this.environment.runtimeConfig.serverUrl}masters/Taxgroup/GetTaxgroupList`;
   registerTaxGroup = `${this.environment.runtimeConfig.serverUrl}masters/Taxgroup/RegisterTaxgroup`;
   updateTaxGroup = `${this.environment.runtimeConfig.serverUrl}masters/Taxgroup/UpdateTaxgroup`;
   deleteTaxGroup = `${this.environment.runtimeConfig.serverUrl}masters/Taxgroup/DeleteTaxgroup`;

   //TaxStructure
   getTaxStructureList = `${this.environment.runtimeConfig.serverUrl}masters/TaxStructure/GetTaxStructureList`;
   TaxGroupsLists = `${this.environment.runtimeConfig.serverUrl}masters/TaxStructure/GetTaxGroups`;
   PurchaseAccountsList = `${this.environment.runtimeConfig.serverUrl}masters/TaxStructure/GetPurchaseAccounts`;
   registerTaxStructure = `${this.environment.runtimeConfig.serverUrl}masters/TaxStructure/RegisterTaxStructure`;
   updateTaxStructure = `${this.environment.runtimeConfig.serverUrl}masters/TaxStructure/UpdateTaxStructure`;
   deleteTaxStructure = `${this.environment.runtimeConfig.serverUrl}masters/TaxStructure/DeleteTaxStructure`;

   // ******************************* End  master *****************************************


   // ******************************* start  Payroll *****************************************

   //Leaveopeningbalance
   getLeaveopeningbalanceList = `${this.environment.runtimeConfig.serverUrl}masters/LeaveBalances/GetLeaveBalancesList`;
   registerLeaveopeningbalance = `${this.environment.runtimeConfig.serverUrl}masters/LeaveBalances/RegisterLeaveBalancesList`;
   updateLeaveopeningbalance = `${this.environment.runtimeConfig.serverUrl}masters/LeaveBalances/UpdateLeaveBalancesList`;
   deleteLeaveopeningbalance = `${this.environment.runtimeConfig.serverUrl}masters/LeaveBalances/DeleteLeaveBalancesList`;

   //LeaveTypes
   getLeaveTypesList = `${this.environment.runtimeConfig.serverUrl}masters/LeaveTypeMasters/GetLeaveTypesList`;
   registerLeaveTypes = `${this.environment.runtimeConfig.serverUrl}masters/LeaveTypeMasters/RegisterLeaveTypeMaster`;
   updateLeaveTypes = `${this.environment.runtimeConfig.serverUrl}masters/LeaveTypeMasters/UpdateLeaveTypeMaster`;
   deleteLeaveTypes = `${this.environment.runtimeConfig.serverUrl}masters/LeaveTypeMasters/DeleteLeaveTypeMaster`;

   //LeaveRequest
   getLeaveTypeatList = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveRequest/GetLeavetpesList`;
   getLeaveRequestList = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveRequest/GetLeaveApplDetailsList`;
   registerLeaveRequests = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveRequest/RegisterLeaveapplying`;

   //PT Master
   getPTList = `${this.environment.runtimeConfig.serverUrl}payroll/PTMaster/GetPTList`;
   registerPT = `${this.environment.runtimeConfig.serverUrl}payroll/PTMaster/RegisterPT`;
   updatePT = `${this.environment.runtimeConfig.serverUrl}payroll/PTMaster/UpdatePT`;
   deletePT = `${this.environment.runtimeConfig.serverUrl}payroll/PTMaster/DeletePT`;

   // Component Master
   getComponentsList = `${this.environment.runtimeConfig.serverUrl}payroll/ComponentMaster/GetComponentsList`;
   registerComponent = `${this.environment.runtimeConfig.serverUrl}payroll/ComponentMaster/RegisterComponent`;
   updateComponent = `${this.environment.runtimeConfig.serverUrl}payroll/ComponentMaster/UpdateComponent`;
   deleteComponent = `${this.environment.runtimeConfig.serverUrl}payroll/ComponentMaster/DeleteComponent`;
   getConfigurationList = `${this.environment.runtimeConfig.serverUrl}payroll/ComponentMaster/GetConfigurationList`;

   //PF Master
   getPfList = `${this.environment.runtimeConfig.serverUrl}payroll/PFMaster/GetPFList`;
   registerPF = `${this.environment.runtimeConfig.serverUrl}payroll/PFMaster/RegisterPF`;
   updatePF = `${this.environment.runtimeConfig.serverUrl}payroll/PFMaster/UpdatePF`;
   deletePF = `${this.environment.runtimeConfig.serverUrl}payroll/PFMaster/DeletePF`;
   getPfComponentsList = `${this.environment.runtimeConfig.serverUrl}payroll/PFMaster/GetComponentsList`;

   //CTC Breakup
   getCTCList = `${this.environment.runtimeConfig.serverUrl}payroll/CTCBreakup/GetCTCList`;
   getStructureList = `${this.environment.runtimeConfig.serverUrl}payroll/CTCBreakup/GetStructureList`;
   getctcComponentsList = `${this.environment.runtimeConfig.serverUrl}payroll/ComponentMaster/GetComponentsList`;

   // Structure Creation
   getStructuresList = `${this.environment.runtimeConfig.serverUrl}payroll/StructureCreation/GetStructuresList`;
   registerStructure = `${this.environment.runtimeConfig.serverUrl}payroll/StructureCreation/RegisterStructure`;
   updateStructure = `${this.environment.runtimeConfig.serverUrl}payroll/StructureCreation/UpdateStructure`;
   deleteStructure = `${this.environment.runtimeConfig.serverUrl}payroll/StructureCreation/DeleteStructure`;
   getStructureComponentsList = `${this.environment.runtimeConfig.serverUrl}payroll/StructureCreation/GetComponentsList`;
   getPFList = `${this.environment.runtimeConfig.serverUrl}payroll/StructureCreation/GetPFList`;


   // Leave Approval

   getLeaveApplDetailsList = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveApproval/GetLeaveApplDetailsList`;
   // ******************************* End  master *****************************************


}

