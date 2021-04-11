import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {DatePipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './customer/customer.component';
import { ShowCustomersComponent } from './customer/show-customers/show-customers.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { CustomerService } from './services/customer.service';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { PlansComponent } from './plans/plans.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewCustomerComponent } from './customer/view-customer/view-customer.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';





@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    ShowCustomersComponent,
    EditCustomerComponent,
    AddCustomerComponent,
    PlansComponent,
    ViewCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatInputModule,MatIconModule,
    MatButtonModule,HttpClientModule,MatSortModule,MatDialogModule,FormsModule,MatSnackBarModule,
    MatDatepickerModule,MatNativeDateModule,MatMomentDateModule

    
  ],
  providers: [CustomerService,DatePipe,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
  entryComponents:[AddCustomerComponent,EditCustomerComponent]
})
export class AppModule { }
