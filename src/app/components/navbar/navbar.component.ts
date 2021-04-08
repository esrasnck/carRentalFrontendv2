import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userInfo:User=this.authService.getUser()

  constructor(private authService:AuthService, private localStorageService:LocalstorageService,private router:Router,private toastrservice:ToastrService) { }

  ngOnInit(): void {
  }

  isAuthenticated(){
    return this.authService.loggedIn();
  }

  logout(){
    this.localStorageService.removeToken();
    this.toastrservice.success("başarı ile çıkış yaptın","aferin")
  }

  goToAdminEdit(){
     this.router.navigate(["admin/user"]) 
  }

  ngDoCheck(){  
    if(this.userInfo!==this.authService.user){
      this.userInfo = this.authService.user;
    }
  }

}

