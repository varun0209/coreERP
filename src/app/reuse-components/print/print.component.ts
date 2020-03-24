import { Component, OnInit, Optional, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit, AfterViewInit {
  invoiceHdr: any;
  invoiceDetail: any;
  constructor(
    public dialogRef: MatDialogRef<PrintComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.invoiceHdr = data.InvoiceHdr;
    this.invoiceDetail = data.InvoiceDetail;



  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
    this.dialogRef.close();
  }
}
