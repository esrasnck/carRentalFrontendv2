import { ClassGetter } from '@angular/compiler/src/output/output_ast';
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
  cards:Card[]=[];
  currentCard: Card;
  checked:boolean;

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
    this.getCardsByCustomer(); 
    
  }

  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      customerId:[this.authService.user.customerId],
      ownerName:['',Validators.required],
      creditCardNumber:['',Validators.required],
      price:this.paymentService.totalPrice,
      expirationDate:['',Validators.required],
      securityCode:['',Validators.required]
    })
  }
 
  setPayment(){
    if(this.paymentForm.valid){
    this.paymentService.payment = Object.assign({}, this.paymentForm.value)
  }
}

setCardModel(){
  this.paymentService.cardModel=<Card>{
      customerId : this.authService.user.customerId,
      debts :this.paymentService.totalPrice,
      ownerName :this.paymentForm.controls["ownerName"].value,
      creditCardNumber : this.paymentForm.controls["creditCardNumber"].value,
      securityCode :this.paymentForm.controls["securityCode"].value,
      expirationDate :this.paymentForm.controls["expirationDate"].value,
    
  }
}


  addPayment(){
    this.setPayment()
    this.setCardModel()
    this.paymentService.addRentalAfterPaymentAndCardInfoCompleted();
    
  }

  changeEvent(){
    console.log(this.checked)
    if(this.checked ===true){
      this.paymentService.cardSavedRequest = true;
    }else{
      this.paymentService.cardSavedRequest = false;
    }

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


  getCardsByCustomer(){
    console.log(this.authService.user.customerId)
    this.cardService.getByCustomerId(this.authService.user.customerId).subscribe(response=>{
      this.cards = response.data
     console.log(response)
    })
  }

  getCardInfos(e:any){
    this.currentCard = this.cards.filter(x=> x.cardId == e.target.value)[0]
    console.log(e.target.value)
    this.paymentForm.patchValue(this.currentCard)

  }



}
