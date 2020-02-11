import { Component, Inject, Optional, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
@Component({
  selector: 'app-accountsgroup',
  templateUrl: './accountsgroup.component.html',
  styleUrls: ['./accountsgroup.component.scss']
})

export class AccountsGroupComponent  implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AccountsGroupComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
        groupCode: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        groupName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        numberRange: [null],
        active: [null]
      });


      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        this.modelFormData.controls['groupCode'].disable();
      }

  }

  ngOnInit() {

  }




  showErrorAlert(caption: string, message: string) {
      // this.alertService.openSnackBar(caption, message);
  }

  get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['groupCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
