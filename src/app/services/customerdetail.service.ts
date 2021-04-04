import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerDetail } from '../models/customerdetail';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CustomerdetailService {

  apiUrl = environment.apiUrl 

  constructor(private httpClient:HttpClient) { }

  getCustomerDetail(carId:number):Observable<ListResponseModel<CustomerDetail>>{
    let newPath= this.apiUrl + "customers/GetCustomerByCarId?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }

  getCustomerAll():Observable<ListResponseModel<CustomerDetail>>{
    let newPath = this.apiUrl + "customers/GetAll";
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }
}
