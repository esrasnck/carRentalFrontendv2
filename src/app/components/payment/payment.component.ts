import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CardserviceService } from 'src/app/services/cardservice.service';

import { PaymentService } from '../../services/payment.service';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm:FormGroup;
  paymentModel:Payment;
  cardModel:Card;
  isPayed:boolean =false;
  isCardEdit:boolean =false;
  totalPrice = this.paymentService.totalPrice;

 @Input() rents:Rental
 @Input() state:number
 @Output() changeState = new EventEmitter()
 @Output() errorMessage = new EventEmitter()

  constructor(private paymentService:PaymentService, 
    private rentalService:RentalService,
    private toasterService:ToastrService,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private cardService:CardserviceService,
    private router:Router) { }

  ngOnInit(): void {
    this.createPaymentForm();
  }

  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      ownerName:['',Validators.required],
      creditCardNumber:['',Validators.required],
      price:this.paymentService.totalPrice,
      expirationDate:['',Validators.required],
      securityCode:['',Validators.required]
    })
  }
 
 
  addPayment(){
    if(this.paymentForm.valid){
      console.log(this.authService.user)
      this.paymentModel= this.paymentForm.value;
      this.paymentModel.customerId = this.authService.user.customerId;
      
      this.cardModel=<Card>{
        customerId : this.authService.user.customerId,
        debts :this.paymentService.totalPrice,
        ownerName :this.paymentForm.controls["ownerName"].value,
        creditCardNumber : this.paymentForm.controls["creditCardNumber"].value,
        securityCode :this.paymentForm.controls["securityCode"].value,
        expirationDate :this.paymentForm.controls["expirationDate"].value,
  
      }
    }; this.cardService.add(this.cardModel).subscribe(response=>{
      // if döngüsü gelecek    
      this.isCardEdit =true;
      if(this.isCardEdit){
        console.log(this.isCardEdit)
        this.paymentService.addPayment(this.paymentModel).subscribe(response=>{
          this.toasterService.success("ödeme alındı");
          this.isPayed=true;
          console.log(this.isPayed);
          if(this.isPayed){
            console.log(this.isPayed)
            this.rentalService.addRental(this.paymentService.rentals).subscribe(response=>{
              this.toasterService.success("araba kiralandı")
              this.router.navigate(["/cardetails"])
              setTimeout(() => {
               window.location.reload();
              }, 1000);
      
            },responseError=>{
              this.toasterService.error(responseError.error,"araba kiralanmadı");
              
            })
          }

        })
      }
    }
    )
  }
     
    
  
    

  goToPayment(){
    console.log(this.state)
    if(this.rents?.rentDate !== undefined){

      this.state = 2
      this.changeState.emit(this.state)
    }
    else{
      this.errorMessage.emit("Kiralama tarihi zorunlu alan!")
    }

  }

}
