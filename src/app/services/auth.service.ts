
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login';
import { RegisterModel } from '../models/registerModel';

import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  decodedTokenKey:any
  user:User;

  apiUrl= environment.apiUrl +"Auth/"

  constructor(private httpClient:HttpClient, private localStorageService:LocalstorageService, private jwtHelper:JwtHelperService) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath= this.apiUrl+ "Login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "Register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }

  decodedToken(token:any){
    return this.jwtHelper.decodeToken(token);
  }

  
 isAuthenticated(){
  if (this.localStorageService.getToken()) {
    return true;
  }
  else{
    return false;
  }
}



  isAdmin(){
    let isAdmin=false;
    if(this.loggedIn()){
      this.user.roles?.map(role=> {
        if(role.toLocaleLowerCase().indexOf("admin")!== -1){
           isAdmin=true;
          
        }
        // is user ya da is moderatör mantığı olabilir. bakacaz.

      })
    }
    return isAdmin;
  }

  loggedIn(){
    if(this.localStorageService.getToken()){
      return this.jwtHelper.isTokenExpired()
    }
    else{
      return false;
    }
  }
  
  getUser(){
    let decodedToken = this.decodedToken(this.localStorageService.getToken())
    if (decodedToken) {
      if (this.loggedIn()) {
        let tokenInfoName= Object.keys(decodedToken).filter(u=> u.endsWith('/name'))[0]
        let userName=String(decodedToken[tokenInfoName])

        let tokenInfoId= Object.keys(decodedToken).filter(x=> x.endsWith('/nameidentifier'))[0]
        let userId= Number(decodedToken[tokenInfoId]);

        let claimInfo = Object.keys(decodedToken).filter(x=> x.endsWith('/role'))[0]
        let roles= decodedToken[claimInfo];

        let emailInfo= decodedToken.email; 

        this.user={
          userId:userId,
          userName : userName,
          email:emailInfo,
          roles:roles
        }

      }
    }
    return this.user;

  }

}
