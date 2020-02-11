import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-new',
  templateUrl: './table-new.component.html',
  styleUrls: ['./table-new.component.scss']
})
export class TableNewComponent implements OnInit {

  @Input() tableData: any;
  userForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.userForm = this.fb.group({
           users: this.fb.array([])
  });
  }
  initiatForm(): FormGroup {
  return this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobNumber: ['']
  });
  }
  addUser() {
    const control = <FormArray>this.userForm.get('users');
    control.push(this.initiatForm());
  }
  remove(index: number) {
    const control = <FormArray>this.userForm.get('users');
    control.removeAt(index);
  }
  save() {
    console.log(this.userForm.value);
  }

}
