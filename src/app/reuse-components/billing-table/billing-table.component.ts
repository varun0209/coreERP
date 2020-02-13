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
  selector: 'app-billing-table',
  templateUrl: './billing-table.component.html',
  styleUrls: ['./billing-table.component.scss']
})
export class BillingTableComponent implements OnInit {

 

  @Input() tableData: any;


  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  columnDefinitions = [];


  keys = [];
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
    this.columnDefinitions = [];
    this.keys = [];
  }







  ngOnChanges() {



      if (!isNullOrUndefined(this.tableData)) {
        if (this.tableData.length > 0) {
          this.dataSource = new MatTableDataSource(this.tableData);
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

        this.keys.forEach(cols => {
          const obj = {
            def: cols.col, label: cols.col, hide: true
          };
          this.columnDefinitions.push(obj);
        });
      }




  }


  ngAfterViewInit() {
    // this.multiSelect.open();
    this.cdr.detectChanges();
  }









  ngOnInit() {
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
