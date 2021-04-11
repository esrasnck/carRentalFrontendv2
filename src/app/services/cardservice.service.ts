import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CardserviceService {

  apiUrl= environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(card:Card):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cards/Add"
    return this.httpClient.post<ResponseModel>(newPath,card);
  }
  
  
}
