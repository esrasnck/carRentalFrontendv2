import { Component, Input, OnInit } from '@angular/core';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { PaymentService } from '../services/payment.service';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  creditCardNumber:string;
  expirationDate:string;
  securityCode:string;
  price:number;

 @Input() rents:Rental

  constructor(private paymentService:PaymentService, private rentalService:RentalService) { }

  ngOnInit(): void {
  }
 
  addPayment(){
  let payment:Payment={
    customerId:this.rents.customerId,
    creditCardNumber:this.creditCardNumber,
    expirationDate:this.expirationDate,
    securityCode:this.securityCode,
    money:this.price
  };
  this.paymentService.addPayment(payment).subscribe(response=>{
    console.log("odeme yapıldı");
  
  })
  this.rentalService.addRental(this.rents).subscribe(response=>{
    console.log("thnk yu ceren");
  })

  }

  

}
