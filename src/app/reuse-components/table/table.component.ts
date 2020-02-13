import {
  Component, OnInit, ViewChild, Input, OnChanges,
  ChangeDetectorRef, Output, EventEmitter, AfterViewInit, OnDestroy
} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatTable } from '@angular/material';
import { CommonService } from '../../services/common.service';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';
import { DeleteItemComponent } from '../delete-item/delete-item.component';
// search

import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect } from '@angular/material';
import { User } from '../../models/common/user';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit , OnDestroy {

  /** control for the selected bank for multi-selection */
  public tableMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public tableMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredTableMulti: ReplaySubject<any> = new ReplaySubject<any>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected onDestroy = new Subject<void>();

  @Input() tableData: any;
  @Input() addOrUpdateData: any;
  @Output() addOrUpdateEvent = new EventEmitter();


  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  highlightedRows = [];
  columnDefinitions = [];
  filterColData = [];


  keys = [];
  index: any;
  showDataNotFound = false;
  user: User;
  routeParam: any;

  constructor(
    private commonService: CommonService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    activatedRoute.params.subscribe(params => {
      this.routeParam = params.id;
    });
  }

  defaultValues() {
    this.dataSource = new MatTableDataSource();
    this.highlightedRows = [];
    this.columnDefinitions = [];
    this.filterColData = [];
    this.keys = [];
    this.index = null;
    this.showDataNotFound = false;
  }

  highlightRows(row, i) {
    if (this.highlightedRows.length) {
      if (this.index === i) {
        this.highlightedRows = [];
        this.index = null;
      } else {
        this.highlightedRows = [];
        this.highlightedRows.push(row);
        this.index = i;
      }
    } else {
      this.highlightedRows = [];
      this.highlightedRows.push(row);
      this.index = i;
    }
  }


  openDialog(val, row?, i?) {
    let data;
    if (!isNullOrUndefined(row)) {
      data = { action: val, item: row };
      this.highlightedRows = [row];
    } else {
      data = { action: val, item: this.highlightedRows[0] };
    }

    if (data.action === 'Delete' && this.highlightedRows.length) {
      this.addOrUpdateEvent.emit(data);
    } else if (data.action === 'Edit' && this.highlightedRows.length && this.user.canEdit !== 'Edit') {
      this.addOrUpdateEvent.emit(data);
    } else if (data.action === 'Add') {
      data.item = null;
      this.addOrUpdateEvent.emit(data);
    }

  }

  updateRowData(rowObj) {
    // for (let t = 0; t < this.tableData.length; t++) {
    //   if (this.tableData[t].code === rowObj.code) {
    //     this.tableData[t] = rowObj;
    //   }
    // }
    this.tableData[this.index] = rowObj;
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteRowData() {
    this.tableData = this.tableData.filter((value, index, array) => {
      return index !== this.index;
    });
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  addRowData(rowObj) {
    this.tableData.unshift(rowObj);
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    this.highlightedRows = [];

    if (!isNullOrUndefined(this.addOrUpdateData)) {

      if (this.addOrUpdateData.action === 'Edit') {
        this.updateRowData(this.addOrUpdateData.item);
      } else if (this.addOrUpdateData.action === 'Add') {
        this.addRowData(this.addOrUpdateData.item);
      } else if(this.addOrUpdateData.action === 'Delete') {
        this.deleteRowData();
      }

    } else {

      if (!isNullOrUndefined(this.tableData)) {
        if (this.tableData.length > 0) {
          this.showDataNotFound = false;
          this.dataSource = new MatTableDataSource(this.tableData);
        } else {
          this.showDataNotFound = true;
        }
      }

      if (!isNullOrUndefined(this.dataSource)) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

      if (!isNullOrUndefined(this.tableData) && this.tableData.length > 0) {

        // tslint:disable-next-line:forin
        for (const key in this.tableData[0]) {
          this.keys.push({ col: key });
        }

        let col = [];
        this.keys.forEach(cols => {
          const obj = {
            def: cols.col, label: cols.col, hide: true
          };
          col.push(obj);
        });

        this.translate.get(this.routeParam).subscribe(res => {
          let key;
          for (key in res) {
            for (let c = 0; c < col.length; c++) {
              if (key == col[c]['def']) {
                this.columnDefinitions.push(col[c])
              }
            }
          }
          console.log( this.columnDefinitions);

        });
      }


      if (!isNullOrUndefined(this.tableData) && this.tableData.length > 0) {
        this.filteredTableMulti.next(this.columnDefinitions.slice());

        this.tableMultiFilterCtrl.valueChanges
          .pipe(takeUntil(this.onDestroy))
          .subscribe(() => {
            this.filterBanksMulti();
          });

      }


    }



  }


  ngAfterViewInit() {
    // this.multiSelect.open();
    this.cdr.detectChanges();
  }

  protected filterBanksMulti() {
    if (!this.columnDefinitions) {
      return;
    }
    // get the search keyword
    let search = this.tableMultiFilterCtrl.value;
    if (!search) {
      this.filteredTableMulti.next(this.columnDefinitions.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredTableMulti.next(
      this.columnDefinitions.filter(bank => bank.def.toLowerCase().indexOf(search) > -1)
    );
  }

  toggleSelectAll(selectAllValue: boolean) {
    this.filteredTableMulti.pipe(take(1), takeUntil(this.onDestroy))
      .subscribe(val => {
        if (selectAllValue) {
          this.tableMultiCtrl.patchValue(val);
        } else {
          this.tableMultiCtrl.patchValue([]);
        }
      });
  }




  checkboxCheck(index) {

    this.filterColData[index] = { def: this.filterColData[index].def,
      label: this.filterColData[index].label,  hide: !this.filterColData[index].hide };

  }


  saveChanges() {
    this.columnDefinitions = this.filterColData.slice(0);
    this.filterColData = [];
  }


  filterData() {
    this.filterColData = [];
    this.filterColData = this.columnDefinitions.slice(0);
  }

  cancleChanges() {
    this.filterColData = [];
    this.filterColData = this.columnDefinitions.slice(0);
  }

  ngOnInit() {
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getDisplayedColumns(): string[] {
    if (!isNullOrUndefined(this.tableData)) {
      return this.columnDefinitions.filter(cd => cd.hide).map(cd => cd.def);
    }
  }

  ngOnDestroy() {
    this.tableData = [];
  }

}
