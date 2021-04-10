import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  apiUrl=environment.apiUrl
  totalPrice:number;
  rentals:Rental;

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Payments/Add";
    return this.httpClient.post<ResponseModel>(newPath,payment);

  }

}
