import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl= environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+'colors/GetAll');
  }
  
  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/ColorAdd",color)
  }


  deleteColor(color:Color):Observable<ResponseModel>{
    
   let newPath=this.apiUrl+"colors/ColorDelete"
    return this.httpClient.post<ResponseModel>(newPath,color)

  }

  updateColor(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/ColorUpdate"
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
}
