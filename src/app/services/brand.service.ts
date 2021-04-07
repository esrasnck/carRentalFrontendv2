import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl= environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+'brands/BrandList');
  }
  
  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/BrandAdd",brand)
  }

  getByBrandId(brandId:number):Observable<SingleResponseModel<Brand>>{
    return this.httpClient.get<SingleResponseModel<Brand>>(this.apiUrl+"brands/GetByBrandId?id="+brandId)
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    
   let newPath=this.apiUrl+"brands/Deleted"
    return this.httpClient.post<ResponseModel>(newPath,brand)
  
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/BrandUpdated"
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
}

