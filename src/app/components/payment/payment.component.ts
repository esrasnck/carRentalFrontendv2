import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';

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
  isPayed:boolean =false;
  totalPrice = this.paymentService.totalPrice;

 @Input() rents:Rental
 @Input() state:number
 @Output() changeState = new EventEmitter()
 @Output() errorMessage = new EventEmitter()

  constructor(private paymentService:PaymentService, 
    private rentalService:RentalService,
    private toasterService:ToastrService,
    private formBuilder:FormBuilder,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.createPaymentForm();
  }

  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      
      creditCardNumber:['',Validators.required],
      price:this.paymentService.totalPrice,
      expirationDate:['',Validators.required],
      securityCode:['',Validators.required]
    })
  }
 
 
  addPayment(){
    if(this.paymentForm.valid){
      this.paymentModel= this.paymentForm.value;
      this.paymentModel.customerId = this.authService.user.customerId;
      console.log(this.paymentModel)
    }
  ;
  this.paymentService.addPayment(this.paymentModel).subscribe(response=>{
    this.toasterService.success("ödeme alındı");
    this.isPayed=true;
    if(this.isPayed){
      console.log(this.isPayed)
      
      this.rentalService.addRental(this.paymentService.rentals).subscribe(response=>{
        this.toasterService.success("araba kiralandı")
      
      },responseError=>{
         this.toasterService.error(responseError.errors,"araba kiralanamadı")
      })
    }

  })


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
