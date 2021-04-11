import { ViewCustomerComponent } from './../view-customer/view-customer.component';
import { EditCustomerComponent } from './../edit-customer/edit-customer.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Customer } from './../../models/customer.model';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { CustomerService } from 'src/app/services/customer.service';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { AddCustomerComponent } from '../add-customer/add-customer.component';

@Component({
  selector: 'app-show-customers',
  templateUrl: './show-customers.component.html',
  styleUrls: ['./show-customers.component.css']
})
export class ShowCustomersComponent implements OnInit {

  constructor(private service:CustomerService,private dialog:MatDialog,private snackbar:MatSnackBar) { 
    //for updating the table when we are adding new department
    this.service.listen().subscribe((m:any)=>{
      console.log(m);
      this.refreshCustList();  
    })
  }

  listData : MatTableDataSource<any>;
  displayedColumns: string[] = ['customerCode','fullName','customerType','isActive','Options']

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngOnInit(): void {
    this.refreshCustList();
  }
 

  refreshCustList()
  {
    this.service.getCustomerList().subscribe(data =>{
      this.listData = new MatTableDataSource(data);
      console.log(data);
     this.listData.sort = this.sort;
     });
  }
   
  applyFilter(filtervalue:string)
  {
    this.listData.filter= filtervalue.trim().toLocaleLowerCase();
  }

  

  onEdit(cust:Customer)
  {
    this.service.formData=cust;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(EditCustomerComponent,dialogConfig);
  }

  onView(cust:Customer)
  {
    this.service.formData=cust;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(ViewCustomerComponent,dialogConfig);

  }

  onDelete(id:number)
  {
    //console.log(id);
    if(confirm("Are you sure you want to delete??"))
    this.service.deleteCustomer(id).subscribe(res=>{
      this.refreshCustList();
      this.snackbar.open(res.toString(),'',{
        duration:3000,
        verticalPosition:'top',
        panelClass: ['notif-danger']
      })
     } );
  }

  onAdd()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(AddCustomerComponent,dialogConfig);
  }

}
