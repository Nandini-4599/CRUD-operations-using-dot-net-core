import { Customer } from './../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Plans } from '../models/plans.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  formData: Customer;
  readonly APIUrl = "https://localhost:44323/api/Customer";
  
  constructor(private http:HttpClient) { }

  getCustomerList():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.APIUrl+"/GetCustomers");
  }

  getPlansList():Observable<Plans[]>
  {
    return this.http.get<Plans[]>(this.APIUrl+"/GetPlans");
  }

  addCustomer(cust:Customer)
  {
    return this.http.post(this.APIUrl+"/AddCustomer",cust,{responseType: 'text'});
  }

  deleteCustomer(id:number)
  {
    return this.http.delete(this.APIUrl+"/DeleteCustomer?id="+id,{responseType: 'text'});
  }

  updateDepartment(customer:Customer)
  {
    return this.http.post(this.APIUrl+"/UpdateCustomer",customer,{responseType: 'text'});
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();

  }

  filter(filterBy:string)
  {
    this._listeners.next(filterBy);
  }
}
