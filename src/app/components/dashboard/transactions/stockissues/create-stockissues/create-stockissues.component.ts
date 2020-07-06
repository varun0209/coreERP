import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../../services/common.service';
import { ApiConfigService } from '../../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../../services/api.service';
import { isNullOrUndefined } from 'util';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SnackBar, StatusCodes } from '../../../../../enums/common/common';
import { AlertService } from '../../../../../services/alert.service';
import { Static } from '../../../../../enums/common/static';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-stockissues',
  templateUrl: './create-stockissues.component.html',
  styleUrls: ['./create-stockissues.component.scss']
})
export class CreateStockissuesComponent implements OnInit {

  branchFormData: FormGroup;
  GetBranchesListArray = [];
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  getAccountLedgerListArray = [];
  getAccountLedgerListNameArray = [];
  getSalesBranchListArray = [];
  branchesList = [];
  getmemberNamesArray = [];
  fromBranchCode= null;

  displayedColumns: string[] = ['productCode', 'productName', 'hsnNo', 'unitName', 'qty', 'rate', 'grossAmount', 'availStock', 'batchNo', 'delete'
  ];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  date = new Date((new Date().getTime() - 3888000000));
  modelFormData: FormGroup;
  tableFormData: FormGroup;
 // printBill: any;
  issueno = null;
  totalamount = null;
  tableFormObj = false;
  routeUrl = '';
  getProductByProductCodeArray = [];
  getProductByProductNameArray: any[];
  orders: any;
  GettoBranchesListArray: any;
  toBranchCode:any;
  

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
    this.branchFormData = this.formBuilder.group({
      issueNo: [null],
      issueDate: [(new Date()).toISOString()],
      fromBranchCode: [null],
      fromBranchName: [null],
      toBranchCode: [null],
      toBranchName: [null],
      serverDateTime: [null],
      shiftId: [null],
      userId: '0',
      userName: [null],
      employeeId: [null],
      remarks: [null],
      operatorStockIssueId: '0',
     // printBill: [false],

    });
    //String data= null;
    const user = JSON.parse(localStorage.getItem('user'));
    if (!isNullOrUndefined(user))
    {
     // debugger;
      this.branchFormData.patchValue
        ({
          userId: user.userId,
          userName: user.userName,
          shiftId: user.shiftId
        })
    }
  }

  loadData()
  {
    //debugger;
    this.getCashPaymentBranchesList();
    this.activatedRoute.params.subscribe(params => {
      if (!isNullOrUndefined(params.id1)) {
        this.routeUrl = params.id1;
        //this.disableForm(params.id1);
        this.getStockissuesDeatilList(params.id1);
        let billHeader = JSON.parse(localStorage.getItem('selectedstockissues'));
        this.branchFormData.setValue(billHeader);
      } else {
        //this.disableForm();
        const user = JSON.parse(localStorage.getItem('user'));
        if (!isNullOrUndefined(user.branchCode))
        {
          this.branchFormData.patchValue
          ({
            fromBranchCode: user.branchCode,
            userId: user.seqId,
            userName: user.userName
          });
          this.genaratebranchcode();
          ////this.setBranchCode();
          ////this.genarateVoucherNo(user.branchCode);
          ////this.formGroup();
          ////this.gettingtobranches();
         // this.settoBranchCode();
        }
        this.addTableRow();
      }
    });
  }

  setBranchCode()
  {
    //debugger;
    const bname = this.GetBranchesListArray.filter(fromBranchCode => {
      if (fromBranchCode.id == this.branchFormData.get('fromBranchCode').value) {
        return fromBranchCode;
      }
    });
    if (bname.length)
    {
      this.branchFormData.patchValue({
        fromBranchName: !isNullOrUndefined(bname[0]) ? bname[0].text : null
      });
    }
  }


  //issueno code;
  genaratebranchcode(branch?) {
   //debugger;
      let genaratebranchNoUrl;
    if (!isNullOrUndefined(branch))
    {
      genaratebranchNoUrl = String.Join('/', this.apiConfigService.getbranchesnosList, branch);
    }
    else
    {
      genaratebranchNoUrl = String.Join('/', this.apiConfigService.getbranchesnosList, this.branchFormData.get('fromBranchCode').value);
    }
    this.apiService.apiGetRequest(genaratebranchNoUrl).subscribe(
      response =>
      {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['branchno'])) {
              this.fromBranchCode = res.response['branchno']
              console.log(res.response['branchno']);
              this.branchFormData.patchValue
                ({
                  fromBranchCode: res.response['branchno']
                });
              this.setBranchCode();
              this.genarateVoucherNo(this.fromBranchCode);
              this.formGroup();
              this.gettingtobranches();
              this.spinner.hide();
             
            }
          }
        }
      });
   
    //this.gettingtobranches();
  }

  ngOnInit()
  {
    //debugger;
    this.loadData();
  }

  getStockissuesDeatilList(id)
  {
   // debugger;
    const getInvoiceDeatilListUrl = String.Join('/', this.apiConfigService.getStockissuesDeatilList, id);
    this.apiService.apiGetRequest(getInvoiceDeatilListUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response['StockissuesDeatilList']) && res.response['StockissuesDeatilList'].length) {
            this.dataSource = new MatTableDataSource(res.response['StockissuesDeatilList']);
            this.spinner.hide();
          }
        }
      });
  }

  getCashPaymentBranchesList()
  {
    //debugger;
    const getCashPaymentBranchesListUrl = String.Join('/', this.apiConfigService.GetBranchesList);
    this.apiService.apiGetRequest(getCashPaymentBranchesListUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['BranchesList']) && res.response['BranchesList'].length) {
              this.GetBranchesListArray = res.response['BranchesList'];
              this.spinner.hide();
            }
          }
        }
      });
  }


   //issueno code;
  genarateVoucherNo(branch?)
  {
    //debugger;
    
    let genarateVoucherNoUrl;
    if (!isNullOrUndefined(branch)) {
      genarateVoucherNoUrl = String.Join('/', this.apiConfigService.getStockissuesnosList, branch);
    }
    else
    {
      genarateVoucherNoUrl = String.Join('/', this.apiConfigService.getStockissuesnosList, this.branchFormData.get('fromBranchCode').value);
    }
    this.apiService.apiGetRequest(genarateVoucherNoUrl).subscribe(
      response =>
      {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['StackissueNo']))
            {
              this.issueno= res.response['StackissueNo']
              this.branchFormData.patchValue
              ({
                issueNo: res.response['StackissueNo']
              });
              this.spinner.hide();
            }
          }
        }
      });
    this.gettingtobranches();
  }


  //tobranch Name;
  gettingtobranches()
  {
   // debugger;
    let gettingtobranchesListUrl;
    if (this.branchFormData.get('fromBranchCode').value == null)
    {
      gettingtobranchesListUrl = String.Join('/', this.apiConfigService.GetToBranchesList);
    }
    else {
      gettingtobranchesListUrl = String.Join('/', this.apiConfigService.gettingtobranchesList, this.branchFormData.get('fromBranchCode').value);
    }
    this.apiService.apiGetRequest(gettingtobranchesListUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response['branch']) && res.response['branch'].length)
            {
              console.log(res.response['branch']);
              this.toBranchCode = res.response['branch']
              this.branchFormData.patchValue
                ({
                  toBranchCode: res.response['branch']
                });
              //this.GettoBranchesListArray = res.response['branch'];
              this.spinner.hide();
            }
          }
        }
      });
  }


  private filter(value: string): string[]
  {
    const filterValue = value.toLowerCase();
    return this.getmemberNamesArray.filter(option => option.text.toLowerCase().includes(filterValue));
  }

  addTableRow()
  {
    //debugger;
    const tableObj =
    {
      productCode: '', productName: '', hsnNo: '', unit: '', qty: '', rate: '', grossAmount: '', availStock: '', batchNo: '', delete: '', text: 'obj'
    };

    if (!isNullOrUndefined(this.dataSource)) {
      this.dataSource.data.push(tableObj);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    } else {
      this.dataSource = new MatTableDataSource([tableObj]);
    }
    this.dataSource.paginator = this.paginator;
  }

  formGroup()
  {
    
    this.tableFormData = this.formBuilder.group({
      issueNo: [null],
      issueDate: [null],
      shiftId: [null],
      userId: [null],
      employeeId: [null],
      productCode: [null, [Validators.required]],
      productName: [null, [Validators.required]],
      hsnNo:'0',
      unit: [null],
      qty: [null],
      rate: [null],
      grossAmount: [null],
      availStock: [null],
      batchNo: [null],
      delete: [null],
    });
  }


  setToFormModel(text, column, value)
  {
    this.tableFormObj = true;
    if (text == 'obj') {
      this.tableFormData.patchValue
      ({
        [column]: value
      });
    }
    if (this.tableFormData.valid)
    {
      this.addTableRow();
      this.formGroup();
      this.tableFormObj = false;
    }
  }

  clearQty(index, value, column) {
    this.dataSource.data[index].qty = null;
    this.dataSource.data[index].fQty = null;
    this.dataSource.data[index][column] = value;
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }

  deleteRow(i) {
    this.dataSource.data = this.dataSource.data.filter((value, index, array) => {
      return index !== i;
    });
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);
  }

  getProductByProductCode(value) {
    if (!isNullOrUndefined(value) && value != '') {
      const getProductByProductCodeUrl = String.Join('/', this.apiConfigService.getProductByProductCode);
      this.apiService.apiPostRequest(getProductByProductCodeUrl, { productCode: value }).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['Products'])) {
                this.getProductByProductCodeArray = res.response['Products'];
                this.spinner.hide();
              }
            }
          }
        });
    } else {
      this.getProductByProductCodeArray = [];
    }
  }

  //Autocomplete code
  getProductByProductName(value) {
    //debugger;
    if (!isNullOrUndefined(value) && value != '') {
      const getProductByProductNameUrl = String.Join('/', this.apiConfigService.getProductByProductName);
      this.apiService.apiPostRequest(getProductByProductNameUrl, { productName: value }).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['Products'])) {
                this.getProductByProductNameArray = res.response['Products'];
                this.spinner.hide();
              }
            }
          }
        });
    } else {
      this.getProductByProductNameArray = [];
    }
  }


  //getProductByProductCode(value) {
  //  if (!isNullOrUndefined(value) && value != '') {
  //    const getProductByProductCodeUrl = String.Join('/', this.apiConfigService.getProductByProductCode, value);
  //    this.apiService.apiGetRequest(getProductByProductCodeUrl).subscribe(
  //      response => {
  //        const res = response.body;
  //        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //          if (!isNullOrUndefined(res.response)) {
  //            if (!isNullOrUndefined(res.response['Products'])) {
  //              this.getProductByProductCodeArray = res.response['Products'];
  //              this.spinner.hide();
  //            }
  //          }
  //        }
  //      });
  //  } else {
  //    this.getProductByProductCodeArray = [];
  //  }
  //}

  ////Autocomplete code
  //getProductByProductName(value) {
  //  if (!isNullOrUndefined(value) && value != '') {
  //    const getProductByProductNameUrl = String.Join('/', this.apiConfigService.getProductByProductName, value);
  //    this.apiService.apiGetRequest(getProductByProductNameUrl).subscribe(
  //      response => {
  //        const res = response.body;
  //        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //          if (!isNullOrUndefined(res.response)) {
  //            if (!isNullOrUndefined(res.response['Products'])) {
  //              this.getProductByProductNameArray = res.response['Products'];
  //              this.spinner.hide();
  //            }
  //          }
  //        }
  //      });
  //  } else {
  //    this.getProductByProductNameArray = [];
  //  }
  //}

  //Code based getting data
  getdata(productCode)
  {
    //debugger;
    if (!isNullOrUndefined(this.branchFormData.get('fromBranchCode').value) && this.branchFormData.get('fromBranchCode').value != '' &&
      !isNullOrUndefined(productCode.value) && productCode.value != '') {
      const getBillingDetailsRcdUrl = String.Join('/', this.apiConfigService.GetProductLists, productCode.value,
        this.branchFormData.get('fromBranchCode').value);
      this.apiService.apiGetRequest(getBillingDetailsRcdUrl).subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              if (!isNullOrUndefined(res.response['productsList'])) {
                this.DetailsSection(res.response['productsList']);
                this.spinner.hide();
              }
            }
          }
        });
    }
  }

  //assign data
  DetailsSection(obj)
  {
    this.dataSource.data = this.dataSource.data.map(val =>
    {
      if (val.productCode == obj.productCode) {
        this.tableFormData.patchValue
          ({
            productCode: obj.productCode,
            productName: obj.productName
          });
        val = obj;
      }
      val.text = 'obj';
      return val;
    });
    this.setToFormModel(null, null, null);
  }

  setProductName(name)
  {
    this.tableFormData.patchValue
    ({
      productName: name.value
    });
    this.setToFormModel(null, null, null);
  }
   
  
  //Calaculating code
  calculateAmount(row, index)
  {
    //debugger;
    let amount = 0;
    for (let a = 0; a < this.dataSource.data.length; a++)
    {
      if (this.dataSource.data[a].qty)
      {
        amount = (this.dataSource.data[a].qty) * (this.dataSource.data[a].rate);
        this.dataSource.data[a]['grossAmount'] = amount;
      }
    }
    this.tableFormData.patchValue
    ({
      grossAmount: amount
      
    });
  }
 
  //Save Code
  save()
  {
    //debugger;
    var index = this.dataSource.data.indexOf(1);
    this.dataSource.data.splice(index, 1);
    if (this.routeUrl != '')
    {
      return;
    }
    let availStock = this.dataSource.filteredData.filter(stock =>
    {
      if (stock.availStock == 0 || (isNullOrUndefined(stock.qty) && isNullOrUndefined(stock.rate)))
      {
        return stock;
      }
    });
    if (availStock.length)
    {
      this.alertService.openSnackBar(`This Product(${availStock[0].productCode}) 0 Availablilty Stock`, Static.Close, SnackBar.error);
      return;
    }
    if (!this.tableFormObj)
    {
      this.dataSource.data.pop();
    }
    if (this.dataSource.data.length == 0)
    {
      return;
    }
    
    this.registerStackissues();
  }

  registerStackissues() {
   // debugger;
    const registerInvoiceUrl = String.Join('/', this.apiConfigService.registerStockissues);
    const requestObj = { StockissueHdr: this.branchFormData.value, StockissueDtl: this.dataSource.data };
    this.apiService.apiPostRequest(registerInvoiceUrl, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass)
        {
          if (!isNullOrUndefined(res.response))
          {
            this.alertService.openSnackBar('Stock Issues Created Successfully..', Static.Close, SnackBar.success);
            //this.branchFormData.reset();
          }
          this.reset();

          this.spinner.hide();

        }
      });
  }

  reset() {
    this.branchFormData.reset();
    this.dataSource = new MatTableDataSource();
    this.formGroup();
    this.branchFormData = this.formBuilder.group({
      issueNo: [null],
      issueDate: [(new Date()).toISOString()],
      fromBranchCode: [null],
      fromBranchName: [null],
      toBranchCode: [null],
      toBranchName: [null],
      serverDateTime: [null],
      shiftId: [null],
      userId: '0',
      userName: [null],
      employeeId: [null],
      remarks: [null],
      operatorStockIssueId: '0',
      // printBill: [false],

    });
   this.ngOnInit();
  }

}
