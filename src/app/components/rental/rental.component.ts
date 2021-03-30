import { Component, Input, OnInit } from '@angular/core';
import { CarDetail } from '../models/cardetail';
import { CustomerDetail } from '../models/customerdetail';
import { Rental } from '../models/rental';
import { CustomerdetailService } from '../services/customerdetail.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  custormerDetails: CustomerDetail[]=[];
  customerId:number;
  rentDate:Date;
  returnDate:Date;

  rentals:Rental;

  @Input() carforRent:CarDetail  // I Love U Ceren Bıdık <3 :)


  constructor(private customerDetailService:CustomerdetailService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

   getCustomers(){
    this.customerDetailService.getCustomerAll().subscribe(reponse=>{
      this.custormerDetails =reponse.data;
      console.log(this.custormerDetails)
    })
   }

   createNewRental(){
    let rental:Rental={
      carId:this.carforRent.carId,
      customerId:Number(this.customerId),
      rentDate:this.rentDate,
      returnDate:this.returnDate
    }
    this.rentals = rental;
    console.log(this.rentals);
   }
  
}
