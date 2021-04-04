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
    if (response.success) {
      this.toasterService.success("ödeme alındı")
      
    }
   else {
     this.toasterService.error("ödeme alınamadı.")
   }

    console.log("odeme yapıldı");
  
  })
  this.rentalService.addRental(this.rents).subscribe(response=>{
    this.toasterService.success("araba kiralandı")
    console.log("thnk yu ceren");
  })

  }

  goToPayment(){
    this.state = 2
    this.changeState.emit(this.state)
  }

}
