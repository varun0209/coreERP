import {
  Component, OnInit, ViewChild, Input, OnChanges,
  ChangeDetectorRef, Output, EventEmitter, AfterViewInit, OnDestroy
} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatTable } from '@angular/material';
import { CommonService } from '../../services/common.service';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material';
import { User } from '../../models/common/user';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

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
  @Output() addOrUpdateEvent = new EventEmitter();
  @Input() addOrUpdateData: any;


  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  highlightedRows = [];
  columnDefinitions = [];
  filterColData = [];
  doubleClick = 0;
  keys = [];
  showDataNotFound = false;
  user: User;
  routeParam: any;

  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
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
    this.showDataNotFound = false;
  }

  highlightRows(row?) {
    if (!isNullOrUndefined(row)) {
          this.highlightedRows = [];
          this.highlightedRows.push(row);
    }
  }

  setIndex(row) {
      this.highlightedRows = [];
      this.highlightedRows.push(row);
  }


  openDialog(val, row?) {
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


  ngOnChanges() {
    this.highlightedRows = [];

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
        const col = [];
        this.keys.forEach(cols => {
          const obj = {
            def: cols.col, label: cols.col, hide: true
          };
          col.push(obj);
        });

        this.translate.get(this.routeParam).subscribe(res => {
          let key;
          // tslint:disable-next-line: forin
          for (key in res) {
            // tslint:disable-next-line: prefer-for-of
            for (let c = 0; c < col.length; c++) {
              if (key == col[c].def) {
                this.columnDefinitions.push(col[c]);
              }
            }
          }
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


  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  protected filterBanksMulti() {
    if (!this.columnDefinitions) {
      return;
    }
    let search = this.tableMultiFilterCtrl.value;
    if (!search) {
      this.filteredTableMulti.next(this.columnDefinitions.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
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
    this.filterColData[index] = {
      def: this.filterColData[index].def,
      label: this.filterColData[index].label, hide: !this.filterColData[index].hide
    };
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
