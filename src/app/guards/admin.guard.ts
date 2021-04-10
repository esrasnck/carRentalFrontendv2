import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

 
  constructor(
    private authService:AuthService, 
    private toastrService:ToastrService,
    private router:Router){

  }
  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.authService.isAdmin())
      if (this.authService.isAdmin()){ 
        return true;
      }
      else
      {
        this.router.navigate(["cardetails"])
        this.toastrService.info("yetersiz yetki")
        return false;
      }
    
  }
  
}


