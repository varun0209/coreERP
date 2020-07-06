import { Component, Inject, Optional, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
@Component({
  selector: 'app-ptmaster',
  templateUrl: './ptmaster.component.html',
  styleUrls: ['./ptmaster.component.scss']
})

export class PTMasterComponent  implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PTMasterComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
        id:['0'],
        ptslab: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
        location: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        ptlowerLimit: [null, [Validators.required, Validators.pattern("^[0-9\.]*$"), Validators.minLength(1), Validators.maxLength(10)]],
        ptupperLimit: [null, [Validators.required, Validators.pattern("^[0-9\.]*$"), Validators.minLength(1), Validators.maxLength(10)]],
        ptamt: [null, [Validators.required, Validators.pattern("^[0-9\.]*$"), Validators.minLength(1), Validators.maxLength(10)]],
        active: [null],
        ext1: [null]
      });


      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        this.modelFormData.controls['id'].disable();
      }

  }

  ngOnInit() {

  }
 

  get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['id'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
