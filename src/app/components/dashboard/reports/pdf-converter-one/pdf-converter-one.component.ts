import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf-converter-one',
  templateUrl: './pdf-converter-one.component.html',
  styleUrls: ['./pdf-converter-one.component.scss']
})
export class PdfConverterOneComponent implements OnInit {

  constructor() { }

  pdfData = {
    title: 'Tkdlomacs',
    subTitle: 'Sales Analysis Report',
    header: {
      'Branch': 'GOLLAPUDI',
      'GSTIN': '37AABAT0214F1ZZ',
      'Address': 'GOLLAPUDI,VIJAYAWADA',
      'Report Date': '22-Jan-2020',
      'From': '01-Apr-2019 12:00 am',
      'To': '01-Apr-2019 11:59 pm',
      'Created By': 'admin'
    },
    tableData: [
      {
        title: 'DIESEL',
        row: [
          {
            'Product Code': 'D',
            'Product Name': 'H.S.D.',
            'Unit Name': 'LTRS',
            'Qty': '16978.39',
            'Liters': '16978.39',
            'Amount': '1200773.03'
          }
        ],
        total: {
          'title': 'DIESEL SALES',
          'QtyTotal': '16978.39',
          'LitersTotal': '16978.39',
          'Amount': '1200773.03 '
        }
      },
      {
        title: 'MOTOR SPIRIT',
        row: [
          {
            'Product Code': 'XP',
            'Product Name': 'XTRA PREMIUM PETROL',
            'Unit Name': 'LTRS',
            'Qty': '89.08',
            'Liters': '89.08',
            'Amount': '7056.01 '
          },
          {
            'Product Code': 'P',
            'Product Name': 'M.S.',
            'Unit Name': 'LTRS',
            'Qty': '891.08',
            'Liters': '891.08',
            'Amount': '70561.01 '
          }
        ],
        total: {
          'title': 'MOTOR SPIRIT',
          'QtyTotal': '169782.39',
          'LitersTotal': '169782.39',
          'Amount': '120077322.03 '
        }
      },
      {
        title: 'LOOSE',
        row: [
          {
            'Product Code': 'D',
            'Product Name': 'H.S.D.',
            'Unit Name': 'LTRS',
            'Qty': '16978.39',
            'Liters': '16978.39',
            'Amount': '1200773.03'
          },
          {
            'Product Code': 'XP',
            'Product Name': 'XTRA PREMIUM PETROL',
            'Unit Name': 'LTRS',
            'Qty': '89.08',
            'Liters': '89.08',
            'Amount': '7056.01 '
          },
          {
            'Product Code': 'P',
            'Product Name': 'M.S.',
            'Unit Name': 'LTRS',
            'Qty': '891.08',
            'Liters': '891.08',
            'Amount': '70561.01 '
          },
          {
            'Product Code': 'XP',
            'Product Name': 'XTRA PREMIUM PETROL',
            'Unit Name': 'LTRS',
            'Qty': '89.08',
            'Liters': '89.08',
            'Amount': '7056.01 '
          },
          {
            'Product Code': 'P',
            'Product Name': 'M.S.',
            'Unit Name': 'LTRS',
            'Qty': '891.08',
            'Liters': '891.08',
            'Amount': '70561.01 '
          }
        ],
        total: {
          'title': 'LOOSE',
          'QtyTotal': '169728.39',
          'LitersTotal': '16978.39',
          'Amount': '1200773.03 '
        }
      },
      {
        title: 'LOOSE',
        row: [
          {
            'Product Code': 'D',
            'Product Name': 'H.S.D.',
            'Unit Name': 'LTRS',
            'Qty': '16978.39',
            'Liters': '16978.39',
            'Amount': '1200773.03'
          },
          {
            'Product Code': 'XP',
            'Product Name': 'XTRA PREMIUM PETROL',
            'Unit Name': 'LTRS',
            'Qty': '89.08',
            'Liters': '89.08',
            'Amount': '7056.01 '
          },
          {
            'Product Code': 'P',
            'Product Name': 'M.S.',
            'Unit Name': 'LTRS',
            'Qty': '891.08',
            'Liters': '891.08',
            'Amount': '70561.01 '
          },
          {
            'Product Code': 'XP',
            'Product Name': 'XTRA PREMIUM PETROL',
            'Unit Name': 'LTRS',
            'Qty': '89.08',
            'Liters': '89.08',
            'Amount': '7056.01 '
          },
          {
            'Product Code': 'P',
            'Product Name': 'M.S.',
            'Unit Name': 'LTRS',
            'Qty': '891.08',
            'Liters': '891.08',
            'Amount': '70561.01 '
          }
        ],
        total: {
          'title': 'LOOSE',
          'QtyTotal': '169728.39',
          'LitersTotal': '16978.39',
          'Amount': '1200773.03 '
        }
      }
    ]
  }

  ngOnInit() {
  }

  asIsOrder(a, b) {
    return 1;
  }

  downloadPDF() {
    html2canvas(document.getElementById('pdfDownload')).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }

}
