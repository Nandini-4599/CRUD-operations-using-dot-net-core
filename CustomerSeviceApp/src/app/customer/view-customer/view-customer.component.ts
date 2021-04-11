import { DatePipe, formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

export const PICK_FORMATS = {
  parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
  display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'short'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string { 

      if (displayFormat === 'input') {
          return formatDate(date,'dd-MMM-yyyy',this.locale);
      } else {
          return date.toDateString();
      }
  }
}


@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
]
})
export class ViewCustomerComponent implements OnInit {

 enabled : boolean=true;
  constructor(public dialog:MatDialogRef<ViewCustomerComponent>,
    public service:CustomerService,private snackbar:MatSnackBar,public datepipe:DatePipe) { }

  
  ngOnInit(): void {
  }

  onClose()
  {
    this.dialog.close();
    this.service.filter('Register click')
  }



 
  onSubmit(myform:NgForm)
  {
    this.service.updateDepartment(myform.value).subscribe(res=>
      
    {  this.datepipe.transform(myform.value.firstOrderDate,'MMMM d, y')
        this.snackbar.open(res.toString(),'',{
        duration:3000,
        verticalPosition:'top'
    })
  });

  }
}

