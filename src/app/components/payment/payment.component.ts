import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';

import { PaymentService } from '../../services/payment.service';
import { RentalService } from '../../services/rental.service';

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
 @Input() state:number
 @Output() changeState = new EventEmitter()
 @Output() errorMessage = new EventEmitter()

  constructor(private paymentService:PaymentService, private rentalService:RentalService,private toasterService:ToastrService) { }

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
   
      this.rentalService.addRental(this.rents).subscribe(response=>{
        this.toasterService.success("araba kiralandı")
      
      },responseError=>{
         this.toasterService.error(responseError.errors,"araba kiralanamadı")
      })

  })


  }

  goToPayment(){
    console.log(this.state)
    if(this.rents?.rentDate !== undefined){

      this.state = 2
      this.changeState.emit(this.state)
    }else{
      this.errorMessage.emit("Rent date zorunlu alan!")
    }

  }

}
