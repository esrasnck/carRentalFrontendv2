import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl=environment.apiUrl

  constructor(private httpClient:HttpClient) { }
 
  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Rentals/RentalAdd";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

}

