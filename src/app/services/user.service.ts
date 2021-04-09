import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { UserPasswordUpdate } from '../models/userPassworUpdate';
import { UserUpdateModel } from '../models/userUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl

  constructor(private httpClient:HttpClient) { }

  updateUser(userUpdateModel:UserUpdateModel):Observable<ResponseModel>{
    let newPath= this.apiUrl + "Users/UserUpdate"
    return this.httpClient.post<ResponseModel>(newPath,userUpdateModel);
  }

  getByUserId(userId:number):Observable<SingleResponseModel<UserUpdateModel>>{
    let newPath = this.apiUrl + "Users/GetByUserId?id="+userId;
    return this.httpClient.get<SingleResponseModel<UserUpdateModel>>(newPath)

  }

  changePassword(userPasswordUpdate:UserPasswordUpdate):Observable<ResponseModel>{
    let newPath = this.apiUrl +"Users/ChangeUserPassword"
    return this.httpClient.post<ResponseModel>(newPath,userPasswordUpdate);
  }
}
