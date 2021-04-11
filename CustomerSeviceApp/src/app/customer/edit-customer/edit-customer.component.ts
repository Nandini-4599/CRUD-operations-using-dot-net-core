import { Customer } from './../../models/customer.model';
import { AddCustomerComponent } from './../add-customer/add-customer.component';
import { DatePipe, formatDate } from '@angular/common';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

// export const PICK_FORMATS = {
//   parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
//   display: {
//       dateInput: 'input',
//       monthYearLabel: {year: 'numeric', month: 'short'},
//       dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
//       monthYearA11yLabel: {year: 'numeric', month: 'long'}
//   }
// };

// class PickDateAdapter extends NativeDateAdapter {
//   format(date: Date, displayFormat: Object): string { 

//       if (displayFormat === 'input') {
//           return formatDate(date,'dd-MMM-yyyy',this.locale,('0530'));
//       } else {
//           return date.toDateString();
//       }
//   }
// }




@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
//   providers: [
//     {provide: DateAdapter, useClass: PickDateAdapter},
//     {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS},
//     { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
// ]
 

})
export class EditCustomerComponent implements OnInit {

  todayDate:Date = new Date();

  constructor(public dialog:MatDialogRef<EditCustomerComponent>,
    public service:CustomerService,private snackbar:MatSnackBar,public datepipe:DatePipe) {
     // this.customer.firstOrderDate = datepipe.transform('dd MMMM yyyy', 'MMMM d, y');
     }


  ngOnInit(): void {
  }

  onClose()
  {
    this.dialog.close();
    this.service.filter('Register click')
  }


  omit_special_char(event)
  {   
     var k;  
     k = event.charCode;  //         k = event.keyCode;  (Both can be used)
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

  omit_special_digit(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k==46|| (k >= 48 && k <= 57)); 
}

  onSubmit(myform:NgForm)
  {
    this.service.updateDepartment(myform.value).subscribe(res=>
    { // this.datepipe.transform(myform.value.firstOrderDate,'MMMM d, y')
       this.snackbar.open(res.toString(),'',{
        duration:3000,
        verticalPosition:'top',
        panelClass: ['notif-success']
    })
    this.dialog.close();
    this.service.filter('Register click')
  });
}

}
