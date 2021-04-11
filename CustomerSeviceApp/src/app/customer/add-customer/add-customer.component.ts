import { Customer } from './../../models/customer.model';
import { DatePipe, formatDate } from '@angular/common';
import { Plans } from './../../models/plans.model';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as moment from 'moment';



@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
  
})
export class AddCustomerComponent implements OnInit {

  todayDate:Date = new Date();
  constructor(public dialog:MatDialogRef<AddCustomerComponent>,
    public service:CustomerService,private snackbar:MatSnackBar,public datepipe:DatePipe) {
     
     }

    

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(myform?:NgForm)
  {
    if(myform!=null)
    myform.resetForm();

    this.service.formData={
      id:0,
    customerCode:null,
    fullName:'',
    customerType:0,
    planId:0,
    amtDue:null,
    firstOrderDate:new Date(),
    address:'',
    pinCode:null,
    isActive:false,
    name:''
   
      
    }

   
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


  onClose()
  {
    this.dialog.close();
    this.service.filter('Register click')
  }

  onSubmit(myform:NgForm)
  {
    console.log(myform.value);
    this.service.addCustomer(myform.value).subscribe(res=>{
      this.resetForm(myform); 
    //implementation of snackbar instead of alert
    this.snackbar.open(res.toString(),'',{
      duration:3000,
      verticalPosition:'top',
      panelClass: ['notif-success']
    })
    this.dialog.close();
      this.service.filter('Register click');
  });
}

}
