import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarDetail } from 'src/app/models/cardetail';
import { CustomerDetail } from 'src/app/models/customerdetail';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';

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
  minDate?: string = '';
  maxDate?: string = '';

  @Input() carforRent:CarDetail  // I Love U Ceren Bıdık <3 :)


  constructor(private customerDetailService:CustomerdetailService,
    private paymentService:PaymentService, private authService: AuthService,private router:Router,private datePipe:DatePipe) { }

  ngOnInit(): void {

    
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
  }


   createNewRental(){
    let rental:Rental={
      carId:this.carforRent.carId,
      customerId:this.authService.user.customerId,
      rentDate:this.rentDate,
      returnDate:this.returnDate
    }
    this.rentals = rental;
    this.paymentService.rentals =rental;
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

  payment(){
    let rental:Rental={
      carId:this.carforRent.carId,
      customerId:this.authService.user.customerId,
      rentDate:this.rentDate,
      returnDate:this.returnDate
    }
    this.rentals = rental;
    if (this.rentals?.rentDate !== undefined) {
      this.paymentService.rentals =rental;
      var myModal = document.querySelector('.modal-backdrop')
      var x = document.getElementsByTagName("BODY")[0];
      x.classList.remove("modal-open")
      myModal.remove()
      this.router.navigate(["cardetails/payment"])
      window.scrollTo(0,0)
    }
    else{
      console.log("Rent date lazım")
    }
  }

  totalAmount(){
    let differance = new Date(this.returnDate).getTime() -  new Date(this.rentDate).getTime();
    let price = new Date(differance).getDate();
    this.paymentService.totalPrice = price * this.carforRent.dailyPrice;
  }


  minDateChange(date: any) {
    this.minDate = date.target.value;
    this.maxDate = this.datePipe.transform(
      new Date(
        new Date(this.minDate).setFullYear(new Date().getFullYear() + 1)
      ),
      'yyyy-MM-dd'
    );
  }

}
