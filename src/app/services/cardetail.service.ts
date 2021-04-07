import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { CarDetail } from '../models/cardetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class CardetailService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl+'cars/GetAllCar');
  }

  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl + 'cars/GetCarDetails');
  }

  getCarDetailsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +"cars/GetCarDetailListByBrandId?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/GetCarDetailListByColorId?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +"cars/GetCarDetailByCarId?carId=" + carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailByColorAndBrand(colorId:number, brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl + "cars/GetCarDetailsByColorAndByBrand?colorId="+colorId+ "&brandId=" +brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  
  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/CarAdd",car)
  }

  deleteCar(car:Car):Observable<ResponseModel>{
   
   let newPath=this.apiUrl+"cars/CarDelete"
    return this.httpClient.post<ResponseModel>(newPath,car)
  
  }

  updateCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/CarUpdate"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
 
}
