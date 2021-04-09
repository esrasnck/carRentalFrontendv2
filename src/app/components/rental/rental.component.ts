import { Component, Input, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/cardetail';
import { CustomerDetail } from 'src/app/models/customerdetail';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';

import { CustomerdetailService } from '../../services/customerdetail.service';

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
  state:number=1;
  rentals:Rental;
  message:string

  @Input() carforRent:CarDetail  // I Love U Ceren Bıdık <3 :)


  constructor(private customerDetailService:CustomerdetailService, private authService: AuthService) { }

  ngOnInit(): void {}


   createNewRental(){
    let rental:Rental={
      carId:this.carforRent.carId,
      customerId:this.authService.user.customerId,
      rentDate:this.rentDate,
      returnDate:this.returnDate
    }
    this.rentals = rental;
   }

   changeState(e:any){
     console.log(e)
     this.state = e
   }

   errorMessage(e:any){
    this.message = e
   }
  

   isAuthenticated(){
    return this.authService.isAuthenticated()
  }
}
