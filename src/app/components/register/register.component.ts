import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService,
              private localStorageService:LocalstorageService, private router:Router) { }


  ngOnInit(): void {
    this.createRegisterForm();
  }
  
  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }


  register(){
    if (this.registerForm.valid){
      let registerModel = Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.info(response.message,"registered")
        this.localStorageService.saveToken(response.data.token)
        this.registerForm.reset();
        this.authService.getUser()
        this.router.navigate(['/']);
        this.toastrService.success(response.message,'Registered.')
      }, responseError =>{
        if(responseError.error.Errors.length>0){
          for (let i=0; i<responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, 'Validation Exception')
          }
        }
      })
    }else{
      this.toastrService.error('Form Invalid.')
    }
  }

}
