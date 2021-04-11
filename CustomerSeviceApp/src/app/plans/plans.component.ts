import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  constructor(private service:CustomerService) { }
  listData : MatTableDataSource<any>;
  displayedColumns: string[] = ['id','name']

  ngOnInit(): void {
    this.refreshPlansList();
  }

  refreshPlansList()
  {
    this.service.getPlansList().subscribe(data =>{
      this.listData = new MatTableDataSource(data);
      console.log(data);
     // this.listData.sort = this.sort;
     });
  }
  }


