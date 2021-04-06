import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }


  saveToken(token:string){
    localStorage.setItem('token',token)
    
  }

  getToken():any{
    return localStorage.getItem('token')
  }

  removeToken(){
    localStorage.removeItem('token');
  }
  
}
