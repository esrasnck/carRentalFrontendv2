import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerDetail } from 'src/app/models/customerdetail';

import { CustomerdetailService } from '../../services/customerdetail.service';

@Component({
  selector: 'app-customerdetail',
  templateUrl: './customerdetail.component.html',
  styleUrls: ['./customerdetail.component.css']
})
export class CustomerdetailComponent implements OnInit {

  dataLoaded = false;
  customerDetails:CustomerDetail[]=[];


  constructor(private customerDetailService:CustomerdetailService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['carId']){
        this.getCustomerDetail(params['carId'])
      }
    })
  }

  getCustomerDetail(carId:number){
    this.customerDetailService.getCustomerDetail(carId).subscribe(response=>{
      this.customerDetails = response.data;
      this.dataLoaded = true;
    })
  }
}
