import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MastersService } from '../../components/dashboard/masters/masters.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../services/api.service';
import { String } from 'typescript-string-operations';
import { isNullOrUndefined } from 'util';
import { StatusCodes } from '../../enums/common/common';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss']
})
export class DeleteItemComponent  {

  deleteData: any;
  tableUrl: any;

  constructor(
    public dialogRef: MatDialogRef<DeleteItemComponent>,
    private activatedRoute: ActivatedRoute,
    private mastersService: MastersService,
    private spinner: NgxSpinnerService,
    private apiService: ApiService,

    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

      this.deleteData = {...data};
  }

  doAction() {
           this.dialogRef.close(this.deleteData);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
